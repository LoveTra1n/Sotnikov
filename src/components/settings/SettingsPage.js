import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {amountAction, modalAction, saveAction, sortByTask} from "../../storage/widgetSlice/widgetSlice";
import amounts from "../../images/catalog.png"
import savedIcon from "../../images/free-icon-bookmark-2710704.png"
import savedIcon0 from "../../images/free-icon-bookmark-2710507.png"
import done from "../../images/free-icon-checked-3161410.png"
import anDone from "../../images/multiply.png"
import {selectSortAction} from "../../storage/postSlice/postSlice";

const SettingsPage = () => {
    const {select} = useSelector(state=>state.postReduce)
    const {amount} = useSelector(state=>state.widgetReducer)
    const {selectSort}=useSelector(state=>state.postReduce)
    const {currentPage}=useSelector(state=>state.widgetReducer)
    const dispatch=useDispatch()
    const [mount,setAmount] = useState(10)
    const [activeMount,setActiveMount]=useState(false)
    const [activeDrop,setActiveDrop]=useState(false)
    const {activeSave}=useSelector(state=>state.widgetReducer)
    const {taskState}=useSelector(state=>state.widgetReducer)

    const setSaved =()=>{
        dispatch(saveAction())
    }
    const handleModal=()=>{
        dispatch(modalAction())
    }
    const handleMount=(num)=>{
        setAmount(num)
        dispatch(amountAction(num))
    }
    const openDrop=()=>{
        setActiveDrop(!activeDrop)
    }

    const selectedSort=(str)=>{
        dispatch(selectSortAction(str))
        setActiveDrop(false)
    }
    const handleTask = (str) => {
      dispatch(sortByTask(str))
    }

    useEffect(()=>{

    },[select,amount,selectSort])
    return (
        <div className={'w-full flex justify-between p-4'}>
            <div className={'w-1/6 flex'}>
                {select.length !== 0 ? <div className={'w-full flex justify-center rounded text-white select-none cursor-pointer h-7 bg-red-600'} onClick={handleModal}>удалить</div> : <div className={'h-7'}></div>}
            </div>

            {currentPage!='todos'?<div className={'flex w-10/12 justify-around'}>
                <div style={selectSort === 'postName' ? {borderBottom: '2px solid gray'} : {}}
                     onClick={() => selectedSort('postName')} className={'text-sm select-none cursor-pointer'}>по
                    названию
                </div>
                <div style={selectSort === 'userId' || selectSort === 'postId' ? {borderBottom: '2px solid gray'} : {}}
                     className={'text-sm relative select-none cursor-pointer'}><p onClick={openDrop}>по имени</p>
                    {activeDrop ?
                        <div className={'z-10 absolute w-32 bg-gray-200 h-16 flex flex-col justify-around rounded-md'}>
                            <div style={selectSort === 'userId' ? {background: 'lightgray'} : {}}
                                 onClick={() => selectedSort('userId')}>ID пользователя
                            </div>
                            <div style={selectSort === 'postId' ? {background: 'lightgray'} : {}}
                                 onClick={() => selectedSort('postId')}>ID поста
                            </div>
                        </div> : null}
                </div>
            </div>:<div className={'flex justify-around w-1/3'}>
                <div style={taskState === 'uncommit' ? {borderBottom: '2px solid gray'} : {}} onClick={()=>handleTask('uncommit')}><img src={anDone}/> </div>
                <div style={taskState === 'commit' ? {borderBottom: '2px solid gray'} : {}} onClick={()=>handleTask('commit')}><img src={done}/></div>
            </div>}

            <div style={currentPage==='todos'?{justifyContent:"end"}:{}} className="flex w-1/6 justify-between">
                <div onClick={()=>setActiveMount(!activeMount)} className={'flex relative cursor-pointer select-none'}>
                    {amount===1000?'все':amount}
                    <img  className={'w-6'} src={amounts}/>
                    {activeMount?<div className={'absolute w-12 h-32 flex flex-col items-center top-7 rounded-md bg-gray-200'}>
                        <p onClick={() => handleMount(10)} className={'w-full flex justify-center'}>10</p>
                        <p onClick={() => handleMount(20)} className={'w-full flex justify-center'}>20</p>
                        <p onClick={() => handleMount(50)} className={'w-full flex justify-center'}>50</p>
                        <p onClick={() => handleMount(100)} className={'w-full flex justify-center'}>100</p>
                        <p onClick={() => handleMount(1000)} className={'w-full flex justify-center'}>все</p>
                    </div>:null}
                </div>
                {currentPage!=='todos'?<div className={'cursor-pointer select-none'} onClick={setSaved}>
                    {activeSave ? <img src={savedIcon}/> : <img src={savedIcon0}/>}
                </div>:null}
            </div>
        </div>
    );
};

export default SettingsPage;