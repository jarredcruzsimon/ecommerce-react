import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import './navigation.styles.scss'
import { UserContext } from '../../context/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'

// importing svg file as a react compononet for use as a logo
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

const Navigation =() =>{
    const { currentUser } = useContext(UserContext)

    
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
                {
                    currentUser ? (
                        <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                    ):(
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )
                }
                
            </div>
        </div>
        {/*Outlet tells routers where to place additionally renderd components */}
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation