import TextField from "@mui/material/TextField";
import { FC, forwardRef } from "react";
import { InputError } from "../input-error";

interface Props {
    className?: string
    [rest: string]: any
}

export const BookersTextField: FC<Props> = forwardRef(({ className, errorMessage, ...rest }, textFieldRef: any) => {
    return <>
        <TextField id="outlined-basic" variant="outlined" className={`bookers-textfield ${className}`} ref={textFieldRef} error={errorMessage} {...rest} />
        {errorMessage && <InputError message={errorMessage} />}
    </>
})