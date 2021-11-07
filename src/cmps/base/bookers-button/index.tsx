import Button from "@mui/material/Button"
import { FC, ReactNode } from "react"

interface Props {
    children: ReactNode
    [rest: string]: any
}
export const BookersButton: FC<Props> = ({ children, ...rest }) => {
    return <Button {...rest}>{children}</Button>
}