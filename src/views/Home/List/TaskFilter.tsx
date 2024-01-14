import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { Dropdown } from '../../../components';

type TaskFilterProps = {
    searchText: string;
    activeStatus: string;
    orderBy: string;
    onChangeSearch: Function;
    onChangeStatus: Function;
    onChangeOrderBy: Function;
};

/**
 * Task filter
 * 
 * @returns 
 */
const TaskFilter: React.FC<TaskFilterProps> = ({
    searchText,
    activeStatus,
    orderBy,
    onChangeSearch,
    onChangeStatus,
    onChangeOrderBy,
}: TaskFilterProps): JSX.Element => {

    // status dropdown options
    const statusOptions = ["All", "To Do", "In Progress", "Done"];

    // order by dropdown options
    const orderByOptions = ["title", "status"];

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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2
                }}>
                <Dropdown
                    sx={{
                        width: 180,
                        bgcolor: 'white'
                    }}
                    name="status"
                    label="Task Status"
                    options={statusOptions}
                    value={activeStatus}
                    onChange={(name: string, value: string) => onChangeStatus(value)}
                />
                <Dropdown
                    sx={{
                        width: 180,
                        bgcolor: 'white'
                    }}
                    name="orderBy"
                    label="Order BY"
                    options={orderByOptions}
                    value={orderBy}
                    onChange={(name: string, value: string) => onChangeOrderBy(value)}
                />
            </Box>
        </Box>
    );
};

export default TaskFilter;