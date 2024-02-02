import axios from 'axios';
import {MAIN_URL} from './Url'  

export function AdminLogin(data){
    return axios.post(`${MAIN_URL}admin/login`,data) 
}

export function MemberLogin(data){
    return axios.post(`${MAIN_URL}admin/login/member`,data) 
}

