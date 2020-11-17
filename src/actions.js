import axios from "./axios";

export async function getList() {
    const { data } = await axios.get("/getFriends");
    return {
        type: "GET_LIST",
        friendsList: data.rows,
        received: data.received,
        sent: data.sent,
    };
}

export async function acceptFriend(id) {
    const { data } = await axios.post(`/FriendStatus/Accept Friend`, {
        id: id,
    });
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id: id,
    };
}

export async function unfriend(id) {
    const { data } = await axios.post(`/FriendStatus/End Friendship`, {
        id: id,
    });
    return {
        type: "UNFRIEND",
        id: id,
    };
}
