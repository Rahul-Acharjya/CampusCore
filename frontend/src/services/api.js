import axios from 'axios';
const api=axios.create({baseURL:import.meta.env.VITE_API_BASE_URL||'/api'});
api.interceptors.request.use(c=>{const token=localStorage.getItem('cc_token');if(token)c.headers.Authorization=`Bearer ${token}`;return c;});
export default api;
