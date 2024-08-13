
import React from 'react';
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/iconCart.png';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';

const ProductCart = (props) => {
    const carts = useSelector(store => store.cart.items);
    const { id, name, price, image, category, meal, slug } = props.data;
    const mealText = Array.isArray(meal) ? meal.join(', ') : meal;

    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: id,
            quantity: 1
        }));
        // Open the cart tab
    };

    return (
        <div className='bg-white p-4 rounded-lg shadow-2xl w-48 h-56 transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between'>
            <Link to={slug}>
                <div className='relative'>
                    <img src={image} alt={name} className='w-full h-24 object-cover rounded-t-lg' />
                    <div className='absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent'></div>
                </div>
            </Link>
            <div className='p-2 flex flex-col justify-between flex-grow'>
                <h3 className='text-sm font-bold  text-left'>{name}</h3>
                <div className='flex justify-between items-center mt-2'>
                    <p className='text-sm font-medium text-left'>
                        <span className='text-[#747474]'>Rs {price}.00</span>
                    </p>
                    <button 
                        className='bg-[#ca0000] p-2 rounded-full text-xs flex items-center gap-2 hover:bg-[#FFC10C] shadow-lg' 
                        onClick={handleAddToCart}
                    >
                        <span className='font-bold text-white w-12'>Add</span>
                        {/* <img src={iconCart} alt="cart icon" className='w-4' /> */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCart;
