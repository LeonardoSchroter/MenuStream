import axios, { AxiosPromise } from "axios";
import { ProductData } from "../Interface/ProductData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const updateData = async (product: ProductData): AxiosPromise<any> => {
    const response = await axios.put(`${API_URL}/products/${product.id}`, product);
    return response;
}

export function useProductUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: updateData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product-data'] });
        }
    });
    return mutate;
}
