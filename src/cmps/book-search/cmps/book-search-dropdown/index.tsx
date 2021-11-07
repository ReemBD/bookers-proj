import { FC, memo } from "react";
import { DropdownOpt } from "./cmps/dropdown-opt";

interface Props {
    books: any[]
}

export const BookSearchDropdown: FC<Props> = memo(({ books }) => {
    return <div className="book-search-dropdown">
        {books.map(book => <DropdownOpt key={book.id} book={book} />)}
    </div>
})