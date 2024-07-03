import { CustomerData } from './CustomerData';
import { OrderDetailData } from './OrderDetailData';

export interface OrderData {
    id: number;
    customer: CustomerData;
    orderDetails: OrderDetailData[];
    totalAmount: number;
    status: string;
    orderDate: Date;
    fulfillmentDate?: Date;
}
