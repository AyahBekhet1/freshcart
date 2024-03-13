import React from 'react';
import style from './ResetPassword.module.css'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
function ResetPassword() {
    let navigate =useNavigate()

   async function forgetPassword(values){
    const toastId = toast.loading('Waiting...')
      let {data}=  await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
             values
         )
         if(data.token){
            localStorage.setItem('userToken' , data.token)
            navigate('/')
            toast.dismiss(toastId)
         }
    }

    let validationSchema =Yup.object({
        email:Yup.string().email("email is invalid").required('email is required'),
        newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,}$/ , 'password must begin with Capital letter and have numbers').required("password is required"),
      })
      

    let formik = useFormik({
        initialValues:{
            email:'',
            newPassword:''
        },validationSchema,
        onSubmit:forgetPassword
    })
    return (
        <div className='container my-5'>
            <h2 className='fw-bolder mb-4'>reset your account password:</h2>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                <input placeholder='email' className='form-control mb-3' type="email" name='email' onChange={formik.handleChange} value={formik.values.email}  onBlur={formik.handleBlur} />
            {
              formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div> : null
            }

                </div>
                <div className="form-group">

                <input placeholder='newPassword' className='form-control mb-3' type="text" name='newPassword' onChange={formik.handleChange} value={formik.values.newPassword} onBlur={formik.handleBlur} />
            {
                formik.errors.newPassword && formik.touched.newPassword ?<div className="alert alert-danger">{formik.errors.newPassword}</div> : null
            }
            </div>

                <button className='btn btn-outline-success'>reset password</button>
            </form>
        </div>
    );
}

export default ResetPassword;