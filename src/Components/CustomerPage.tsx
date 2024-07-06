import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CustomerData } from '../Interface/CustomerData';
import { CreateCustomerModal } from './Create Modal/CreateCustomerModal';
import { UpdateCustomerModal } from './Update Modal/UpdateCustomerModal';
import { DeleteCustomerModal } from './DeleteModal/DeleteCustomerModal';

const API_URL = 'http://localhost:8080';

const fetchCustomers = async (): Promise<CustomerData[]> => {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
};

export function CustomerPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);

    const { data: customers, isLoading, error } = useQuery({
        queryKey: ['customer-data'],
        queryFn: fetchCustomers,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading customers</div>;

    return (
        <div>
            <h1>Customers</h1>
            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">Add Customer</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delivery Address</th>
                        <th>Payment Preferences</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers && customers.length > 0 ? (
                        customers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.deliveryAddress}</td>
                                <td>{customer.paymentPreferences}</td>
                                <td>
                                    <button onClick={() => { setSelectedCustomer(customer); setShowUpdateModal(true); }} className="btn btn-warning">Edit</button>
                                    <button onClick={() => { setSelectedCustomer(customer); setShowDeleteModal(true); }} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No customers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showCreateModal && <CreateCustomerModal closeModal={() => setShowCreateModal(false)} />}
            {showUpdateModal && selectedCustomer && <UpdateCustomerModal customer={selectedCustomer} closeModal={() => setShowUpdateModal(false)} />}
            {showDeleteModal && selectedCustomer && <DeleteCustomerModal customer={selectedCustomer} closeModal={() => setShowDeleteModal(false)} />}
        </div>
    );
}