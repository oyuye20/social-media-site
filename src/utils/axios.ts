import axios from 'axios'

const Api = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
    withXSRFToken: true,
});

/* Api.interceptors.response.use((res)=> res, async(err)=>{
    if(err.res && err.res.status === 401){  
        return err.res;
    }
}) */

export default Api