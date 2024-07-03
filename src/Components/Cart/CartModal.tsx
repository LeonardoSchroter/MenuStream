import { ProductData } from '../../Interface/ProductData';

interface CartModalProps {
    cartItems: ProductData[];
    removeFromCart: (id: number) => void;
    closeModal: () => void;
}

export function CartModal({ cartItems, removeFromCart, closeModal }: CartModalProps) {
    // calcul valor total
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

   
    const handleRemoveFromCart = (id: number) => {
        removeFromCart(id); 
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
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
