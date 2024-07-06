import { Order } from './OrderData';

export interface PaymentData {
    id: number;
    order: Order;
    paymentMethod: string;
    transactionAmount: number;
    paymentStatus: string;
}
