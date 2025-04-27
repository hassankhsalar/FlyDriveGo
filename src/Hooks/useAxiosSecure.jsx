import axios from "axios";

const axiosSecure = axios.create({
    baseURL:   'https://flydrivego-server.onrender.com'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;