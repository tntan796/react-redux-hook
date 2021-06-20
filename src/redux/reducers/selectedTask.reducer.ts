import { Actions, ACTION_TYPE } from "../../commons/constants";
import TaskModel from "../../models/task.model";

const initialState = new TaskModel();

const selectedTaskReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case ACTION_TYPE.SELECTED_TASK:
            return {...action.payload};
        default:
            return {...state};
    }
}

export default selectedTaskReducer;