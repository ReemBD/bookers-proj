import { Book } from "lib/models/Book.interface";
import { FC, memo, useMemo } from "react";
import { useNavigate } from "react-router";

interface Props {
    book: Book
}

export const BookPreview: FC<Props> = memo(({ book }) => {
    const navigate = useNavigate()

    const { title, thumbnail, id, listPrice: { amount, currencyCode } } = book

    const currencySymbol = useMemo(() => {
        switch (currencyCode) {
            case 'USD':
                return '$'
            case 'EUR':
                return '€'
            case 'ILS':
            default:
                return '₪'
        }
    }, [])
    return <article onClick={() => navigate(`/books/${id}`)} className="book-preview flex column justify-between">
        <div className="img-container">
            <img src={thumbnail} />
        </div>
        <h3 className="title">
            {title}
        </h3>
        <span className="book-price">{currencySymbol} {amount}</span>
    </article>
})