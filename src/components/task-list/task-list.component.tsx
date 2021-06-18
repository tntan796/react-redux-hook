import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import TaskService from '../../services/task.service';
import TaskModel from '../../models/task.model';
import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import TaskDetail from '../task-detail/task-detail.component';
function TaskList() {

    const taskService = new TaskService();
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [search, setSearch] = useState('');
    const [displayForm, setDisplayForm] = useState(false);

    useEffect(() => {
        taskService.getTasks().subscribe(response => {
            setTasks(response);
        })
    }, []);

    const editTask = (task: TaskModel) => {
        console.log('Edit task:', task);
    }

    const deleteTask = (task: TaskModel) => {
        console.log('Delete task:', task);
    }

    const actionBodyTemplate = (rowData: TaskModel) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-mr-2" onClick={() => editTask(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteTask(rowData)} />
            </React.Fragment>
        );
    }

    const handleFilter = () => {
        taskService.filterTask(search, '').subscribe(res => {
            setTasks(res);
        })
    }

    return (
        <div className="card p-p-3">
            <div className="p-shadow-3 p-p-2">
                <TaskDetail ></TaskDetail>
            </div>

            <div className="p-shadow-3 p-p-2 p-mt-5">
                <div className="p-grid">
                    <div className="p-col-3">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                        </span>
                    </div>
                    <div className="p-col-3">
                        <Button onClick={() => handleFilter()} icon="pi pi-search" iconPos="right" />
                    </div>
                    <div className="p-col-6 p-text-right">
                        <Button label="Thêm mới" onClick={() => handleFilter()} icon="pi pi-plus" iconPos="right" />
                    </div>
                </div>
                <DataTable value={tasks}>
                    <Column field="id" header="Id"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default TaskList;