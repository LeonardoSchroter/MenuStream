import axios, { AxiosPromise } from 'axios';
import { Order } from '../Interface/OrderData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:8080';

const postData = async (data: Order): AxiosPromise<any> => {
    const response = await axios.post(`${API_URL}/orders`, data);
    return response;
};

export function useOrderMutate() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order-data'] })
        },
        onError: (error) => {
            console.error('Erro na requisição:', error);
        }
    });
    

    return mutate;
}
