// Components/Card.tsx
import "./Card.css";
import { ProductData } from '../Interface/ProductData';

interface CardProps {
    product: ProductData;
}

export function Card({ product }: CardProps) {
    return (
        <div className="card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><b>Valor:</b> {product.price}</p>
        </div>
    );
}
