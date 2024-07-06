import axios, { AxiosPromise } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:8080';

const deleteData = async (customerId: number): AxiosPromise<any> => {
    const response = await axios.delete(`${API_URL}/customers/${customerId}`);
    return response;
}

export function useCustomerDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer-data'] });
        }
    });
    return mutate;
}
