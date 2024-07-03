// Components/CartPage.tsx
import React, { useState } from 'react';
import './CartPage.css';
import { ProductData } from '../../Interface/ProductData';

interface CartPageProps {
    cartItems: ProductData[];
    removeFromCart: (id: number) => void;
}

export function CartPage({ cartItems, removeFromCart }: CartPageProps) {
    return (
        <div className="cart-page">
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <p><b>Price:</b> ${item.price}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
