import React from 'react';
import style from './NotFound.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { decrease ,incrementBynum} from '../../Redux/counterSlice';
function NotFound() {


    let {counter} = useSelector((state)=>state.counter)
    let dispatch  = useDispatch()

    console.log(counter);
    return (
        <div>
            <button onClick={()=>dispatch(decrease())}>-</button>
            {counter}
            <button onClick={()=>dispatch(incrementBynum(5))}>+</button>
        </div>
    );
}

export default NotFound;