import { DataTable } from 'primereact/datatable';
import { useEffect, useRef, useState } from 'react';
import { Column } from 'primereact/column';
import TaskService from '../../services/task.service';
import TaskModel from '../../models/task.model';
import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import TaskDetail from '../task-detail/task-detail.component';
import { Toast } from 'primereact/toast';
import { firstValueFrom } from 'rxjs';

function TaskList() {
    const taskService = new TaskService();
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [search, setSearch] = useState('');
    const [displayForm, setDisplayForm] = useState(false);
    const [editTaskData, setEditTaskData] = useState<TaskModel>(new TaskModel());
    const toast: any = useRef(null);

    useEffect(() => {
        taskService.getTasks().subscribe(response => {
            setTasks(response);
        })
    }, []);

    const editTask = (task: TaskModel) => {
        setDisplayForm(true);
        setEditTaskData(task);
    }

    const handleAdd = () => {
        setEditTaskData(new TaskModel())
        openForm();
    }

    const deleteTask = (task: TaskModel) => {
        try {
            const tasksData = [...tasks];
            const taskDeleteIndex = tasksData.findIndex(t => t.id === task.id);
            if (taskDeleteIndex !== -1) {
                tasksData.splice(taskDeleteIndex, 1);
            }
            setTasks(tasksData);
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Delete Success', life: 3000 });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Delete Fail', life: 3000 });
        }
    }

    const openForm = () => {
        setDisplayForm(true);
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

    const handleSave = async (task: TaskModel) => {
        if (!task.id) {
            try {
                await firstValueFrom(taskService.addTask(task));
                toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Add Success', life: 3000 });
                setDisplayForm(false);
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Add Fail', life: 3000 });
            }
        } else {
            try {
                await firstValueFrom(taskService.updateTask(task));
                toast.current.show({ severity: 'success', summary: 'Error Message', detail: 'Edit Success', life: 3000 });
                // Change state => Re-render
                setDisplayForm(false);
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Edit Fail', life: 3000 });
            }
        }
    }

    return (
        <div className="card p-p-3">
            {displayForm && (
                <div className="p-shadow-3 p-p-2">
                    <TaskDetail
                        saveEvent={handleSave}
                        closeFormEvent={() => setDisplayForm(false)}
                        openFormEvent={openForm}
                        editTask={editTaskData}
                    ></TaskDetail>
                </div>
            )}

            <div className="p-shadow-3 p-p-2 p-mt-5">
                <h4>Danh sách Task</h4>
                <div className="p-grid">
                    <div className="p-col-3">
                        <span className="p-input-icon-left w-100">
                            <i className="pi pi-search" />
                            <InputText value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="w-100" />
                        </span>
                    </div>
                    <div className="p-col-3">
                        <Button onClick={() => handleFilter()} icon="pi pi-search" iconPos="right" />
                    </div>
                    <div className="p-col-6 p-text-right">
                        <Button label="Thêm mới" onClick={() => handleAdd()} icon="pi pi-plus" iconPos="right" />
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
            <Toast ref={toast} />
        </div>
    )
}

export default TaskList;