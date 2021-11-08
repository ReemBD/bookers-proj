import { FC } from "react"

interface Props {
    message: string
}

export const InputError: FC<Props> = ({ message }) => {
    return <div className="input-error">
        {message}
    </div>
}