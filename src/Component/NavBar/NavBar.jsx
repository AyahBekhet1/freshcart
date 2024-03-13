import React, { useContext } from 'react';
import style from './NavBar.module.css'
import { Link } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext.js';
import { CartContext } from '../../Context/CartContext.js';

function NavBar() {

  let {userToken , setUserToken} = useContext(UserContext)
  let { numOfCartItems} = useContext(CartContext)


  function logOut () {
    localStorage.removeItem('userToken')
    setUserToken(null)
  }

    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to='/' className="navbar-brand" >
    <img src={logo} alt='freshCart logo'/>
    
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {userToken !== null? <>
          <li className="nav-item">
          <Link className="nav-link" to='/'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/cart'>Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/wishlist'>Wsih List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/products'>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/categories'>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/brands'>Brands</Link>
        </li>
        </>:''}
       
      </ul>

      <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
      <li className='nav-item d-flex align-items-center'>
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
        </li>
        {userToken !== null ? <>
          
        <li className="nav-item position-relative me-3">
          <Link className="nav-link " to='/cart'>
            <i className='fa fa-shopping-cart fs-4'></i>
            <span className=' cart-num bg-main  text-white p-1 text-center  position-absolute '>{numOfCartItems}</span>
          </Link>
        </li>
        <li className="nav-item">
            <Link className='nav-link' to='/login' onClick={()=>logOut()}>Logout</Link>
        </li>
        </>:<>
        <li className='nav-item'>
            <Link className='nav-link' to='/login'>Login</Link>
        </li>
        <li className="nav-item">
            <Link className='nav-link' to='/register'>Register</Link>
        </li>
        </>}
        

       
       
      </ul>
    </div>
  </div>
</nav>


        </>
    );
}

export default NavBar;