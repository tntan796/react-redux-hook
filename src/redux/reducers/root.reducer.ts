import { combineReducers } from "redux";
import isDisplayTaskFormReducer from "./isDisplayTaskForm.reducer";
import searchReducer from "./search.reducer";
import selectedTaskReducer from "./selectedTask.reducer";
import taskReducer from "./tasks.reducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    search: searchReducer,
    isDisplayTaskForm: isDisplayTaskFormReducer,
    selectedTask: selectedTaskReducer
});

export default rootReducer;