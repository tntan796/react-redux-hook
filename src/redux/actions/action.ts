import TaskModel from '../../models/task.model';
import { ACTION_TYPE } from './../../commons/constants';
import { Dispatch} from 'redux';
export const getTasksRequest= () => {
    return async (dispatch: Dispatch) => {
    }
}

export const getTasks = () => {
    return {
        type: ACTION_TYPE.LIST_ALL
    }
}

export const setTasks = (tasks: TaskModel[]) => {
    return {
        type: ACTION_TYPE.SET_TASKS,
        payload: tasks
    }
}

export const searchTask = (search: string) => {
    return {
        type: ACTION_TYPE.SEARCH_TASK,
        payload: search
    }
}

export const addTask = (task: TaskModel) => {
    return {
        type: ACTION_TYPE.ADD_TASK,
        payload: task
    }
}

export const editTask = (task: TaskModel) => {
    return {
        type: ACTION_TYPE.EDIT_TASK,
        payload: task
    }
}


export const selectedTask = (task: TaskModel) => {
    return {
        type: ACTION_TYPE.SELECTED_TASK,
        payload: task
    }
}

export const toggleTaskForm = () => {
    return {
        type: ACTION_TYPE.TOGGLE_FORM
    }
}


export const openTaskForm = () => {
    return {
        type: ACTION_TYPE.OPEN_FORM
    }
}


export const closeTaskForm = () => {
    return {
        type: ACTION_TYPE.CLOSE_FORM
    }
}

export const deleteTask = (id: string) => {
    return {
        type: ACTION_TYPE.DELETE_TASK,
        payload: id
    }
}