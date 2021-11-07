import { InputBase, InputBaseComponentProps } from "@mui/material";
import { alpha, styled } from "@mui/system";
import { FC, forwardRef, LegacyRef, memo } from "react";
import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(() => ({
    position: 'relative',
    borderRadius: '3px',
    backgroundColor: alpha('#fff', 0.15),
    '&:hover': {
        backgroundColor: alpha('#fff', 0.25),
    },
    marginRight: '1em',
    marginLeft: 0,
    width: '100%',

}));

const SearchIconWrapper = styled('div')(() => ({
    padding: '0 .5em',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(() => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: '10px 10px 10px 5px',
        paddingLeft: '40px',
        // vertical padding + font size from searchIcon
        width: '100%',

    },
}));

interface Props {
    inputProps?: InputBaseComponentProps | undefined
    [rest: string]: any
}
//it is not ideal to mix scss and styled components in a real app, and one should be consistent.
//in this case, I have decided to let it be for the demo purposes.

export const BookersSearchInput: FC<Props> = memo(forwardRef(({ inputProps, ...searchProps }, searchInputRef: LegacyRef<HTMLDivElement>) => {
    return <Search ref={searchInputRef} {...searchProps}>
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
            inputProps={{ 'aria-label': 'search', placeholder: 'Search...', ...inputProps }}
        />
    </Search>
}))