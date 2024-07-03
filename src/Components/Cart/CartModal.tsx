// Components/CartModal.tsx
import React from 'react';
import { ProductData } from '../../Interface/ProductData';

interface CartModalProps {
    cartItems: ProductData[];
    removeFromCart: (id: number) => void;
    closeModal: () => void;
}

export function CartModal({ cartItems, removeFromCart, closeModal }: CartModalProps) {
    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Your Cart</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <ul className="list-group">
                                {cartItems.map(item => (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <img src={item.image} alt={item.name} className="img-thumbnail" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                            <span>{item.name}</span>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(item.id!)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
