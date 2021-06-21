import TaskModel from "../models/task.model";

export const TaskStatus = {
    READY: 'ready',
    IN_PROGRESS: 'in progress',
    SUCCESS: 'success'
}

export enum ACTION_TYPE {
    LIST_ALL = 'LIST_ALL',
    SET_TASKS = 'SET_TASKS',
    SEARCH_TASK = 'SEARCH_TASK',
    FILTER_TASK_REQUEST = 'FILTER_TASK_REQUEST',
    FILTER_TASK_SUCCESS = 'FILTER_TASK_SUCCESS',
    SELECTED_TASK = 'SELECTED_TASK',
    ADD_TASK_REQUEST = 'ADD_TASK_REQUEST',
    ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS',
    EDIT_TASK = 'EDIT_TASK',
    DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST',
    DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS',
    OPEN_FORM = 'OPEN_FORM',
    CLOSE_FORM = 'CLOSE_FORM',
    TOGGLE_FORM = 'TOGGLE_FORM'
}

export interface RootState {
    tasks: TaskModel[],
    isDisplayTaskForm: boolean,
    selectedTask: TaskModel,
    search: string
}

export type Actions = {
    type: ACTION_TYPE,
    payload: any
}

export class ResponseType {
    success: boolean = false;
    message: string = '';
    data: any = null;
}