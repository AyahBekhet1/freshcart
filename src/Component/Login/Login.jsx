import React, { useContext, useState } from 'react';
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { UserContext } from '../../Context/UserContext.js';
import { Helmet } from 'react-helmet';


function Login() {

  let {userToken,setUserToken}=useContext(UserContext)
  let navigate=useNavigate()
  let [errorMsg , setErrorMsg] = useState('') 
  let [isLoading , setIsLoading] = useState(false)

  async  function callLogin (reqBody){
    setErrorMsg('')
    setIsLoading(true)
     let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, reqBody).catch(err=> {
      setIsLoading(false)
      setErrorMsg(err.response.data.message) 
    }
      )
    // console.log(data.token);

    if(data.message === 'success'){
        setIsLoading(false)
        localStorage.setItem('userToken' , data.token)
        console.log(userToken);
        
        setUserToken(data.token)
        console.log(userToken);
        navigate('/')
    }

    }
    
    
    let validationSchema =Yup.object({
      email:Yup.string().email("email is invalid").required('email is required'),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{5,}$/ , 'password must begin with Capital letter and have numbers').required("password is required"),
    })
    
const LoginForm=useFormik({
    initialValues:{

        email:'',
        password:'',
    
    },validationSchema,
    onSubmit: callLogin
})

  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Login:</h2>
       { errorMsg && <div className="alert alert-danger"> {errorMsg} </div>}
        <form onSubmit={LoginForm.handleSubmit}>
         
          <div className="form-group">
            <label htmlFor="email" className="mb-1">Email</label>
            <input
              type="text"
              id="email"
              className="form-control mb-2"
              name="email"
              value={LoginForm.values.email}
              onChange={LoginForm.handleChange}
              onBlur={LoginForm.handleBlur}
            />
            {
            LoginForm.errors.email && LoginForm.touched.email ?<div className="alert alert-danger mt-2">{LoginForm.errors.email}</div> : null
            }
          </div>

            <div className="form-group">
              <label htmlFor="password" className="mb-1">Password</label>
              <input
               type="password"
                name="password"
                id="password"
                className="form-control mb-2"
              value={LoginForm.values.password}
              onChange={LoginForm.handleChange}
              onBlur={LoginForm.handleBlur} />
            {
              LoginForm.errors.password && LoginForm.touched.password ?<div className="alert alert-danger">{LoginForm.errors.password}</div> : null
            }
            </div>



          <button className="btn bg-main d-block ms-auto mt-4 text-white" type="submit">
           { isLoading? <i className="fa fa-spinner fa-spin"></i> : "Log in" }
            
            </button>
        </form>
        <Link to={'/forget-password'}><p className='text-main'>Forget Password?</p></Link>
      </div>
    </>
  );
}

export default Login;