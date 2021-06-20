import { ACTION_TYPE } from './../../commons/constants';

type Actions = {
    type: ACTION_TYPE,
    payload: any
}

const isDisplayTaskFormReducer = (state = false, action: Actions) => {
    switch (action.type) {
        case ACTION_TYPE.OPEN_FORM:
            return true;
        case ACTION_TYPE.CLOSE_FORM:
            return false;
        case ACTION_TYPE.TOGGLE_FORM:
            return !state;
        default:
            return state;
    }
}
export default isDisplayTaskFormReducer;