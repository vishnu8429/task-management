import Box from '@mui/material/Box';

import { TaskType } from '../../../schema/task';
import TaskItem from './TaskItem';

type TaskListProps = {
    data: TaskType[];
    onEdit: Function;
    onDelete: Function;
};

const TaskList: React.FC<TaskListProps> = ({ data,
    onEdit,
    onDelete,
}: TaskListProps): JSX.Element => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                gap: 2,
            }}>
            {
                data &&
                data.length > 0 &&
                data.map((x: TaskType) => (
                    <TaskItem
                        key={`task_${x.id}`}
                        task={x}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            }
        </Box>
    );
};

export default TaskList;