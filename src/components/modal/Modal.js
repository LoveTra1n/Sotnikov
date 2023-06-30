import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {modalAction} from "../../storage/widgetSlice/widgetSlice";
import {
    deleteObject,
    deleteObjectPhoto,
    deleteObjectTasks,
    deleteSelectAction
} from "../../storage/postSlice/postSlice";
import axios from "axios";

const Modal = () => {
    const {currentPage}=useSelector(state=>state.widgetReducer)
    const dispatch=useDispatch()
    const handleModal=()=>{
        dispatch(modalAction())
        dispatch(deleteSelectAction())
    }
    const deleteObj=async ()=>{
        if (currentPage==='posts'){
            dispatch(deleteObject())
        }if(currentPage==='photos'){
            dispatch(deleteObjectPhoto())
        }else {
            dispatch(deleteObjectTasks())
        }
        handleModal()
        setTimeout(()=>{
            window.location.reload()
        },1000)
    }

    return (
        <div className={'absolute w-full h-full flex justify-center items-center'}>
            <div className="div z-10 w-2/4 h-1/4 bg-white rounded-md flex flex-col relative p-7 items-center">
                <div onClick={handleModal} className={'absolute top-1 right-2 select-none'}>✕</div>
                <p >вы точно хотите удалить объект?</p>
                <button onClick={deleteObj} className={'mt-3 border bg-green-500 w-7/12 h-14 active:bg-green-600 rounded-md text-white'}>подтверждаю</button>
            </div>
            <div onClick={handleModal} className="bg-gray-500/25 w-full h-full absolute z-0"></div>
        </div>
    );
};

export default Modal;