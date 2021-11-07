import { INavItem } from "lib/models/NavItem.interface"
import { useRef } from "react"
import { NavItem } from "./cmps/nav-item"

export const NavItems = () => {
    const { current: navItems } = useRef<INavItem[]>([
        {
            className: 'nav-item',
            title: 'Books',
            to: '/books'
        },
        {
            className: 'nav-item',
            title: 'About',
            to: '/about'
        },
        {
            className: 'nav-item',
            title: 'Login',
            to: '/login'
        },
    ])
    return <ul className="nav-menu">
        {navItems.map(navItem => <NavItem key={navItem.title} item={navItem} />)}
    </ul>
}