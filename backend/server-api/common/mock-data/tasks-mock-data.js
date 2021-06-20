const { v4: uuidv4 } = require('uuid');

const TaskStatus = {
    READY: 'ready',
    IN_PROGRESS: 'in progress',
    SUCCESS: 'success'
}

const TaskMockData = [
    {
        id: uuidv4(),
        name: 'Go to school',
        description: 'I usualy go to school',
        status: TaskStatus.IN_PROGRESS
    },
    {
        id: uuidv4(),
        name: 'Go to Slepping',
        description: 'Go to sleeping',
        status: TaskStatus.SUCCESS
    },
    {
        id: uuidv4(),
        name: 'Have breakfast',
        description: 'I usualy have breakfast',
        status: TaskStatus.IN_PROGRESS
    },
    {
        id: uuidv4(),
        name: 'Buy something',
        description: 'Buy something',
        status: TaskStatus.READY
    }
];

module.exports = TaskMockData;