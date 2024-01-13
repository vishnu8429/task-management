import { Formik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { TaskType } from "../../../schema/task";
import { TextInput, Dropdown } from "../../../components";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    boderRadius: 3,
    p: 4,
};

type CreateTaskProps = {
    open: boolean;
    variant: string;
    data: TaskType;
    setOpen: Function;
    onClose: Function | any;
    onSave: Function;
};

const CreateTask: React.FC<CreateTaskProps> = ({
    open,
    variant,
    data,
    setOpen,
    onClose,
    onSave,
}: CreateTaskProps): JSX.Element => {

    // status options
    const options = ["To Do", "In Progress", "Done"];

    // formik initial values
    const initialValues = data;

    // formik validation schema
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Required'),
        description: Yup.string()
            .required('Required'),
        status: Yup.string()
            .required('Required'),
    });

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create Task
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            onSave(values);
                        }, 400);
                    }}
                >
                    {(formikProps) => (
                        <Box component="form" onSubmit={formikProps.handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextInput
                                name="title"
                                label="Title"
                                placeholder="Enter title for the task"
                                error={formikProps.errors.title}
                                value={formikProps.values.title}
                                onChange={formikProps.setFieldValue}
                            />
                            <TextInput
                                multiline
                                rows={4}
                                name="description"
                                label="Description"
                                placeholder="Enter descriptions"
                                error={formikProps.errors.description}
                                value={formikProps.values.description}
                                onChange={formikProps.setFieldValue}
                            />
                            <Dropdown
                                sx={{ mt: 1 }}
                                name="status"
                                label="Task Status"
                                options={options}
                                error={formikProps.errors.status}
                                value={formikProps.values.status}
                                onChange={formikProps.setFieldValue}
                            />
                            <Box
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                                <Button type="submit" variant="contained">Save</Button>
                            </Box>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default CreateTask;