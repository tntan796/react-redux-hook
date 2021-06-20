import { combineReducers } from "redux";
import searchReducer from "./search.reducer";
import taskReducer from "./tasks.reducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    search: searchReducer
});

export default rootReducer;