import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { FC, memo, useEffect } from "react";
import { format } from 'date-fns'
interface Props {
    value: any
    onChange: (date: any, keyboardInputValue?: string | undefined) => void
    isEditting: boolean
    [register: string]: any
}

export const PublishedDateField: FC<Props> = memo(({ value, onChange, isEditting, register }) => {

    return <div className="published-date-field detail-item-container">
        <label>
            Published At:
        </label>
        {isEditting ? <DatePicker
            {...register('publishedDate')}
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField variant="standard"  {...params} />}
        /> : <span>{format(new Date(value), 'dd/MM/yyyy')}</span>}
    </div>
})