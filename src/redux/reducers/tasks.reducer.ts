import { TaskMockData } from './../../commons/mock-data/tasks.mock';
import { ACTION_TYPE } from './../../commons/constants';
import { getTasks } from './../actions/action';
type Actions = ReturnType<typeof getTasks>

const taskReducer = (state = TaskMockData, action: Actions) => {
    switch(action.type) {
        case ACTION_TYPE.LIST_ALL:
            return [...state];
        default:
            return [...state];
    }
}
export default taskReducer