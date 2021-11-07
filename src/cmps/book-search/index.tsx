import { FC, memo, useCallback, useMemo, useState } from "react";
import debounce from 'lodash.debounce'
import { bookService } from "services/bookService";
import { useUpdateEffect } from "lib/hooks/useUpdateEffect";
import { BookSearchInput } from "./cmps/book-search-input";
import { BookSearchDropdown } from "./cmps/book-search-dropdown";
import { useToggle } from "lib/hooks/useToggle";
import useOnclickOutside from "react-cool-onclickoutside";

interface Props {
}
export const BookSearch: FC<Props> = memo(() => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchRes, setSearchRes] = useState([])
    const [isInputFocused, toggleInputFocused] = useToggle(false)

    useUpdateEffect(() => {
        loadSearchRes(searchTerm)
    }, [searchTerm])

    const ref = useOnclickOutside(() => {
        toggleInputFocused(false);
    });


    const loadSearchRes = useCallback(debounce(async (searchTerm) => {
        const googleBooks = await bookService.getGoogleBooks(searchTerm)
        setSearchRes(googleBooks)
    }, 500), [])

    const onChange = useCallback(({ target }) => {
        setSearchTerm(target.value)
    }, [])

    const onFocus = useCallback(() => {
        toggleInputFocused(true)
    }, [])

    const isDropdownShown = useMemo(() => {
        return Boolean(searchRes.length && searchTerm.length) && isInputFocused
    }, [isInputFocused, searchRes.length, searchTerm])

    return <div ref={ref} className="book-search">
        <BookSearchInput onFocus={onFocus} onChange={onChange} />
        {isDropdownShown ? <BookSearchDropdown books={searchRes} /> : null}
    </div>
})