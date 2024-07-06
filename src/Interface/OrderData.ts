import { OrderDetailData } from './OrderDetailData'; 

export interface Order {
    customerId: number;
    orderDetails: OrderDetailData[];
    totalAmount: number;
    status: string;
    orderDate: Date;
    fulfillmentDate: Date ;

}
