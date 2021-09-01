import { userReducer } from "./userReducer";
import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  drawer: drawerReducer,
});

export default rootReducer;
