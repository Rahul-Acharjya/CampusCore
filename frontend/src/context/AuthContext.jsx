import {createContext,useContext,useEffect,useState} from 'react';import api from '../services/api';
const C=createContext(null);
export function AuthProvider({children}){const [user,setUser]=useState(null),[loading,setLoading]=useState(true);useEffect(()=>{const token=localStorage.getItem('cc_token');if(token)api.get('/auth/me').then(r=>setUser(r.data.user)).catch(()=>localStorage.removeItem('cc_token')).finally(()=>setLoading(false));else setLoading(false);},[]);
const login=async(data)=>{const r=await api.post('/auth/login',data);localStorage.setItem('cc_token',r.data.token);setUser(r.data.user);return r.data.user;};
const register=async(role,data)=>{const r=await api.post(`/auth/register/${role}`,data);localStorage.setItem('cc_token',r.data.token);setUser(r.data.user);return r.data.user;};
const logout=()=>{localStorage.removeItem('cc_token');setUser(null);};
return <C.Provider value={{user,loading,login,register,logout}}>{children}</C.Provider>}
export const useAuth=()=>useContext(C);
