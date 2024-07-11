import React, { useState } from 'react';
import { ProductData } from '../../Interface/ProductData';
import { useOrderMutate } from '../../hooks/UseOrderDataMutate';
import { OrderDetailData } from '../../Interface/OrderDetailData';
import { Order } from '../../Interface/OrderData';

interface CartModalProps {
    cartItems: ProductData[];
    removeFromCart: (id: number) => void;
    closeModal: () => void;
}

export function CartModal({ cartItems, removeFromCart, closeModal }: CartModalProps) {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { mutate } = useOrderMutate();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const handleRemoveFromCart = (id: number) => {
        if(id == -1){
            cartItems.map(item =>(handleRemoveFromCart(item.id)));
        }
        removeFromCart(id);
    };

    const handleConfirmPurchase = () => {
        const groupedItems = cartItems.reduce((grouped, item) => {
            const existingItem = grouped.find(i => i.productId === item.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                grouped.push({ productId: item.id, quantity: 1 });
            }
            return grouped;
        }, [] as { productId: number; quantity: number }[]);

        const orderDetails: OrderDetailData[] = groupedItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        const orderData: Order = {
            customerId: 1,
            orderDetails: orderDetails,
            totalAmount: calculateTotal(),
            status: 'PENDING',
            orderDate: new Date(),
            fulfillmentDate: new Date()
        };

        mutate(orderData, {
            onSuccess: () => {
                setSuccessMessage("Pedido criado com sucesso!");
                setErrorMessage(null);
                setTimeout(() => {
                    setSuccessMessage(null);
                    removeFromCart(-1); 
                    closeModal(); // Fecha o modal
                }, 1000);
            },
            onError: (error) => {
                setErrorMessage(`Erro ao criar o pedido: ${error.message}`);
            }
        });
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cart</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        {successMessage && (
                            <div className="alert alert-success" role="alert">
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        {cartItems.length > 0 ? (
                            <>
                                <ul className="list-group mb-3">
                                    {cartItems.map(item => (
                                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img src={item.image} className="img-thumbnail mr-3" alt={item.name} style={{ maxWidth: '100px' }} />
                                                <div>
                                                    <h6>{item.name}</h6>
                                                    <p>${item.price}</p>
                                                </div>
                                            </div>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-end">
                                    <p><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
                                </div>
                            </>
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleConfirmPurchase}>
                            Confirm Purchase
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
