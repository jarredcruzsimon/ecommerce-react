import { Fragment } from 'react'
import { Outlet, Link } from 'react-router-dom'
import './navigation.styles.scss'

// importing svg file as a react compononet for use as a logo
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

const Navigation =() =>{
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
                <Link className='nav-link' to='/sign-in'>
                    SIGN IN
                </Link>
            </div>
        </div>
        {/*Outlet tells routers where to place additionally renderd components */}
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation