import axios, { AxiosPromise } from 'axios';
import { CustomerData } from '../Interface/CustomerData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:8080';

const updateData = async (customer: CustomerData): AxiosPromise<any> => {
    const response = await axios.put(`${API_URL}/customers/${customer.id}`, customer);
    return response;
};

export function useCustomerUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: updateData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer-data'] });
        }
    });

    return mutate;
}
