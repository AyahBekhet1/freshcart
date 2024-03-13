import React from 'react';
import style from './ForgetPass.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function ForgetPass() {

let navigate =useNavigate()

   async function forgetPassword(values){
    const toastId = toast.loading('Waiting...')
      let {data}=  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
             values
         )
         if(data.statusMsg == 'success'){
            toast.success(data.message)
            toast.dismiss(toastId)
            navigate('/verify-code')
          }
    }

    let formik = useFormik({
        initialValues:{
            email:''
        },
        onSubmit:forgetPassword
    })
    return (
        <div className='container my-5'>
            <h2 className='fw-bolder mb-4'>Please enter Your Email:</h2>
            <form action="" onSubmit={formik.handleSubmit}>
                <input placeholder='email' className='form-control mb-3' type="email" name='email' onChange={formik.handleChange} value={formik.values.email} />
                <button className='btn btn-outline-success'>Send verification code</button>
            </form>
        </div>
    );
}

export default ForgetPass;