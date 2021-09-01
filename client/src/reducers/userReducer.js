let initialState = null;

if (typeof window !== undefined) {
  //getting if any previous item exists in local storage
  if (localStorage.getItem("user")) {
    initialState = JSON.parse(localStorage.getItem("user"));
  } else {
    initialState = null;
  }
}
//load cart items from localStorage

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
