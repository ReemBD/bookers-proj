import Input from "@mui/material/Input";
import { Checkbox, InputProps, FormControlLabel, FormControlLabelProps, CheckboxProps } from '@mui/material'
import { FC, forwardRef, memo } from "react";

interface Props extends InputProps {

}

export const BookersInput: FC<Props> = memo(forwardRef(({ type, ...rest }, inputRef) => {
    return <Input {...rest} ref={inputRef} />
}))

interface BookersCheckboxProps {
    label: string;
    [rest: string]: any
}

export const BookersCheckbox = memo(forwardRef(({ label, ...checkboxProps }: BookersCheckboxProps, inputRef) => {
    return <FormControlLabel control={<Checkbox {...checkboxProps} />} label={label} ref={inputRef} />
}))