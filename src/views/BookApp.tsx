import { BookersButton } from 'cmps/base/bookers-button'
import { BookersSearchInput } from 'cmps/base/bookers-search-input'
import { Loader } from 'cmps/base/loader'
import { BookList } from 'cmps/book-app/cmps/book-list'
import { useBooks } from 'lib/hooks/useBooks'
import debounce from 'lodash.debounce'
import { ChangeEventHandler, FC, useCallback, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { bookService } from 'services/bookService'

interface Props {
}

export const BookApp: FC<Props> = ({ children }) => {
    const navigate = useNavigate()
    const { books, bookFilter, setBookFilter, loadBooks } = useBooks()

    useEffect(() => {
        (async () => {
            loadBooks(bookService.getEmptyBookFilter())
        })()
    }, [])

    useEffect(() => {
        console.log({ bookFilter })
    }, [bookFilter])
    const debouncedLoadBooks = useCallback(debounce((bookFilter) => {
        loadBooks(bookFilter)
    }, 250), [])

    const onChange: ChangeEventHandler<HTMLInputElement> | undefined = ({ target }) => {
        const { value } = target
        const newFilter = { ...bookFilter, freeTxt: value }
        setBookFilter(newFilter)
        debouncedLoadBooks(newFilter)
    }

    if (!books) return <Loader />
    return <main className="book-app">
        <Outlet />
        <div className="filter-container flex justify-start">
            <BookersSearchInput onChange={onChange} value={bookFilter.freeTxt} inputProps={{ placeholder: 'Search...', value: bookFilter.freeTxt }} />
            <BookersButton variant="outlined" className="filter-button" onClick={() => { navigate('/books/filter') }} color="secondary">
                Filters
            </BookersButton>
        </div>
        <BookList books={books} />
    </main>


}