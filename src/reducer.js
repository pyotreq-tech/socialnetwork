export default function reducer(state = {}, action) {
    if (action.type == "GET_LIST") {
        state = Object.assign({}, state, {
            friendsList: action.friendsList,
            receivedRequests: action.received,
            sentRequests: action.sent,
        });
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.filter((wannabe) => {
                if (wannabe.id == action.id) {
                    return {
                        ...wannabe,
                        accepted: true,
                    };
                } else {
                    return wannabe;
                }
            }),
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
