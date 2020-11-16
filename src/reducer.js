export default function reducer(state = {}, action) {
    if (action.type == "GET_LIST") {
        state = Object.assign({}, state, {
            friendsList: action.friendsList,
            receivedRequests: action.received,
            sentRequests: action.sent,
        });
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            friendsList: state.friendsList.map((user) => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
            receivedRequests: state.receivedRequests.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendsList: state.friendsList.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
        };
    }

    return state;
}
