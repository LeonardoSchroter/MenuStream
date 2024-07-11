import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './Components/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductData } from './Interface/ProductData';
import { useProductData } from './hooks/useProductData';
import { Card } from './Components/Card';
import { CartModal } from './Components/Cart/CartModal';
import { Navbar } from './Components/navbar';
import { ProductManagement } from './Components/ProductManagement';

function App() {
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState<ProductData[]>([]);

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
        <Router>
            <Navbar openCart={handleOpenCartModal} /> {/* Passando a função para abrir o carrinho */}
            <Routes>
                <Route path="/" element={
                    <div className='container'>
                        <h1>Menu</h1>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                {data?.map(productData => (
                                    productData.id !== undefined ? (
                                        <div key={productData.id} className='col-sm-12 col-md-6 col-lg-4 mb-4 d-flex'>
                                            <div className='card-wrapper card'>
                                                <Card product={productData} />
                                                <button className="btn btn-outline-primary mt-2" onClick={() => handleAddToCart(productData)}>Add to Cart</button>
                                            </div>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>
                        {isCartModalOpen && <CartModal cartItems={cartItems} removeFromCart={handleRemoveFromCart} closeModal={handleCloseCartModal} />}
                    </div>
                } />
                <Route path="/products" element={<ProductManagement />} />
            </Routes>
        </Router>
    );
}

export default App;
