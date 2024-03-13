import React from 'react';
import style from './VerifyCode.module.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
function VerifyCode() {
    let navigate =useNavigate()

    async function verify(values){
     const toastId = toast.loading('Waiting...')
       let {data}=  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
              values
          ).catch(err=>{
              toast.error('verification code is Invalid')
              toast.dismiss(toastId)
            } )
          if(data.status == 'Success'){
             toast.success('verification code is valid')
             toast.dismiss(toastId)
             navigate('/reset-password')
           }

     }
 
     let formik = useFormik({
         initialValues:{
            resetCode:''
         },
         onSubmit:verify
     })
     return (
         <div className='container my-5'>
             <h2 className='fw-bolder mb-4'>Please enter Your verification code:</h2>
             <form action="" onSubmit={formik.handleSubmit}>
                 <input placeholder='code' className='form-control mb-3' type="text" name='resetCode' onChange={formik.handleChange} value={formik.values.resetCode} />
                 <button className='btn btn-outline-success'>Verify</button>
             </form>
         </div>
     );
}

export default VerifyCode;