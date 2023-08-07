import React from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "store/authSlice";
import { useNavigate } from "react-router-dom";
import './HomePage.scss'
import UserProfile from "components/UserProfile/UserProfile";
import Feed from "components/Feed/Feed";
import MyPost from "components/MyPost/MyPost";
import FriendList from "components/FriendList/FriendList";
import { useSelector } from "react-redux";


const HomePage = () => {
  
  const friends = useSelector((state) => state.user.friends);
  const { _id } = useSelector((state) => state.user);
  return (
    <div className="main-div">
      <div className="profile-message">
        <div className="profile">
          <UserProfile/>
        </div>
        <div className="message">
          <h1>message</h1>
        </div>
      </div>
      <div className="addpost-feed">
        <div className="addpost">
         
          <MyPost/>
        </div>
        <div className="feed">
        
           <Feed/>
        </div>
      </div>
      <div className="friend-list">
        <div className="freindlist">
          <h1>friendlist</h1>
          <FriendList userId={_id} />
        </div>
      </div>
     
   
    </div>
  );
};

export default HomePage;
