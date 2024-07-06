import React, { useState } from 'react';
import { useCustomerDataMutate } from '../../hooks/UseCustomerDataMutate';
import { CustomerData } from '../../Interface/CustomerData';

interface CreateCustomerModalProps {
    closeModal: () => void;
}

export function CreateCustomerModal({ closeModal }: CreateCustomerModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [paymentPreferences, setPaymentPreferences] = useState('');
    const { mutate, status } = useCustomerDataMutate();

    const handleCreateCustomer = () => {
        mutate({
            id: 0, // ID será gerado pelo backend
            name,
            email,
            deliveryAddress,
            paymentPreferences,
        } as CustomerData);
        closeModal();
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Customer</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Delivery Address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                        <input type="text" placeholder="Payment Preferences" value={paymentPreferences} onChange={(e) => setPaymentPreferences(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleCreateCustomer} disabled={status === 'pending'}>
                            {status === 'pending' ? 'Creating...' : 'Create'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
