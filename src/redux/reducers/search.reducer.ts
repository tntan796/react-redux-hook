import { ACTION_TYPE } from './../../commons/constants';
import { searchTask } from './../actions/action';

type Actions = ReturnType<typeof searchTask>

const searchReducer = (state = '', action: Actions) => {
    switch(action.type) {
        case ACTION_TYPE.SEARCH_TASK:
            return action.payload;
        default:
            return state;
    }
}

export default searchReducer;