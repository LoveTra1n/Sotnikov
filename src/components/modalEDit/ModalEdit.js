import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeEdit, modalAction, modalEditAction} from "../../storage/widgetSlice/widgetSlice";
import {deleteObject, deleteObjectPhoto, deleteSelectAction} from "../../storage/postSlice/postSlice";
import axios from "axios";

const ModalEdit = () => {
    const {currentPost}=useSelector(state=>state.widgetReducer)
    const {currentPage}=useSelector(state=>state.widgetReducer)
    const dispatch=useDispatch()
    const[text,setText]=useState('')
    const close=()=>{
        dispatch(closeEdit())
    }
    const editObj=()=>{
        dispatch(closeEdit())
    }
    const editRequest=async ()=>{
        const res = await axios.put(`https://jsonplaceholder.typicode.com/${currentPage}/${currentPost.id}`,{
            title:text
        })
    }


    return (
        <div className={'absolute w-full h-full flex justify-center items-center'}>
            <div className="div z-10 w-2/4 h-1/3 bg-white rounded-md flex flex-col relative p-7 items-center">
                <div onClick={close} className={'absolute top-1 right-2 select-none'}>✕</div>
                <p onClick={editObj}>Текущее имя: {currentPost.title}</p>
                <input onChange={(e)=>setText(e.target.value)} placeholder={'введите новое имя'} type={'text'} className={'p-4 mt-4 w-7/12 h-7 rounded border-none outline-none bg-gray-200'}/>
                <button onClick={editRequest} className={'rounded mt-4 h-1/5 w-7/12 h-7 bg-lime-400'}>редактировать</button>
            </div>
            <div onClick={close} className="bg-gray-500/25 w-full h-full absolute z-0"></div>
        </div>
    );
};

export default ModalEdit;