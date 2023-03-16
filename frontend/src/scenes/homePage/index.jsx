import { Box } from '@mui/material'
import React from 'react'
import LoginPage from 'scenes/loginPage'
import Navbar from 'scenes/navbar'

const HomePage = () => {
  return (
    <Box>
      <Navbar></Navbar>
      <LoginPage></LoginPage>
    </Box>
  )
}

export default HomePage