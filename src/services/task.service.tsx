import { Observable, of } from "rxjs";
import { ResponseType } from "../commons/constants";
const axios = require('axios');
const baseUrl = 'http://localhost:6789';
class TaskService {
    getRequest(url: string, option: any = {}) {
        return axios({
            method: 'GET',
            url,
            ...option
        });
    }

    postRequest<T>(url: string, data: T, option: any = {}) {
        return of<ResponseType>(axios({
            method: 'POST',
            url,
            data,
            ...option
        }));
    }

    deleteRequest(url: string, option: any = {}): Observable<ResponseType> {
        return of<ResponseType>(axios({
            method: 'DELETE',
            url,
            ...option
        }));
    }

    putRequest<T>(url: string, data: T, option: any = {}): Observable<ResponseType> {
        return of<ResponseType>(axios({
            method: 'PUT',
            url,
            data,
            ...option
        }));
    }

    getTasks() {
        return this.getRequest(`${baseUrl}/tasks`);
    }
}
export default TaskService;