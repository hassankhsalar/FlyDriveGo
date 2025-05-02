import axios from "axios";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Set authorization header when user is logged in
                axiosSecure.defaults.headers.common['Authorization'] = `Bearer ${currentUser.accessToken}`;
            } else {
                // Clear authorization header when user is not logged in
                delete axiosSecure.defaults.headers.common['Authorization'];
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return axiosSecure;
};

export default useAxiosSecure;