import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const deleteData = async (productId: number): AxiosPromise<any> => {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response;
}

export function useProductDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product-data'] });
        }
    });
    return mutate;
}
