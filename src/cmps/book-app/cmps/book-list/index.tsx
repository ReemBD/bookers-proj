import { Book } from "lib/models/Book.interface";
import { FC, memo } from "react";
import { BookPreview } from "./cmps/book-preview";

interface Props {
    books: Book[]
}
export const BookList: FC<Props> = memo(({ books }) => {
    return <ul className="book-list">
        {books.map(book => <BookPreview key={book.id} book={book} />)}
    </ul>
})