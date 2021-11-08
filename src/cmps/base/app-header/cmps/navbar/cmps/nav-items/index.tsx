import Avatar from "@mui/material/Avatar"
import { auth } from "lib/firebase"
import { useUserData } from "lib/hooks/useUserData"
import { INavItem } from "lib/models/NavItem.interface"
import { BookersUser } from "lib/models/User.interface"
import { FC, useRef } from "react"
import { NavItem } from "./cmps/nav-item"

export const NavItems = () => {
    const { user } = useUserData()
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
            title: user ? <UserAvatar user={user} /> : 'Login',
            to: '/enter'
        },
    ])
    return <ul className="nav-menu">
        {navItems.map((navItem, idx) => <NavItem key={idx} item={navItem} />)}
    </ul>
}

interface UserAvatarProps {
    user: BookersUser
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
    return <Avatar alt={user.username} src={user.photo.photoURL || ''}>{user.username.charAt(0)}</Avatar>
}