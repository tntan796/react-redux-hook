import { TaskStatus } from './../constants';
import TaskModel from "../../models/task.model";
import { v4 as uuid } from "uuid";

export const TaskMockData: TaskModel[] = [
    {
        id: uuid(),
        name: 'Go to school',
        description: 'I usualy go to school',
        status: TaskStatus.IN_PROGRESS
    },
    {
        id: uuid(),
        name: 'Go to Slepping',
        description: 'Go to sleeping',
        status: TaskStatus.SUCCESS
    },
    {
        id: uuid(),
        name: 'Have breakfast',
        description: 'I usualy have breakfast',
        status: TaskStatus.IN_PROGRESS
    },
    {
        id: uuid(),
        name: 'Buy something',
        description: 'Buy something',
        status: TaskStatus.READY
    }
];