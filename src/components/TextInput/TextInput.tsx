import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';

import './TextInput.scss';

type TextInputProps = {
    type?: string;
    multiline?: boolean;
    rows?: number;
    name: string;
    label: string;
    placeholder?: string;
    error: any;
    value: string;
    onChange: Function;
};

/**
 * Text input 
 * 
 * @param TextInputProps 
 * @returns 
 */
const TextInput: React.FC<TextInputProps> = ({
    type = "text",
    multiline = false,
    rows = 1,
    name,
    label,
    placeholder,
    error,
    value,
    onChange,
}: TextInputProps): JSX.Element => {

    const [showPassword, setShowPassword] = useState(type === "password" ? false : true);

    return (
        <TextField
            fullWidth
            multiline={multiline}
            rows={rows}
            margin="normal"
            autoComplete="on"
            type={showPassword ? 'text' : 'password'}
            name={name}
            label={label}
            placeholder={placeholder && placeholder}
            error={error ? true : false}
            color={error ? "warning" : "primary"}
            helperText={error}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(name, event.target.value)}
            InputProps={{
                endAdornment: type === "password" && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default TextInput;