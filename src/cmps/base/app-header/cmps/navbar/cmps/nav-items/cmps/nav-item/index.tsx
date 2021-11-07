import { INavItem } from "lib/models/NavItem.interface"
import { FC } from "react"
import { Link } from "react-router-dom"

interface Props {
    item: INavItem
}
export const NavItem: FC<Props> = ({ item }) => {

    const { to, title, className } = item
    return <li className={`nav-item ${className}`}>
        <Link to={to}>
            {title}
        </Link>
    </li>
}