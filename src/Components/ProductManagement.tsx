// Components/ProductManagement.tsx
import { useState } from 'react';
import { ProductData } from '../Interface/ProductData';
import { useProductData } from '../hooks/useProductData';
import { Card } from './Card';
import { CreateModal } from './Create Modal/Modal';
import { DeleteModal } from './DeleteModal/DeleteModal';
import { UpdateModal } from './Update Modal/UpdateModal';

export function ProductManagement() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
    const [productToUpdate, setProductToUpdate] = useState<ProductData | null>(null);

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(prev => !prev);
    };

    const handleOpenDeleteModal = (productId: number) => {
        setProductIdToDelete(productId);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setProductIdToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleOpenUpdateModal = (product: ProductData) => {
        setProductToUpdate(product);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setProductToUpdate(null);
        setIsUpdateModalOpen(false);
    };

    const { data } = useProductData();

    return (
        <div className='container'>
            <h1>Gerenciamento de Produtos</h1>
            <button id='btn-new' className='btn btn-success mb-4' onClick={handleOpenCreateModal}>New</button>
            <div className='container'>
                <div className='row justify-content-center'>
                    {data?.map(productData => (
                        productData.id !== undefined ? (
                            <div key={productData.id} className='col-sm-12 col-md-6 col-lg-4 mb-4 d-flex'>
                                <div className='card-wrapper card'>
                                    <Card product={productData} />
                                    <button className='btn btn-outline-primary mt-2' onClick={() => handleOpenUpdateModal(productData)}>Update</button>
                                    <button className='btn btn-outline-danger mt-2' onClick={() => handleOpenDeleteModal(productData.id)}>Delete</button>
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
            {isCreateModalOpen && <CreateModal closeModal={handleOpenCreateModal} />}
            {isDeleteModalOpen && productIdToDelete !== null && (
                <DeleteModal closeModal={handleCloseDeleteModal} productId={productIdToDelete} />
            )}
            {isUpdateModalOpen && productToUpdate !== null && (
                <UpdateModal closeModal={handleCloseUpdateModal} product={productToUpdate} />
            )}
        </div>
    );
}
