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

export function chatMessages(chatMsgs) {
    return {
        type: "CHAT_MESSAGES",
        chatMessages: chatMsgs,
    };
}

export function newMessage(chatMsgs) {
    console.log({ chatMsgs });
    return {
        type: "NEW_MESSAGE",
        newMessage: chatMsgs,
    };
}
export function privateMessage(chatMsgs) {
    return {
        type: "NEW_PRIVATE_MESSAGE",
        privateMessage: chatMsgs,
    };
}

// Private Chat:

export function privateMessages(privateMessages) {
    return {
        type: "PRIVATE_MESSAGES",
        privateMessages: privateMessages,
    };
}

// export function newMessage(chatMsgs) {
//     console.log({ chatMsgs });
//     return {
//         type: "NEW_MESSAGE",
//         newMessage: chatMsgs,
//     };
// }
