import { alpha, styled } from "@mui/system";
import { FC, forwardRef, LegacyRef, memo } from "react"
import InputBase from '@mui/material/InputBase';
import { BookersSearchInput } from "cmps/base/bookers-search-input";

interface Props {
    onChange: React.FormEventHandler<HTMLDivElement> | undefined
    [rest: string]: any
}



//obviously it is not ideal to mix scss and styled components in a real app, and one should be consistent.
//in this case, I have decided to let it be for the demo purposes.

export const BookSearchInput: FC<Props> = memo(forwardRef(({ ...searchProps }, searchInputRef: LegacyRef<HTMLDivElement>) => {
    return <BookersSearchInput className="login-and-search-layout" ref={searchInputRef} inputProps={{ placeholder: 'Add new book...' }} {...searchProps} />
}))