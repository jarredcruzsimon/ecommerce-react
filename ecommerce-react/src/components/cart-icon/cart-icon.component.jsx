import { useContext } from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { CartContext } from '../../context/cart.context'

import './cart-icon.styles.scss'


const CartIcon = () =>{
    const { isCartOpen, setIsCartOpen } = useContext(CartContext)

    // setting the oppisite value to create the toggle effect
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return(
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon