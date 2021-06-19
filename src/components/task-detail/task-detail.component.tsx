import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { TaskStatus } from '../../commons/constants';
import './task-detail.component.css';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import TaskModel from '../../models/task.model';

function TaskDetail(props: any) {
    const { editTask, saveEvent, closeFormEvent, openFormEvent } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState('');
    const [status, setStatus] = useState<any>(TaskStatus.READY);
    const statusList = [
        { name: TaskStatus.READY, code: TaskStatus.READY },
        { name: TaskStatus.IN_PROGRESS, code: TaskStatus.IN_PROGRESS },
        { name: TaskStatus.SUCCESS, code: TaskStatus.SUCCESS }
    ]

    useEffect(() => {
        setId(editTask.id);
        setName(editTask.name);
        setDescription(editTask.description);
        setStatus(statusList.find(t => t.code === editTask.status));
    }, [editTask.id])

    const handleSave = () => {
        const data = new TaskModel(id, name, description, status.code);
        saveEvent(data);
    }

    const closeForm = () => {
        closeFormEvent();
    }

    return (
        <div className="p-grid p-pt-2">
            <div className="p-col-12">
                <h4>Thêm mới</h4>
                <input value = {id} hidden/>
            </div>
            <div className="p-col-12 p-md-6 p-lg-3">
                <span className="p-float-label p-input-icon-left w-100">
                    <i className="pi pi-search" />
                    <InputText className="w-100" id="lefticon" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="lefticon">Name</label>
                </span>
            </div>
            <div className="p-col-12 p-md-6 p-lg-3">
                <span className="p-float-label p-input-icon-left w-100">
                    <i className="pi pi-search" />
                    <InputText className="w-100" id="lefticon" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label htmlFor="lefticon">Description</label>
                </span>
            </div>

            <div className="p-col-12 p-md-6 p-lg-3">
                <span className="p-float-label">
                    <Dropdown inputId="dropdown" className="w-100" value={status} options={statusList} onChange={(e) => setStatus(e.value)} optionLabel="name" />
                    <label htmlFor="dropdown">Status</label>
                </span>
            </div>
            <div className="p-col-12 p-text-right">
                <Button label="Lưu lại" className="p-mr-1" icon="pi pi-check" onClick={() => handleSave()} />
                <Button label="Đóng lại" icon="pi pi-times" className="p-button-danger" onClick = {() => closeForm()}/>
            </div>
        </div>
    )
}

export default TaskDetail;