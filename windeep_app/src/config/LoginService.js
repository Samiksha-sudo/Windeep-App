import axios from 'axios';
import {MAIN_URL} from './Url'  

export function AdminLogin(data){
    return axios.post(`${MAIN_URL}admin/login`,data) 
}

export function MemberLogin(data){
    return axios.post(`${MAIN_URL}admin/login/member`,data) 
}

export function MemberRegister(data){
    return axios.post(`${MAIN_URL}member/registerMember`,data) 
}

export function forgetService(data){
    return axios.post(`${MAIN_URL}member/forgetservice`,data) 
}

export function resetPassService(data){
    return axios.post(`${MAIN_URL}member/resetPassService`,data) 
}