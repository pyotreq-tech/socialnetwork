// will contain all of our action creator functions

import axios from "./axios";

// action creater - just a funciton that returns an object

// the object that is returned is called an ACTION

// export function fn() {
//     return {
//         type: "UPDATE_SOMETHING",
//     };
// }

async function getList() {
    const { data } = await axios.get("/getFriends");
    return {
        type: "GET_LIST",
        friendsList: data,
    };
}
export { getList };

async function acceptFriend(buttonMessage, id) {
    const { data } = await axios.post(`/FriendStatus/${buttonMessage}`, {
        id: id,
    });
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        friendsList: data,
    };
}
export { acceptFriend };

async function unfriend(buttonMessage, id) {
    const { data } = await axios.post(`/FriendStatus/${buttonMessage}`, {
        id: id,
    });
    return {
        type: "UNFRIEND",
        friendsList: data,
    };
}
export { unfriend };
