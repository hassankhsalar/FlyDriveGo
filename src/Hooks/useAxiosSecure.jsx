import axios from "axios";

const axiosSecure = axios.create({
    baseURL:   'https://fly-drive-go-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;