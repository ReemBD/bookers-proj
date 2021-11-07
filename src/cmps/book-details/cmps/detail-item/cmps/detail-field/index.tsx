import Input from "@mui/material/Input";
import { FC, forwardRef, memo } from "react";

interface Props {
    isEditting: boolean;
    editable: boolean
    [rest: string]: any
}
export const DetailField: FC<Props> = memo(forwardRef(({ isEditting, editable, txt, ...inputAttrs }, inputRef) => {
    return isEditting ? <Input disabled={!editable} color="secondary" ref={inputRef} type="text" {...inputAttrs} />
        : <span>{txt}</span>
}))