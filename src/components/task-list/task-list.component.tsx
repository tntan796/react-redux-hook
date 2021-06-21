import { DataTable } from 'primereact/datatable';
import { useEffect, useRef } from 'react';
import { Column } from 'primereact/column';
import TaskModel from '../../models/task.model';
import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import TaskDetail from '../task-detail/task-detail.component';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import * as taskActions from '../../redux/actions/action';
import { RootState } from '../../commons/constants';
import TaskService from '../../services/task.service';


function TaskList() {
    let tasks = useSelector((state: RootState) => state.tasks);
    const isDisplayTaskForm = useSelector((state: RootState) => state.isDisplayTaskForm);
    const search = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();
    const toast: any = useRef(null);
    const taskService = new TaskService();
    useEffect(() => {
        dispatch(taskActions.getTasks());
        taskService.getTasks().subscribe(res => {
            console.log('hehehe', res);
            
        })
    }, [dispatch]);

    const editTask = (task: TaskModel) => {
        dispatch(taskActions.openTaskForm())
        dispatch(taskActions.selectedTask(task));
    }

    const handleAdd = () => {
        dispatch(taskActions.selectedTask(new TaskModel()));
        openForm();
    }

    const deleteTask = (task: TaskModel) => {
        try {
            dispatch(taskActions.deleteTask(task.id));
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Delete Success', life: 3000 });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Delete Fail', life: 3000 });
        }
    }

    const openForm = () => {
        dispatch(taskActions.openTaskForm());
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
        dispatch(taskActions.getTasks());
        tasks = [...tasks.filter(t => t.name.toLocaleLowerCase() === search.toLocaleLowerCase()
        || t.description.toLocaleLowerCase() === search.toLocaleLowerCase())];
        console.log('Tasks:', tasks);
    }

    const handleSave = async (task: TaskModel) => {
        if (!task.id) {
            try {
                // await firstValueFrom(taskService.addTask(task));
                dispatch(taskActions.addTask(task));
                dispatch(taskActions.closeTaskForm());
                toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Add Success', life: 3000 });
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Add Fail', life: 3000 });
            }
        } else {
            try {
                toast.current.show({ severity: 'success', summary: 'Error Message', detail: 'Edit Success', life: 3000 });
                dispatch(taskActions.editTask(task));
                // Change state => Re-render
                dispatch(taskActions.closeTaskForm());
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Edit Fail', life: 3000 });
            }
        }
    }

    return (
        <div className="card p-p-3 p-pt-0">
            {isDisplayTaskForm && (
                <div className="p-shadow-3 p-p-2 p-pt-0 p-mb-2">
                    <TaskDetail
                        saveEvent={handleSave}
                        closeFormEvent={() => dispatch(taskActions.closeTaskForm())}
                        openFormEvent={openForm}
                    ></TaskDetail>
                </div>
            )}

            <div className="p-shadow-3 p-p-2 p-mt-0">
                <h4 className="p-pt-0">Danh sách Task</h4>
                <div className="p-grid">
                    <div className="p-col-3">
                        <span className="p-input-icon-left w-100">
                            <i className="pi pi-search" />
                            <InputText value={search} onChange={(e) => dispatch(taskActions.searchTask(e.target.value))} placeholder="Search" className="w-100" />
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