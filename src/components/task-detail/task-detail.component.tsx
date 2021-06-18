import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { TaskStatus } from '../../commons/constants';
import './task-detail.component.css';
import { Dropdown } from 'primereact/dropdown';
function TaskDetail() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(TaskStatus.READY);
    const statusList = [
        { name: TaskStatus.READY, code: TaskStatus.READY },
        { name: TaskStatus.IN_PROGRESS, code: TaskStatus.IN_PROGRESS },
        { name: TaskStatus.SUCCESS, code: TaskStatus.SUCCESS }
    ]
    return (
        <div className="p-grid p-pt-4">
            <div className="p-col-12 p-md-6 p-lg-4">
                <span className="p-float-label p-input-icon-left w-100">
                    <i className="pi pi-search" />
                    <InputText className="w-100" id="lefticon" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="lefticon">Name</label>
                </span>
            </div>
            <div className="p-col-12 p-md-6 p-lg-4">
                <span className="p-float-label p-input-icon-left w-100">
                    <i className="pi pi-search" />
                    <InputText className="w-100" id="lefticon" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label htmlFor="lefticon">Description</label>
                </span>
            </div>

            <div className="p-col-12 p-md-6 p-lg-4">
                <span className="p-float-label">
                    <Dropdown inputId="dropdown" value={status} options={statusList} onChange={(e) => setStatus(e.value)} optionLabel="name" />
                    <label htmlFor="dropdown">Status</label>
                </span>
            </div>
        </div>
    )
}

export default TaskDetail;