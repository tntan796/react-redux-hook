class TaskModel {
    constructor(id: string = '', name: string = '', description: string = '', status: string = '') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
    }

    id: string = '';
    name: string = '';
    description: string = '';
    status: string = '';
}

export default TaskModel