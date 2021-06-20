import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { RootState, TaskStatus } from '../../commons/constants';
import './task-detail.component.css';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import TaskModel from '../../models/task.model';
import { useDispatch, useSelector } from 'react-redux';
import * as taskActions from '../../redux/actions/action';

function TaskDetail(props: any) {
    const { saveEvent } = props;
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [status, setStatus] = useState<any>(TaskStatus.READY);
    const selectedTask = useSelector((state: RootState) => state.selectedTask);
    const statusList = [
        { name: TaskStatus.READY, code: TaskStatus.READY },
        { name: TaskStatus.IN_PROGRESS, code: TaskStatus.IN_PROGRESS },
        { name: TaskStatus.SUCCESS, code: TaskStatus.SUCCESS }
    ]
    const dispatch = useDispatch();

    useEffect(() => {
        setId(selectedTask.id);
        setName(selectedTask.name);
        setDescription(selectedTask.description);
        setStatus(statusList.find(t => t.code === selectedTask.status));
    }, [selectedTask])

    const handleSave = () => {
        const data = new TaskModel(id, name, description, status.code);
        saveEvent(data);
    }

    const closeForm = () => {
        dispatch(taskActions.openTaskForm());
    }

    return (
        <div className="p-grid p-pt-2">
            <div className="p-col-12">
                <h4>Thêm mới</h4>
                <input value = {id} hidden onChange={(e) => setId(e.target.value)}/>
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