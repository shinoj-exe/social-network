import React from 'react'
import { Box,useTheme } from "@mui/material";

const SearchBox = ({users}) => {
  const theme = useTheme();
  const background = theme.palette.background.default;
  return (
    <Box position="fixed"
          right="50%"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
          >
            <Box display="flex" justifyContent="flex-end" p="1rem">
                {users.map((user)=>(
                    <div >{user.firstName}</div>
                ))}
          </Box>
    </Box>
  )
}

export default SearchBox