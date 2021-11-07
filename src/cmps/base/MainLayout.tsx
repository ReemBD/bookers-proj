import { FC } from "react";

interface Props {
    children: React.ReactNode
    className?: string
}

export const MainLayout: FC<Props> = ({ children, className }) => {
    return <div className="main-container ">
        {children}
    </div>
}