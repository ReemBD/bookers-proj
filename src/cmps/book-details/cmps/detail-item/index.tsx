import { FC, forwardRef, memo, useMemo } from "react";
import Input from '@mui/material/Input';
import { Book } from "lib/models/Book.interface";
import { BookEditFieldname } from "views/BookDetails";

interface Props {
    label: string
    txt?: Book[BookEditFieldname]
    [rest: string]: any
}

export const DetailItem: FC<Props> = memo(forwardRef(({ label, txt, editable, isEditting, ...inputAttrs }, inputRef) => {

    const DetailField = useMemo(() => {
        return isEditting ? <Input disabled={!editable} color="secondary" ref={inputRef} type="text" {...inputAttrs} /> : <span>{txt}</span>
    }, [isEditting])

    return <div className="detail-item-container">
        <label htmlFor={inputAttrs.id}>{label}:</label>
        {DetailField}
    </div>
}))
