import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"
import { FoldHorizontal } from "lucide-react";

const useProducts = (filters={})=>{
    const axiosPublic = useAxiosPublic();
    const {refetch, data: products =[], isLoading, isError} = useQuery({
        queryKey:["product", filters],
        queryFn: async()=>{
            const res = await axiosPublic.get("/products",  {params:filters});
            return res.data;
        },
        keepPreviousData:ture,
    });
    return[products, refetch, isLoading, isError];
};

export default useProducts;