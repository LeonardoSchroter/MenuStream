import React from 'react';
import { useCustomerDelete } from '../../hooks/useCustomerDelete';
import { CustomerData } from '../../Interface/CustomerData';

interface DeleteCustomerModalProps {
    customer: CustomerData;
    closeModal: () => void;
}

export function DeleteCustomerModal({ customer, closeModal }: DeleteCustomerModalProps) {
    const { mutate, status } = useCustomerDelete();

    const handleDeleteCustomer = () => {
        mutate(customer.id);
        closeModal();
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Customer</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete {customer.name}?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={handleDeleteCustomer} disabled={status === 'pending'}>
                            {status === 'pending' ? 'Deleting...' : 'Delete'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
