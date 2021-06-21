import { Actions, ACTION_TYPE } from './../../commons/constants';
import TaskModel from '../../models/task.model';
import { v4 as uuid } from "uuid";

// type Actions = ReturnType<typeof setTask | typeof getTasks>

const taskReducer = (state: TaskModel[] = [], action: Actions) => {
    switch(action.type) {
        case ACTION_TYPE.LIST_ALL:
            return [...state];
        case ACTION_TYPE.ADD_TASK:
            const task: TaskModel = action.payload;
            task.id = uuid();
            state.push(task);
            return [...state];
        case ACTION_TYPE.EDIT_TASK:
          
            return [...state];
        case ACTION_TYPE.DELETE_TASK:
            const index = state.findIndex(t => t.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
            return [...state];
        default:
            return [...state];
    }
}
export default taskReducer