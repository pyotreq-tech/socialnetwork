export default function reducer(state = {}, action) {
    if (action.type == "GET_LIST") {
        return {
            ...state,
            friendsWannabes: "lol",
        };
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        return {
            ...state,
            friendsWannabes: "lol",
        };
    }

    if (action.type == "UNFRIEND") {
        return {
            ...state,
            friendsWannabes: "lol",
        };
    }

    return state;
}
