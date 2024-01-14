import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { TaskType } from '../../../schema/task';

type TaskItemProps = {
    task: TaskType;
    onEdit: Function;
    onDelete: Function;
};

/**
 * Task item
 * 
 * @param task 
 * @returns 
 */
const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onEdit,
    onDelete
}: TaskItemProps): JSX.Element => {

    // set the color for each task status
    const _getStatusColor = (): any => {
        let color = "primary";
        switch (task.status) {
            case "To Do":
                color = "error";
                break;
            case "In Progress":
                color = "primary";
                break;
            case "Done":
                color = "success";
                break;
            default:
                break;
        };

        return color;
    };

    // trucate the task description by 150 characters
    const _onTruncate = (text: string) => {
        const size = 150;
        return text.length > size
            ? text.slice(0, size - 1) + "…"
            : text;
    };

    return (
        <Card
            variant="outlined"
            sx={{
                width: '370px',
                boxShadow: 2,
                borderRadius: 2,
                border: 'none',
                display: "flex",
                flexDirection: 'column',
                justifyContent: "space-between",
                '@media (max-width: 480px)': {
                    width: '100%'
                }
            }}>
            <CardContent>
                <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>{task.title}</Typography>
                <Chip
                    variant="filled"
                    color={_getStatusColor()}
                    label={task.status}
                    sx={{
                        my: 1,
                        fontSize: 12,
                    }}
                />
                <Typography variant="body2">{_onTruncate(task.description)}</Typography>
            </CardContent>
            <CardActions
                sx={{
                    mt: 2,
                    p: 2,
                    boxShadow: 3,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}>
                <Button
                    size="small"
                    color="info"
                    onClick={() => onEdit(task)}
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    color="error"
                    onClick={() => onDelete(task)}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default TaskItem;