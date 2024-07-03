import axios, { AxiosPromise } from "axios";
import { ProductData } from "../Interface/ProductData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';
const postData = async (data: ProductData): AxiosPromise<any> => {
    const response = axios.post(API_URL+'/products',data);
    return response;
}

export function useProductDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['product-data']})
        }
    });
    return mutate;
}