import TaskModel from '../../models/task.model';
import { ACTION_TYPE } from './../../commons/constants';
import { Dispatch } from 'redux';
import TaskService from '../../services/task.service';
import { throwError } from 'rxjs';

const taskService = new TaskService();

export const getTasksRequest = () => {
    return (dispatch: Dispatch) => {
        return taskService.getTasks()
            .then((response: any) => {
                dispatch(setTasks(response.data.data))
            })
            .catch((error: any) => {
                throwError(() => new Error(error))
            })
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

export const filterTaskRequest = (search: string) => {
    return (dispatch: Dispatch) => {
        return taskService.fitlerTasks(search)
            .then((response: any) => {
                dispatch(setTasks(response.data.data))
            })
            .catch((error: any) => {
                throwError(() => new Error(error))
            })
    }
}

export const filterTaskSuccess = (tasks: TaskModel[]) => {
    return {
        type: ACTION_TYPE.FILTER_TASK_SUCCESS,
        payload: tasks
    }
}

export const addTaskRequest = (task: TaskModel) => {
    return (dispatch: Dispatch) => {
        return taskService.addTasks(task)
            .then((response: any) => {
                dispatch(addTaskSuccess(response.data.data))
            })
            .catch((error: any) => {
                throw new Error(error);
            })
    }
}

export const addTaskSuccess = (task: TaskModel) => {
    return {
        type: ACTION_TYPE.ADD_TASK_SUCCESS,
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

export const deleteTaskRequest = (id: string) => {
    return (dispatch: Dispatch) => {
        return taskService.deleteTask(id)
            .then(() => {
                dispatch(deleteTaskSuccess(id))
            })
            .catch((error: any) => {
                throw new Error(error);
            })
    }
}

export const deleteTaskSuccess = (id: string) => {
    return {
        type: ACTION_TYPE.DELETE_TASK_SUCCESS,
        payload: id
    }
}