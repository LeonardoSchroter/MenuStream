// Components/Card.tsx
import React from 'react';
import './Card.css';
import { ProductData } from '../Interface/ProductData';

interface CardProps {
    product: ProductData;
    addToCart: (product: ProductData) => void;
}

export function Card({ product, addToCart }: CardProps) {
    return (
        <div className="card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><b>Price:</b> ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
}
