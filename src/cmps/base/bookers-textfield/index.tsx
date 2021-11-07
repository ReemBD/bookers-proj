import TextField from "@mui/material/TextField";
import { FC } from "react";

interface Props {
    className?: string
    [rest: string]: any
}

export const BookersTextField: FC<Props> = ({ className, ...rest }) => {
    return <TextField id="outlined-basic" variant="outlined" className={`bookers-textfield ${className}`} {...rest} />
}