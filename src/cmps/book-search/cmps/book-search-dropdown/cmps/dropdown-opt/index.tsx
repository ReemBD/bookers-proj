import { FC } from "react"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useBooks } from "lib/hooks/useBooks";

interface Props {
    book: any
}
export const DropdownOpt: FC<Props> = ({ book }) => {
    const { addBook } = useBooks()

    const onAddBook: React.MouseEventHandler<SVGSVGElement> | undefined = (ev) => {
        ev.stopPropagation()
        addBook(book)
    }
    return <div className="book-search-dropdown-opt flex justify-between">
        <div className="book-opt-title">
            {book.volumeInfo.title}
        </div>
        <AddCircleIcon onClick={onAddBook} className="add-book-btn cr-pointer" />
    </div>
}