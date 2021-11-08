import Modal from "@mui/material/Modal"
import { ModalProps } from '@mui/material'
import { FC, ReactNode } from "react"

interface Props extends ModalProps {
    title: string
}
export const BookersModal: FC<Props> = ({ children, title, className, ...rest }) => {
    return <Modal disableAutoFocus  {...rest}>
        <div className={`modal-content center-abs main-layout modal-layout ${className}`}>
            <div className="modal-header">
                {title}
            </div>
            {children}
        </div>
    </Modal>
}