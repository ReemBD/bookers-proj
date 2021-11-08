import DatePicker from "@mui/lab/DatePicker";
import { BookersButton } from "cmps/base/bookers-button";
import { BookersCheckbox, BookersInput } from "cmps/base/bookers-input";
import { BookersModal } from "cmps/base/bookers-modal";
import { BookersTextField } from "cmps/base/bookers-textfield";
import { useBooks } from "lib/hooks/useBooks";
import { BookFilter as IBookFilter } from "lib/models/BookFilter.interface";
import { FC, memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { bookService } from "services/bookService";

interface Props {

}

export const BookFilter: FC<Props> = memo(() => {
    const navigate = useNavigate()
    const { bookFilter, setBookFilter, loadBooks } = useBooks()
    const { register, setValue, getValues, reset,watch, handleSubmit } = useForm({ defaultValues: bookFilter })


    const onSubmit = (data: IBookFilter) => {
        setBookFilter(data)
        loadBooks(data)
        navigate('/books')
    }

    const onResetFilter = useCallback(() => {
        reset(bookService.getEmptyBookFilter())
        setBookFilter(bookService.getEmptyBookFilter())
    }, [])


    return <BookersModal open={true} onClose={() => { navigate('/books') }} title='Filters'>
        <div className="book-filter">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="free-txt-filter filter-unit">
                    <label htmlFor="">Free Text:</label>
                    <BookersInput {...register('freeTxt')} />
                </div>
                <div className="published-date-filter filter-unit">
                    <label className="published-date-label">Publish date:</label>
                    <BookersCheckbox {...register('publishedDate.before')} defaultChecked={getValues('publishedDate.before')} label="Before" />
                    <DatePicker
                        {...register('publishedDate.value')}
                        value={watch('publishedDate.value')}
                        onChange={(newVal) => { setValue('publishedDate.value', newVal!) }}
                        renderInput={(params) => <BookersTextField variant="standard"  {...params} />}
                    />
                </div>
                <div className="price-filter filter-unit">
                    <label>Price: </label>
                    <BookersCheckbox {...register('amount.lessThan')} defaultChecked={getValues('amount.lessThan')} label="Less than" />
                    <BookersInput type="number" {...register('amount.value')} />
                </div>
                <div className="action-btns flex">

                    <BookersButton type="submit" variant="contained">
                        Submit
                    </BookersButton>
                    <BookersButton onClick={onResetFilter} color="error" variant="contained">
                        Clear all
                    </BookersButton>
                </div>
            </form>
        </div>
    </BookersModal>
})