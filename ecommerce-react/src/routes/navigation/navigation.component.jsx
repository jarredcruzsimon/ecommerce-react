import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { UserContext } from '../../context/user.context'
import { CartContext } from '../../context/cart.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'

import './navigation.styles.scss'


// importing svg file as a react compononet for use as a logo
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

const Navigation =() =>{
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                {currentUser ? (
                    <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                ):(
                    <Link className='nav-link' to='/auth'>
                        SIGN IN
                    </Link>
                )}
                <CartIcon />
            </div>
            {/*If isCartOpen === true, cartDropDown will show, else it will not */}
            {isCartOpen && <CartDropdown />}
        </div>
        {/*Outlet tells routers where to place additionally renderd components */}
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation