import { BookSearch } from "cmps/book-search"
import { NavItems } from "./cmps/nav-items"
import { NavLogo } from "./cmps/NavLogo"

export const NavBar = () => {
    return <nav className="main-container ">
        <div className="navbar">
            <NavLogo />
            <BookSearch />
            <NavItems />
        </div>
    </nav>
}