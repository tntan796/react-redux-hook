class TaskModel {
    constructor(id: String = '', name: String = '', description: String = '', status: String = '') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
    }

    id: String = '';
    name: String = '';
    description: String = '';
    status: String = '';
}

export default TaskModel