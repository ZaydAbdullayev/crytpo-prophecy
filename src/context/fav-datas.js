export const reFavDatas = (state = [], action) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "ADD":
            return [...state, action.payload];
        case "REMOVE":
            return state.filter((item) => item !== action.payload);
        default:
            return state;
    }
}

export const acFavDatas = (payload) => ({ type: "SET", payload });
export const acAddFav = (payload) => ({ type: "ADD", payload });
export const acRemoveFav = (payload) => ({ type: "REMOVE", payload });