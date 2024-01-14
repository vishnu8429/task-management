/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { auth, db } from '../../core';
import { TaskType } from '../../schema/task';
import useDebounce from '../../helpers/debounce';
import UserHelper from '../../helpers/user.helper';
import AppHelper from '../../helpers/app.helper';
import toastify from '../../helpers/toastify';
import { Layout, Loader, EmptyCard, ConfirmDialog, Breadcrumbs } from '../../components';
import CreateTask from './Create/CreateTask';
import TaskFilter from './List/TaskFilter';
import TaskList from './List/TaskList';

/**
 * Home
 * 
 * @returns 
 */
const Home = (): JSX.Element => {

    // handle loader
    const [isLoading, setLoading] = useState<boolean>(true);

    // active or logged user id
    const [userId, setUserId] = useState<string>("");

    // handle create or edit modal
    const [modalVariant, setModalVariant] = useState<string>("create");
    const [openModal, setOpenModal] = useState<boolean>(false);

    // handle delete confirm dialog
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);

    // handle search text
    const [searchText, setSearchText] = useState<string>("");

    // handle status dropdown
    const [activeStatus, setActiveStatus] = useState<string>("All");

    // handle order by dropdown
    const [orderBy, setOrderBy] = useState<string>("title");

    // state for task
    const [taskList, setTaskList] = useState<TaskType[]>([]);
    const [taskListTemp, setTaskListTemp] = useState<TaskType[]>([]);
    const [task, setTask] = useState<TaskType>({
        id: "",
        title: "",
        description: "",
        status: "",
        dateCreated: new Date(),
    });

    // handle search change
    const _onChangeSearch = (value: string) => {
        setSearchText(value);
        if (value.length === 0 || value.length > 2) {
            _onDebounce(value, "search");
        }
    };

    // handle status change
    const _onChangeStatus = (value: string) => {
        setActiveStatus(value);
        _onSearch(value, "status");
    };

    // handle order by change
    const _onChangeOrderBy = (value: string) => {
        setOrderBy(value);
        setTaskList(AppHelper.sortArray(taskList, value));
        setTaskListTemp(AppHelper.sortArray(taskListTemp, value));
    };

    // handle search
    // to improve the performance avoid api calls here
    // instead save the task list in temp and sort 
    const _onSearch = (value: string, variant: string) => {
        let updatedTaskList = taskListTemp;

        // handle search input change
        if (variant === "search") {
            if (value.length > 0) {
                if (activeStatus !== "All") {
                    updatedTaskList = taskListTemp.filter((x: any) => x.status.includes(activeStatus) && x.title.toLowerCase().includes(value.toLowerCase()));
                } else {
                    updatedTaskList = taskListTemp.filter((x: any) => x.title.toLowerCase().includes(value.toLowerCase()) || x.status.toLowerCase().includes(value.toLowerCase()));
                }
            }
        }

        // handle status dropdown change
        else {
            if (value !== "All") {
                if (searchText.length > 0) {
                    updatedTaskList = taskListTemp.filter((x: any) => x.status.includes(value) && x.title.toLowerCase().includes(searchText.toLowerCase()));
                } else {
                    updatedTaskList = taskListTemp.filter((x: any) => x.status.includes(value));
                }
            }
        }

        updatedTaskList = AppHelper.sortArray(updatedTaskList, orderBy);
        setTaskList(updatedTaskList);
    };

    // fetch all task
    const _fetchTask = async (uid?: string) => {
        try {
            setLoading(true);

            const collectionRef = collection(db, "task");
            const condition = query(collectionRef, where("userId", "==", uid));
            const docRefs = await getDocs(condition);

            let res: any = [];

            docRefs.forEach(task => {
                res.push({
                    id: task.id,
                    ...task.data()
                });
            });

            res = AppHelper.sortArray(res, orderBy);

            setLoading(false);
            setTaskList(res);
            setTaskListTemp(res);
        } catch (e) {
            console.log("Failed to fetch task list");
        }
    };

    // handle debounce
    const _onDebounce = useDebounce(_onSearch, 1000);

    // rest task object
    const _resetTask = () => {
        setTask({
            id: "",
            title: "",
            description: "",
            status: "",
            dateCreated: new Date(),
        });
    };

    // handle save
    const _onSaveTask = async (data: TaskType) => {
        try {
            setTask(data);
            setOpenModal(false);

            const collectionRef = collection(db, "task");
            await addDoc(collectionRef, {
                userId: userId,
                title: data.title,
                description: data.description,
                status: data.status,
                dateCreated: data.dateCreated
            });

            toastify("New task have created", "SUCCESS");

            _resetTask();

            // fetch the all task or concat the newly created
            _fetchTask(userId);
        } catch (e) {
            toastify("Failed to create new task", "ERROR");
        }
    };

    // handle edit
    const _onEditTask = async (data: TaskType) => {
        try {
            setOpenModal(false);

            const docId: any = data.id;
            const docRef = doc(db, "task", docId);
            await updateDoc(docRef, {
                title: data.title,
                description: data.description,
                status: data.status,
            });

            toastify("Task updated successfully", "SUCCESS");

            _resetTask();

            // fetch the all task or update the edit task one only
            _fetchTask(data.userId);
        } catch (e) {
            toastify("Failed to update task", "ERROR");
        }
    };

    // handle delete
    const _onDeleteTask = async () => {
        try {
            setOpenConfirm(false);

            const docId: any = task.id;
            const docRef = doc(db, "task", docId);
            await deleteDoc(docRef);

            toastify("Task deleted successfully", "SUCCESS");

            _resetTask();

            // fetch the all task or remove the task from list
            _fetchTask(task.userId);
        } catch (e) {
            toastify("Failed to delete task", "ERROR");
        }
    };

    // check user loggedin status
    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                const uid = user.uid;
                if (uid !== null) {
                    setUserId(user.uid);
                    UserHelper.saveUser(user);
                    _fetchTask(user.uid);
                } else {
                    UserHelper.deleteUser();
                    window.location.href = "/";
                }
            }
        });
    }, []);

    return (
        <Layout>
            {/* page header */}
            <Header
                title='Task'
                onClick={() => {
                    setOpenModal(!openModal);
                    setModalVariant("create");
                }}
            />

            {/* task filter */}
            <TaskFilter
                searchText={searchText}
                activeStatus={activeStatus}
                orderBy={orderBy}
                onChangeSearch={_onChangeSearch}
                onChangeStatus={_onChangeStatus}
                onChangeOrderBy={_onChangeOrderBy}
            />

            {/* task list */}
            {
                isLoading
                    ? <Loader />
                    : taskList &&
                        taskList.length === 0
                        ? <EmptyCard
                            title="Task"
                            message="No task items found"
                        />
                        : <TaskList
                            data={taskList}
                            onEdit={(data: TaskType) => {
                                setTask(data);
                                setOpenModal(true);
                                setModalVariant("edit");
                            }}
                            onDelete={(data: TaskType) => {
                                console.log('data', data);
                                setTask(data);
                                setOpenConfirm(true);
                            }}
                        />
            }

            {/* create new task */}
            <CreateTask
                open={openModal}
                variant={modalVariant}
                data={task}
                setOpen={() => setOpenModal(!openModal)}
                onClose={() => setOpenModal(false)}
                onSave={modalVariant === "create" ? _onSaveTask : _onEditTask}
            />

            {/* confirm dialog*/}
            <ConfirmDialog
                open={openConfirm}
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => _onDeleteTask()}
            />
        </Layout>
    );
};

/**
 * Page header 
 * 
 * @param { title, onClick } 
 * @returns 
 */
const Header = ({ title, onClick }: any) => {
    return (
        <Box
            sx={{
                p: '15px',
                mb: 3,
                boxShadow: 2,
                borderRadius: 1,
                bgcolor: 'white',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
            <Breadcrumbs title={title} />
            <Button variant="contained" onClick={onClick}>Create</Button>
        </Box>
    );
};

export default Home;