import { BookersButton } from "cmps/base/bookers-button";
import { FC } from "react";
import { useNavigate } from "react-router";

export const Homepage: FC<{}> = () => {
    const navigate = useNavigate()
    return <div className="homepage">
        <div className="hero">
            <div className="hero-content">

                <h1 className="hero-title">
                    Welcome to bookers
                </h1>
                <BookersButton onClick={() => { navigate('/books') }} variant="contained">
                    Start exploring
                </BookersButton>
            </div>
        </div>
    </div>
}