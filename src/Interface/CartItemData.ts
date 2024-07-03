import { ShoppingCartData } from './ShoppingCartData.ts';
import { ProductData } from './ProductData';

export interface CartItemData {
    id: number;
    shoppingCart: ShoppingCartData;
    product: ProductData;
    quantity: number;
}
