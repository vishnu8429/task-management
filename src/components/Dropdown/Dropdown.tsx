import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { SxProps, Theme } from '@mui/material';

type DropdownProps = {
    sx: SxProps<Theme>;
    name: string;
    label: string;
    options: string[];
    error?: any;
    value?: string;
    onChange: Function;
};

/**
 * Dropdown 
 * 
 * @param DropdownProps 
 * @returns 
 */
const Dropdown: React.FC<DropdownProps> = ({
    sx,
    name,
    label,
    options,
    error,
    value,
    onChange,
}: DropdownProps): JSX.Element => {
    return (
        <FormControl fullWidth sx={sx}>
            <InputLabel id="dropdown-label">{label}</InputLabel>
            <Select
                labelId="dropdown-label"
                id="dropdown"
                name={name}
                label={label}
                error={error && error}
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
            >
                {
                    options &&
                    options.map((x: string, index: number) => (
                        <MenuItem key={index} value={x}>{x}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};

export default Dropdown;