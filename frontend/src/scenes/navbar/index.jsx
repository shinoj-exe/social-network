import React from 'react'
import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from 'components/UserImage';
import OutsideClick from 'components/OutsideClick';
import NotificationPanel from 'scenes/notificationPanel';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [searchUsers,setSearchUsers]=useState(false);
  const [users,setUsers]=useState([]);
  const [query,setQuery]=useState("");

  const [messageNotification,setMessageNotification]=useState(false);
  const [bellNotification,setBellNotification]=useState(false);
  const [helpNotification,setHelpNotification]=useState(false);

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const user = useSelector((state)=>state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();
  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;


  const main = palette.neutral.main;
    const medium = palette.neutral.medium;

  const fullName = `${user.firstName} ${user.lastName}`;
  // const fullName ="Shinoj"

  const handleSearch =async ()=>{
    const response  = await fetch(`http://localhost:3001/users/`,
    {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    }
    )
    const data = await response.json();
    console.log(data);
    setUsers(data);
    setSearchUsers(!searchUsers);
  }
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
      <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary" onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Social Network
        </Typography>

        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." onClick={handleSearch} onChange={e=>{
              setQuery(e.target.value); 

              }} />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {
        searchUsers &&<OutsideClick onClickOutside={()=>{setSearchUsers(!searchUsers)}}>
        <Box position="absolute"
          right="50%"
          top="10%"
          zIndex="10"
          maxWidth="600px"
          minWidth="400px"
          backgroundColor={neutralLight}
          sx={{
            padding:"1.5rem 1.5rem 0.75rem 1.5rem",
            borderRadius:"0.75rem",
            maxHeight:"480px",
            overflowY:"scroll",
            // scrollbarWidth: "1px",
            // scrollbarColor: "hsl(0 0% 50%)",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            
          }}
          >
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {users.filter(user=>user.firstName.toLowerCase().includes(query)).map((user)=>(
                    <FlexBetween>
                      <FlexBetween gap="1rem">
                      <UserImage image={user.picturePath} size="55px" />
                      <Box
                        onClick={() => {
                          navigate(`/profile/${user._id}`);
                          navigate(0);
                        }}
                      >
                        <Typography
                          color={main}
                          variant="h5"
                          fontWeight="500"
                          sx={{
                            "&:hover": {
                              color: palette.primary.light,
                              cursor: "pointer",
                            },
                          }}
                        >
                          {user.firstName}{user.lastName}
                        </Typography>
                        <Typography color={medium} fontSize="0.75rem">
                          {user.occupation}
                        </Typography>
                      </Box>
                    </FlexBetween>
                  </FlexBetween>
                ))}
            </Box>
        </Box>
        </OutsideClick>
      }
      {
        messageNotification && 
        <OutsideClick onClickOutside={()=>{setMessageNotification(!messageNotification)}}>
          <Box position="fixed"
          right="50px"
          top="10%"
          zIndex="10"
          maxWidth="600px"
          minWidth="500px"
          minHeight="100px"
          backgroundColor={neutralLight}
          sx={{
            padding:"1.5rem 1.5rem 0.75rem 1.5rem",
            borderRadius:"0.75rem",
            maxHeight:"480px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            
          }}>
            <NotificationPanel subtitle={"No new messages!"}/>
          </Box>
        </OutsideClick>
      }
      {
        bellNotification &&
        <OutsideClick onClickOutside={()=>{setBellNotification(!bellNotification)}}>
          <Box position="fixed"
          right="40px"
          top="10%"
          zIndex="10"
          maxWidth="600px"
          minWidth="500px"
          minHeight="100px"
          backgroundColor={neutralLight}
          sx={{
            padding:"1.5rem 1.5rem 0.75rem 1.5rem",
            borderRadius:"0.75rem",
            maxHeight:"480px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            
          }}>
            <NotificationPanel subtitle={"No new Notifications!"}/>
          </Box>
        </OutsideClick>

      }
      {
        helpNotification &&
        <OutsideClick onClickOutside={()=>{setHelpNotification(!helpNotification)}}>
          <Box position="fixed"
          right="30px"
          top="10%"
          zIndex="10"
          maxWidth="600px"
          minWidth="500px"
          minHeight="100px"
          backgroundColor={neutralLight}
          sx={{
            padding:"1.5rem 1.5rem 0.75rem 1.5rem",
            borderRadius:"0.75rem",
            maxHeight:"480px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            
          }}>
            <NotificationPanel subtitle={"Please email your concerns to shinojmuralee@gmail.com"}/>
          </Box>
        </OutsideClick>
      }

      
      {/* desktop */}
      {
        isNonMobileScreens ? (
        <FlexBetween gap ="2rem">
          <IconButton onClick={()=>{dispatch(setMode())}}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" ,cursor:"Pointer"} } onClick={()=>{setMessageNotification(!messageNotification)}} />
          <Notifications sx={{ fontSize: "25px" ,cursor:"Pointer"} } onClick={()=>{setBellNotification(!bellNotification)}} />
          <Help sx={{ fontSize: "25px",cursor:"Pointer" } } onClick={()=>{setHelpNotification(!helpNotification)}} />
          <FormControl variant='standard' value={fullName}>
            <Select value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}>
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
        ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu/>
        </IconButton>)
      }
      
      {/* mobile */}
      {
        !isNonMobileScreens && isMobileMenuToggled && (
          <Box position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}>
            {/* close items */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          {/* menu items */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
          </Box>
        ) 
      }


    </FlexBetween>
  )
}

export default Navbar