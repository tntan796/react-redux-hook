import { ACTION_TYPE } from './../../commons/constants';

export const getTasks = () => {
    return {
        type: ACTION_TYPE.LIST_ALL
    }
}

export const searchTask = (search: String) => {
    return {
        type: ACTION_TYPE.SEARCH_TASK,
        payload: search
    }
}