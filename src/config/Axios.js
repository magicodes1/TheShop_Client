import axios from 'axios';
import Base from './Base'
const instance = axios.create({
    baseURL:`${Base.URL}/api`
})

export default instance;