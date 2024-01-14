import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import useDebounce from '../../helpers/debounce';
import { TaskType } from '../../schema/task';
import { Layout, ConfirmDialog, EmptyCard } from '../../components';
import CreateTask from './Create/CreateTask';
import TaskFilter from './List/TaskFilter';
import TaskList from './List/TaskList';

const mockData = [
    {
        id: 1,
        title: "Buy groceries",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as",
        status: "To Do",
    },
    {
        id: 2,
        title: "Car",
        description: "In publishing and graphic design, ",
        status: "In Progress",
    },
    {
        id: 3,
        title: "Do Exercise",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as",
        status: "Done",
    },
    {
        id: 4,
        title: "Do Shopping",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as",
        status: "In Progress",
    }
];

/**
 * Home
 * 
 * @returns 
 */
const Home = (): JSX.Element => {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [activeStatus, setActiveStatus] = useState<string>("All");
    const [taskList, setTaskList] = useState<TaskType[]>(mockData);
    const [task, setTask] = useState<TaskType>({
        id: "",
        title: "",
        description: "",
        status: "",
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

    // handle search
    const _onSearch = (value: string, variant: string) => {
        if (variant === "search") {
            if (value.length > 0) {
                const _searchText = value.toLowerCase();
                const _sortTaskList = taskList.filter((x: any) => x.title.toLowerCase().includes(_searchText) || x.status.toLowerCase().includes(_searchText));
                setTaskList(_sortTaskList);
            } else {
                setTaskList(mockData);
            }
        } else {
            if (value !== "All") {
                const _sortTaskList = mockData.filter((x: any) => x.status.includes(value));
                setTaskList(_sortTaskList);
            } else {
                setTaskList(mockData);
            }
        }
    };

    // handle debounce
    const _onDebounce = useDebounce(_onSearch, 1000);

    // handle save
    const _onSaveTask = (data: TaskType) => {
        setTask(data);
        setOpenModal(false);
    };

    // handle edit
    const _onEditTask = (data: TaskType) => {
        setTask(data);
        setOpenModal(true);
    };

    // handle delete
    // update the status
    const _onDeleteTask = (data: TaskType) => {
        console.log('data', data);
        setTask(data);
        setOpenConfirm(true);
    };

    // handle delete
    // api call here
    const _onConfirmDelete = () => {
        setOpenConfirm(false);
        const _sortTaskList = taskList.filter((x: any) => x.id !== task.id);
        setTaskList(_sortTaskList);
    };

    return (
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                {/* page header */}
                <Header
                    title="Task Management"
                    onClick={() => setOpenModal(!openModal)}
                />

                {/* task filter */}
                <TaskFilter
                    searchText={searchText}
                    activeStatus={activeStatus}
                    onChangeSearch={_onChangeSearch}
                    onChangeStatus={_onChangeStatus}
                />

                {/* task list */}
                {
                    taskList &&
                        taskList.length === 0
                        ? <EmptyCard
                            title="Task"
                            message="No task items found"
                        />
                        : <TaskList
                            data={taskList}
                            onEdit={_onEditTask}
                            onDelete={_onDeleteTask}
                        />
                }

                {/* create new task */}
                <CreateTask
                    open={openModal}
                    variant='create'
                    data={task}
                    setOpen={() => setOpenModal(!openModal)}
                    onClose={() => setOpenModal(false)}
                    onSave={_onSaveTask}
                />

                {/* confirm dialog*/}
                <ConfirmDialog
                    open={openConfirm}
                    onCancel={() => setOpenConfirm(false)}
                    onConfirm={() => _onConfirmDelete()}
                />
            </Container>
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
                borderRadius: 2,
                bgcolor: 'white',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
            <Typography color="primary" sx={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Typography>
            <Button variant="contained" onClick={onClick}>Create</Button>
        </Box>
    );
};

export default Home;