import {InputLabel, TextField, TextFieldProps} from '@mui/material';
import {forwardRef} from 'react';

type ITextFieldMui = TextFieldProps & {
    label: string;
    showInputLabel?: boolean;
};

export const TextFieldMui = forwardRef<any, ITextFieldMui>((props, ref) => {
    const fieldId = `textfield-mui-input-label-${props.name}`
    return (
        <>
            {props.showInputLabel && (
                <InputLabel id={fieldId}>
                    {props.label}
                </InputLabel>
            )}
            <TextField
                autoComplete="off"
                fullWidth
                margin="normal"
                inputRef={ref}
                size="small"
                type="text"
                variant="outlined"
                id={fieldId}
                {...props}
            />
        </>
    );
});

