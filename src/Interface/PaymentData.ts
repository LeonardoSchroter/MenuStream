import { OrderData } from './OrderData';

export interface PaymentData {
    id: number;
    order: OrderData;
    paymentMethod: string;
    transactionAmount: number;
    paymentStatus: string;
}
