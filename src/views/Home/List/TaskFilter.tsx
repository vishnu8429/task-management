import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Dropdown } from '../../../components';

type TaskFilterProps = {
    searchText: string;
    activeStatus: string;
    onChangeSearch: Function;
    onChangeStatus: Function;
};

/**
 * Task filter
 * 
 * @returns 
 */
const TaskFilter: React.FC<TaskFilterProps> = ({
    searchText,
    activeStatus,
    onChangeSearch,
    onChangeStatus,
}: TaskFilterProps): JSX.Element => {

    const statusOptions = ["All", "To Do", "In Progress", "Done"];

    return (
        <Box
            sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2
            }}>
            <TextField
                sx={{
                    minWidth: 450,
                    bgcolor: 'white',
                    '@media (max-width: 480px)': {
                        minWidth: '100%',
                        mb: 2
                    }
                }}
                color="primary"
                label="Search by title, status"
                value={searchText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeSearch(event.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => console.log('fetch task')}
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Dropdown
                sx={{
                    width: 200,
                    bgcolor: 'white'
                }}
                name="status"
                label="Task Status"
                options={statusOptions}
                value={activeStatus}
                onChange={(name: string, value: string) => onChangeStatus(value)}
            />
        </Box>
    );
};

export default TaskFilter;