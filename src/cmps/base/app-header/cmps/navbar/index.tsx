import { BookSearch } from "cmps/book-search"
import { useNavigate } from "react-router"
import { NavItems } from "./cmps/nav-items"
import { NavLogo } from "./cmps/NavLogo"

export const NavBar = () => {
    const navigate = useNavigate()
    return <nav className="main-container ">
        <div className="navbar">
            <NavLogo />
            <BookSearch />
            <NavItems />
        </div>
    </nav>
}