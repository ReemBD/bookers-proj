import Modal from "@mui/material/Modal"
import { Loader } from "cmps/base/loader"
import { Book } from "lib/models/Book.interface"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { bookService } from "services/bookService"
import { useBooks } from "lib/hooks/useBooks"
import { DetailItem } from "cmps/book-details/cmps/detail-item"
import { useToggle } from "lib/hooks/useToggle"
import { RegisterOptions, useForm } from "react-hook-form"
import { PublishedDateField } from "cmps/book-details/cmps/detail-item/cmps/published-date-field"
import { BookersButton } from "cmps/base/bookers-button"
import { BookersModal } from "cmps/base/bookers-modal"

export type BookEditFieldname = 'subtitle' | 'authors' | 'publishedDate' | 'thumbnail' | 'id' | 'title'
interface FormField {
    name: BookEditFieldname,
    editable: boolean;
    options?: RegisterOptions
    type?: string
}

export const BookDetails: FC = () => {

    const { bookId } = useParams()
    const { deleteBook, updateBook } = useBooks()
    const navigate = useNavigate()
    const [book, setBook] = useState<Book | null>(null)
    const { register, watch, setValue, formState, handleSubmit } = useForm()
    const [isEditting, toggleIsEditting] = useToggle(false)
    console.log('formState: ', formState)
    useEffect(() => {
        (async () => {
            try {
                const book = await bookService.getById(bookId as string)
                //set initial form vals async
                formFields.forEach(({ name: value }: FormField) => {
                    setValue(value, book![value])
                })
                setBook(book!)
            } catch (err) {
                console.error('err:', err)
            }
        })()

        console.log('bookdetails mounted')
    }, [bookId])

    const onSubmit = useCallback(async (data: any) => {
        const updatedBook = { ...book, ...data }
        updateBook(updatedBook)
        toggleIsEditting()
    }, [book])

    const handleDeleteBook = useCallback(() => {
        deleteBook((book as Book).id)
        navigate('/books')
    }, [book])

    const handleEditBook = useCallback(() => {
        toggleIsEditting()
    }, [bookId])

    const onChangePublishedDate = useCallback((newVal) => {
        console.log('newVal: ', newVal)
        setValue('publishedDate', newVal)
    }, [setValue])


    const { current: formFields } = useRef<FormField[]>([
        { name: 'id', editable: false, options: {} },
        { name: 'title', editable: true, options: {} },
        { name: 'subtitle', editable: true, options: {} },
        { name: 'authors', editable: true, options: {} },
        { name: 'publishedDate', type: 'number', editable: true, options: {} },
        { name: 'thumbnail', editable: true, options: {} },
    ])

    const { current: nonEditableFields } = useRef(['id'])
    const getDetailItemProps = useCallback((fieldname: BookEditFieldname, options = {}) => {
        let props: {
            isEditting: boolean;
            label: string;
            txt?: Book[BookEditFieldname]
            editable: boolean
        } = {
            isEditting,
            label: fieldname,
            editable: !nonEditableFields.includes(fieldname)
        }
        if (isEditting) props = { ...props, ...register(fieldname, options) }
        if (!isEditting) props.txt = (book!)[fieldname]
        return props
    }, [formState, isEditting])


    if (!book) return <Loader />
    const { title, thumbnail } = book
    return <BookersModal className='book-details' title={title} onClose={() => navigate('/books')} open={true}>
        {/* <div className="book-details center-abs modal-layout"> */}
        {/* <header className="header">
                {title}
            </header> */}
        <div className="body flex column">
            <div className="book-img">
                <img src={thumbnail} />
            </div>
            <form className={`book-edit-form ${!isEditting && 'view-mode'}`} onSubmit={handleSubmit(onSubmit)}>
                {/* {formFields.map(({ name, options, editable }) => <DetailItem key={name} editable={editable} {...getDetailItemProps(name, options)} />)} */}
                <DetailItem {...getDetailItemProps('id', {})} />
                <DetailItem {...getDetailItemProps('title', {})} />
                <DetailItem {...getDetailItemProps('subtitle', {})} />
                <DetailItem {...getDetailItemProps('authors', {})} />
                <PublishedDateField register={register} isEditting={isEditting} value={watch('publishedDate')} onChange={onChangePublishedDate} />
            </form>
            <div className="form-actions flex justify-center">
                {isEditting && <BookersButton onClick={handleSubmit(onSubmit)}>Submit</BookersButton>}
                <BookersButton onClick={handleEditBook} color="secondary">{isEditting ? 'Cancel' : 'Edit'}</BookersButton>
                <BookersButton onClick={handleDeleteBook} color="error">Delete</BookersButton>
            </div>
        </div>
        {/* </div> */}
    </BookersModal>
}