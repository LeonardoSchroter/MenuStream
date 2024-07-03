import { useState } from 'react';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './Components/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductData } from './Interface/ProductData';
import { useProductData } from './hooks/useProductData';
import { Card } from './Components/Card';
import { CreateModal } from './Components/Create Modal/Modal';
import { DeleteModal } from './Components/DeleteModal/DeleteModal';
import { UpdateModal } from './Components/Update Modal/UpdateModal';
import { Navbar } from './Components/navbar';
import { CartModal } from './Components/Cart/CartModal';

function App() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState<ProductData[]>([]);
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

    const handleAddToCart = (product: ProductData) => {
        setCartItems(prevItems => [...prevItems, product]);
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleOpenCartModal = () => {
        setIsCartModalOpen(true);
    };

    const handleCloseCartModal = () => {
        setIsCartModalOpen(false);
    };

    const { data } = useProductData();

    return (
        <>
            <Navbar />
            <div className='container'>
                <h1>Menu</h1>
                <button className='btn btn-primary' onClick={handleOpenCartModal}>View Cart</button>
                <div className='container'>
                    <div className='row justify-content-center'>
                        {data?.map(productData => (
                            productData.id !== undefined ? (
                                <div key={productData.id} className='col-sm-12 col-md-6 col-lg-4 mb-4 d-flex'>
                                    <div className='card-wrapper card'>
                                        <Card
                                            product={productData}
                                            addToCart={handleAddToCart}
                                        />
                                        <div className="card-footer">
                                            <button className='btn btn-outline-primary' onClick={() => handleOpenUpdateModal(productData)}>Update</button>
                                            <button className='btn btn-outline-danger' onClick={() => handleOpenDeleteModal(productData.id)}>Delete</button>
                                        </div>
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
                <button id='btn-new' className='btn btn-success' onClick={handleOpenCreateModal}>New</button>

                {isCartModalOpen && <CartModal cartItems={cartItems} removeFromCart={handleRemoveFromCart} closeModal={handleCloseCartModal} />}
            </div>
        </>
    );
}

export default App;
