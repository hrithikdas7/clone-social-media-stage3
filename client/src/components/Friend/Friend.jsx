// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setFriends } from "../../store/authSlice";
// //import "./Friend.scss"; // Import the SCSS file for styling
// import UserImage from "components/UserImage/UserImage";

// const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { _id } = useSelector((state) => state.user);
//   const token = useSelector((state) => state.token);
//   const friends = useSelector((state) => state.user.friends);

//   // const isFriend = friends.find((friend) => friend._id === friendId);
//   const isFriend = Array.isArray(friends) && friends.find((friend) => friend._id === friendId);
//   const patchFriend = async () => {
//     const response = await fetch(
//       `http://localhost:3001/users/${_id}/${friendId}`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data = await response.json();
//     dispatch(setFriends({ friends: data }));
//   };

//   const handleClick = () => {
//     navigate(`/profile/${friendId}`);
//     navigate(0);
//   };

//   return (
//     <div className="friend-container">
//       <div className="friend-info" onClick={handleClick}>
//         <div className="user-image">
//           {/* <img src={userPicturePath} alt="User" /> */}
//           <UserImage image={userPicturePath} size="55px" />
//         </div>
//         <div className="user-details">
//           <h5>{name}</h5>
//           <p>{subtitle}</p>
//         </div>
//       </div>
//       <button
//         className={`friend-action ${isFriend ? "remove" : "add"}`}
//         onClick={patchFriend}
//       >
//         {isFriend ? "Remove Friend" : "Add Friend"}
//       </button>
//     </div>
//   );
// };

// export default Friend;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../store/authSlice";
import UserImage from "components/UserImage/UserImage";
import { MdPersonRemoveAlt1, MdPersonAddAlt1 } from "react-icons/md";
import "./Friend.scss";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  

  const isFriend =
    Array.isArray(friends) && friends.find((friend) => friend._id === friendId);
  const isSelf = loggedInUserId === friendId; // Check if the friendId matches the logged-in user's _id

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${loggedInUserId}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    
  };


  const handleClick = () => {
    navigate(`/profile/${friendId}`);
    navigate(0);
  };

  return (
    <div className="friend-container">
      <div className="friend-info" onClick={handleClick}>
        <div className="user-image">
          <UserImage image={userPicturePath} size="55px" />
        </div>
        <div className="user-details">
          <h5>{name}</h5>
          <p>{subtitle}</p>
        </div>
      </div>
      {/* Render the button only for other users */}
      {!isSelf && (
        <button
          className={`friend-action ${isFriend ? "remove" : "add"}`}
          onClick={patchFriend}
        >
          {isFriend ? <MdPersonRemoveAlt1 /> : <MdPersonAddAlt1 />}
        </button>
      )}
    </div>
  );
};

export default Friend;
