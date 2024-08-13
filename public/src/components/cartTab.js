
// The most corrected one according to me.

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './cartItem';
import { clearCart } from '../stores/cart';
import { products } from '../products'; // Import products
import axios from 'axios'; // Import Axios for API calls
import PopUp from './PopUp'; // Import the PopUp component
import CheckPopUp from './checkPopUp';
import { FaCaretDown } from 'react-icons/fa'; // Import down arrow icon

const CartTab = () => {
    const carts = useSelector((store) => store.cart.items);
    const statusTab = useSelector((store) => store.cart.statusTab);
    const dispatch = useDispatch();
    const [serviceNumber, setServiceNumber] = useState('');
    const [serviceUserName, setServiceUserName] = useState('');
    const [serviceError, setServiceError] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);
    const [showCheckPopUp, setShowCheckPopUp] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu

    // Calculate total amount
    const totalAmount = carts.reduce((total, item) => {
        const product = products.find((product) => product.id === item.productId);
        return total + product.price * item.quantity;
    }, 0);

    // Fetch service user name by service number
    const fetchServiceUserName = async (number) => {
        if (number) {
            try {
                const response = await axios.get(`http://localhost:5255/api/ServiceUser/${number}`);
                setServiceUserName(response.data.name);
                setServiceError(''); // Clear error if found
            } catch (error) {
                setServiceUserName(''); // Clear user name if service number is invalid
                setServiceError('Service number not found');
                console.error('Service number not found:', error);
            }
        } else {
            setServiceUserName(''); // Clear username if input is empty
            setServiceError('');
        }
    };

    // Handle confirmation of the service number
    const handleConfirmServiceNumber = () => {
        fetchServiceUserName(serviceNumber);
    };

    const handleCheckout = async () => {
        const itemsWithNames = carts.map((item) => {
            const product = products.find((product) => product.id === item.productId);
            return {
                productId: item.productId,
                name: product.name,
                quantity: item.quantity,
            };
        });

        const purchaseData = {
            items: itemsWithNames,
            totalAmount,
            serviceNumber,
            serviceUserName,
        };
        console.log('Inserting data into the database:', purchaseData);

        try {
            handleConfirmOrder();
            const response = await axios.post('http://localhost:5255/api/Orders/checkout', purchaseData);
            console.log('Order successfully placed:', response.data);
            setShowCheckPopUp(true);
        } catch (error) {
            console.error('Error during checkout:', error);
        }

        dispatch(clearCart());
        setServiceNumber('');
    };

    const handleBuyNow = async () => {
        const itemsWithNames = carts.map((item) => {
            const product = products.find((product) => product.id === item.productId);
            return {
                productId: item.productId,
                name: product.name,
                quantity: item.quantity,
            };
        });

        const purchaseData = {
            items: itemsWithNames,
            totalAmount,
            serviceNumber,
            serviceUserName,
        };
        console.log('Inserting data into the database:', purchaseData);

        try {
            handleConfirmOrder();
            const response = await axios.post('http://localhost:5255/api/Purchased/buynow', purchaseData);
            console.log('Purchase successfully made:', response.data);
            setShowPopUp(true);
        } catch (error) {
            console.error('Error during purchase:', error.response.data || error.message);
        }

        dispatch(clearCart());
        setServiceNumber('');
    };

    const handleOpenApplication = () => {
        window.open('http://localhost:3000', '_blank');
    };

    const handleConfirmOrder = async () => {
        // Prepare data for reducing product quantities
        const reduceData = carts.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        try {
            const response = await axios.post('http://localhost:5255/api/Foods/reduceQuantity', reduceData);
            console.log('Product quantities reduced:', response.data);
        } catch (error) {
            console.error('Error reducing product quantities:', error.response.data || error.message);
        }
    };

    // Handle closing the pop-up and reloading the page
    const handleClosePopUp = () => {
        setShowPopUp(false);
        window.location.reload(); // Reload the page
    };

    // Handle closing the check pop-up
    const handleCloseCheckPopUp = () => {
        setShowCheckPopUp(false);
        window.location.reload(); // Reload the page
    };

    // Handle dropdown menu
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <div
            className={`fixed top-0 right-0 bg-blue-200 bg-opacity-50 shadow-2xl w-96 h-full flex flex-col transform transition-transform duration-500 ${
                statusTab ? '' : 'translate-x-full'
            }`}
        >
            <div className="p-5 flex justify-between items-center">
                <h2 className="text-[#28245F] font-semibold text-2xl text-center">SHOPPING CART</h2>
                <div className="relative">
                    <button
                        className="bg-[#FFC10C] text-white p-2 rounded-md flex items-center justify-center"
                        onClick={toggleDropdown}
                    >
                        <FaCaretDown className="text-2xl" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md w-40">
                            <button
                                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                                onClick={() => {
                                    dispatch(clearCart());
                                    setDropdownOpen(false);
                                }}
                            >
                                Clear Cart
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                                onClick={handleOpenApplication}
                            >
                                On Hold
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                            >
                                Settings
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-5 flex-grow overflow-y-auto">
                {carts.map((item, key) => (
                    <CartItem key={key} data={item} />
                ))}
            </div>

            <div className="p-5 text-white">
                <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                <h4>Service User: {serviceUserName || 'N/A'}</h4>
                {serviceError && <p className="text-red-500">{serviceError}</p>}
            </div>

            <div className="p-5">
                <input
                    type="text"
                    placeholder="Enter Service Number"
                    value={serviceNumber}
                    onChange={(e) => setServiceNumber(e.target.value)}
                    className="w-full p-2 mb-2 rounded-md"
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirmServiceNumber()}
                />
            </div>

            <div className="grid grid-cols-2">
                <button
                    className="bg-[#28245F] text-white px-5 py-3 text-lg"
                    onClick={handleBuyNow}
                    disabled={!serviceNumber || !serviceUserName}
                >
                    BUY NOW
                </button>
                <button
                    className="bg-[#FFC10C] text-white px-5 py-3 text-lg"
                    onClick={handleCheckout}
                    disabled={!serviceNumber || !serviceUserName}
                >
                    CHECKOUT
                </button>
            </div>
            {showPopUp && <PopUp onClose={handleClosePopUp} />}
            {showCheckPopUp && <CheckPopUp onClose={handleCloseCheckPopUp} />}
        </div>
    );
};

export default CartTab;

