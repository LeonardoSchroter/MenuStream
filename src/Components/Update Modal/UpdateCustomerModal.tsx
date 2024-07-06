import React, { useState } from 'react';
import { useCustomerUpdate } from '../../hooks/useCustomerUpdate';
import { CustomerData } from '../../Interface/CustomerData';

interface UpdateCustomerModalProps {
    customer: CustomerData;
    closeModal: () => void;
}

export function UpdateCustomerModal({ customer, closeModal }: UpdateCustomerModalProps) {
    const [name, setName] = useState(customer.name);
    const [email, setEmail] = useState(customer.email);
    const [deliveryAddress, setDeliveryAddress] = useState(customer.deliveryAddress);
    const [paymentPreferences, setPaymentPreferences] = useState(customer.paymentPreferences || '');
    const { mutate, status } = useCustomerUpdate();

    const handleUpdateCustomer = () => {
        mutate({
            id: customer.id,
            name,
            email,
            deliveryAddress,
            paymentPreferences,
        });
        closeModal();
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Customer</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Delivery Address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                        <input type="text" placeholder="Payment Preferences" value={paymentPreferences} onChange={(e) => setPaymentPreferences(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleUpdateCustomer} disabled={status === 'pending'}>
                            {status === 'pending' ? 'Updating...' : 'Update'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
