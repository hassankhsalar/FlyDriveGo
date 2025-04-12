import axios from 'axios';


const axiosPublic = axios.create({
    baseURL: 'https://fly-drive-go-server.vercel.app',
   
  });

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

