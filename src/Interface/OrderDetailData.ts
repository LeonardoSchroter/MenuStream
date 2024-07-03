import { OrderData } from './OrderData';
import { ProductData } from './ProductData';

export interface OrderDetailData {
    id: number;
    order: OrderData;
    product: ProductData;
    quantity: number;
}
