import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectProps, MenuItemProps } from '@mui/material'
import { FC } from "react";

interface Props extends SelectProps {

}

export const BookersSelect: FC<Props> = ({ ...rest }) => {
    return <Select {...rest} />
}

interface SelectItemProps extends MenuItemProps {

}

export const BookersSelectItem: FC<SelectItemProps> = ({ ...rest }) => {
    return <MenuItem {...rest} />
}