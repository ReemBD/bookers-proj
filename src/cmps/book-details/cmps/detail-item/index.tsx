import { FC, forwardRef, memo, useMemo } from "react";
import { Book } from "lib/models/Book.interface";
import { BookEditFieldname } from "views/BookDetails";
import { BookersInput } from "cmps/base/bookers-input";

interface Props {
    label: string
    txt?: Book[BookEditFieldname]
    [rest: string]: any
}

export const DetailItem: FC<Props> = forwardRef(({ label, txt, error, editable, isEditting, ...inputAttrs }, inputRef) => {

    console.log('rendering')
    const DetailField = useMemo(() => {
        return isEditting ? <BookersInput disabled={!editable} color="secondary" ref={inputRef} type="text" {...inputAttrs} /> : <span>{txt}</span>
    }, [isEditting])

    return <div className="detail-item-container">
        <label htmlFor={inputAttrs.id}>{label}:</label>
        {DetailField}
    </div>
})
