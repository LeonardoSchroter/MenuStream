import { CustomerData } from './CustomerData';
import { CartItemData } from './CartItemData';

export interface ShoppingCartData {
    id: number;
    customer: CustomerData;
    cartItems: CartItemData[];
}
