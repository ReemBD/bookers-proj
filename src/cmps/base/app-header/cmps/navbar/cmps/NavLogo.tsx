import { useNavigate } from "react-router"

export const NavLogo = () => {
    const navigate = useNavigate()
    return <h1 onClick={() => navigate('/')} className="nav-logo">
        Bookers
    </h1>
}