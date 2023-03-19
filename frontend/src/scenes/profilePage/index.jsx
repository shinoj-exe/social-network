import React from 'react'
import { Box, useMediaQuery,Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loggedinUserFriends,setLoggedinUserFriends]= useState([]);
  const [mutualFriends,setMutualFriends]=useState([]);
  const [userFriends,setUserFriends]=useState([]);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
   
  const loggedInUserId = useSelector((state) => state.user._id);


  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    setUser(data);
    setUserFriends(data.friends);
  };

  const getLoggedInUserFriends = async ()=>{
    const response  = await fetch(`http://localhost:3001/users/${loggedInUserId}/friends`,
    {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    }
    )
    const data = await response.json();
    console.log(data);
    setLoggedinUserFriends(data);
  } 

  const checkMutual = ()=>{
    // if(user && loggedinUserFriends){
      const mutuallist = [];
      userFriends.map((friend)=>{
        // console.log(friend);
        loggedinUserFriends.map((loggedinFriends)=>{
          if(loggedinFriends._id===friend){
            // console.log(friend);
            mutuallist.push(loggedinFriends);
            // setMutualFriends([...mutualFriends,friend])
            console.log(mutuallist);
          }
        })
      })
      setMutualFriends(mutuallist)
    // }
  }
  useEffect(() => {
    getUser();
    getLoggedInUserFriends();
  }, []);
  
  useEffect(()=>{
    checkMutual();
  },[user,loggedinUserFriends]) // eslint-disable-line react-hooks/exhaustive-deps


  if (!user) return null;

  return (
    <Box>
      <Navbar></Navbar>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={user.picturePath} /> */}
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>

        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <Typography>Mutual Friends</Typography>
          {
            mutualFriends.map((friend)=>(
              <div>
                <div>{friend.firstName}</div>
              </div>
            ))
          }
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage