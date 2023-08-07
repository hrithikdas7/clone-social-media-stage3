// import React from "react";
// import UserImage from "../UserImage/UserImage";
// import { useSelector } from "react-redux";

// const FriendsList = () => {

//   const friends = useSelector((state) => state.user.friends);
//   return (
//     <div>
//       <h3>Friends List</h3>
//       <ul>
//         {friends.map((friend) => (
//           <li key={friend._id}>
//             <UserImage image={friend.picturePath} size="50px" />
//             {friend.firstName} {friend.lastName}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setFriends } from "../../store/authSlice";
// import Friend from "../Friend/Friend";

// const FriendList = ({ userId }) => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.token);
//   const friends = useSelector((state) => state.user.friends);
//   //const isLoading = useSelector((state) => state.user.isLoading); // Add a loading flag in Redux store

//   const getFriends = async () => {
    
//     const response = await fetch(
//       `http://localhost:3001/users/${userId}/friends`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await response.json();
//     dispatch(setFriends({ friends: data }));
//   };

//   useEffect(() => {
//     if (friends.length === 0) {
//       // Only fetch friends if the array is empty
//       getFriends();
//     }
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // if (isLoading) {
//   //   return <p>Loading friends...</p>;
//   // }

//   return (
//     <div>
//       <h1>Friend List</h1>
//       <div>
//         {Array.isArray(friends) ? (
//           friends.map((friend) => (
//             <Friend
//               key={friend._id}
//               friendId={friend._id}
//               name={`${friend.firstName} ${friend.lastName}`}
//               subtitle={friend.occupation}
//               userPicturePath={friend.picturePath}
//             />
//           ))
//         ) : (
//           <p>No friends found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FriendList;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../../store/authSlice";
import Friend from "../Friend/Friend";
//import WidgetWrapper from "components/WidgetWrapper";
//import "../styles/FriendListWidget.scss"; // Import the SCSS file

const FriendList = ({userId}) => {
  const dispatch = useDispatch();
 // const userId = useSelector((state)=>state._id)
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data+"test");
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!Array.isArray(friends)) {
    return <div>Loading...</div>; // You can display a loader or an error message here
  }

  return (
    <>
      <h5 className="widget-title">Friend List</h5>
      <div className="friend-list">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </div>
    </>
  );
};

export default FriendList;














