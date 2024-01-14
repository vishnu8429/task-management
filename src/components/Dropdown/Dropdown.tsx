import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { SxProps, Theme } from '@mui/material';

import AppHelper from '../../helpers/app.helper';

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
                error={error && error.length > 0 ? true : false}
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
            >
                {
                    options &&
                    options.map((x: string, index: number) => (
                        <MenuItem key={index} value={x}>
                            {AppHelper.stringCapitalize(x)}
                        </MenuItem>
                    ))
                }
            </Select>
            {
                error &&
                <FormHelperText error={!!error}>{error}</FormHelperText>
            }
        </FormControl>
    );
};

export default Dropdown;