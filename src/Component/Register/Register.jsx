import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


function Register() {

  let navigate=useNavigate()
  let [errorMsg , setErrorMsg] = useState('') 
  let [isLoading , setIsLoading] = useState(false)

  async  function callRegister (reqBody){
    setErrorMsg('')
    setIsLoading(true)
     let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody).catch(err=> {
       setIsLoading(false)
      setErrorMsg(err.response.data.message)
    
    }
      )
    console.log(data);

    if(data.message == 'success'){
      navigate('/login')
    }



    }
    
    // function validate (values){
    //   const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      
    //   const errors={}

    //     if(values.name.length < 3 ){
    //         errors.name='name min length is 3'
    //     }else if(values.name.length >10){
    //         errors.name='name maximum length is 10'
    //     }

    //     if(!values.email){
    //         errors.email = 'email is required'
    //     }
        
    //     else if (!emailRegx.test(values.email)){
    //         errors.email='invalid email'
    //     }



    //     return errors
    // }

    const phoneRegx=/^01[0125][0-9]{8}$/
    let validationSchema =Yup.object({
      name:Yup.string().min(3,'min length is 3').max(10,'max length is 10').required('name is required'),
      email:Yup.string().email("email is invalid").required('email is required'),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{5,}$/ , 'password must begin with Capital letter and have numbers').required("password is required"),
      rePassword:Yup.string().oneOf([Yup.ref('password')] , 'password dont match').required(),
      phone:Yup.string().matches(phoneRegx , 'phone is invalid').required()
    })
    
const registerForm=useFormik({
    initialValues:{
        name:'',
        email:'',
        password:'',
        rePassword:'',
        phone:''
    },validationSchema,
    onSubmit: callRegister
})

  return (
    <>

    <Helmet>
      <title>Register page</title>
    </Helmet>
    
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Register Now:</h2>
       { errorMsg && <div className="alert alert-danger"> {errorMsg} </div>}
        <form onSubmit={registerForm.handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName" className="mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="form-control mb-2"
              name="name"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {
            registerForm.errors.name && registerForm.touched.name?<div className="alert alert-danger mt-2">{registerForm.errors.name}</div> : null
            }
          </div>

          <div className="form-group">
            <label htmlFor="email" className="mb-1">Email</label>
            <input
              type="text"
              id="email"
              className="form-control mb-2"
              name="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {
            registerForm.errors.email && registerForm.touched.email ?<div className="alert alert-danger mt-2">{registerForm.errors.email}</div> : null
            }
          </div>

            <div className="form-group">
              <label htmlFor="password" className="mb-1">Password</label>
              <input
               type="password"
                name="password"
                id="password"
                className="form-control mb-2"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur} />
            {
              registerForm.errors.password && registerForm.touched.password ?<div className="alert alert-danger">{registerForm.errors.password}</div> : null
            }
            </div>


            <div className="form-group">
              <label htmlFor="rePassword" className="mb-1">RePassword</label>
              <input type="password" className="form-control mb-2" id="rePassword" onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.rePassword}
              name="rePassword"
              />
            {
              registerForm.errors.rePassword && registerForm.touched.rePassword?<div className="alert alert-danger">{registerForm.errors.rePassword}</div>  :null 
            }
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="mb-1">Phone</label>
              <input type="phone" className="form-control mb-2" id="phone" onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.phone}
              name="phone"
              />
            {
              registerForm.errors.phone && registerForm.touched.phone?<div className="alert alert-danger">{registerForm.errors.phone}</div>  :null 
            }
            </div>


          <button className="btn bg-main d-block ms-auto mt-4 text-white"
          disabled={!(registerForm.isValid && registerForm.dirty)}
          type="submit">
           { isLoading? <i className="fa fa-spinner fa-spin"></i> : "Register" }
            
            </button>
        </form>
      </div>
    </>
  );
}

export default Register;
