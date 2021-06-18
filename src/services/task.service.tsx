import { Observable, of, throwError } from "rxjs";
import TaskModel from "../models/task.model";
import { TaskMockData } from "../commons/mock-data/tasks.mock";
import { v4 as uuid } from "uuid";

class TaskService {
    tasks: TaskModel[] = TaskMockData;

    getTasks() {
        return of(this.tasks);
    }

    addTask(task: TaskModel): Observable<TaskModel> {
        task.id = uuid();
        this.tasks.push(task);
        return of(task);
    }

    updateTask(task: TaskModel): Observable<TaskModel> {
        const updateIndex = this.tasks.findIndex(t => t.id === task.id);
        if (updateIndex === -1) {
            throwError(() => new Error('Not found task'));
        }
        this.tasks[updateIndex] = {...task};
        return of(task);
    }

    deleteTask(taskId: String): Observable<TaskModel[]> {
        const deleteIndex = this.tasks.findIndex(t => t.id === taskId);
        if (deleteIndex === -1) {
            throwError(() => new Error('Not found task'));
        }
        this.tasks.splice(deleteIndex, 1);
        return of(this.tasks);
    }

    filterTask(search: String = '', status: String = ''): Observable<TaskModel[]> {
        let filterTasks = [...this.tasks];
        if (search) {
            filterTasks = filterTasks.filter(t => t.description.toLowerCase().includes(search.toLowerCase()) ||
                                                  t.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (status) {
            filterTasks = filterTasks.filter(t => t.status === status);
        }
        return of(filterTasks);
    }
}
export default TaskService;