import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    changeStatusAction,
    currentAlbumAction,
    savedPhoto,
    savedPost,
    selectAction
} from "../../storage/postSlice/postSlice";
import {modalEditAction} from "../../storage/widgetSlice/widgetSlice";
import axios from "axios";
import '../../app.css'
import edit from "../../images/editing.png"
import saves from "../../images/free-icon-bookmark-2710507.png"
import comment from "../../images/comment.png"
import {Link} from "react-router-dom";
const CardItem = ({e,spec}) => {
    const [active,setActive]=useState(false)
    const[saveChecker,setSaveChecker]=useState(false)
    const {select}=useSelector(state=>state.postReduce)
    const {savedPosts}=useSelector(state=>state.postReduce)
    const {savedPhotos}=useSelector(state=>state.postReduce)
    const {currentPage}=useSelector(state=>state.widgetReducer)
    const {taskState}=useSelector(state=>state.widgetReducer)
    const dispatch = useDispatch()
    const [comments,setComments]=useState([])
    const [stateCom,setStateCom]=useState(false)
    const {completedTask}=useSelector(state=>state.postReduce)
    const {anCompletedTask}=useSelector(state=>state.postReduce)
    const [status,setStatus]=useState()

    const save = () => {
        if (currentPage === 'posts') {
            const foundPost = savedPosts.find(post => post.id === e.id)
            if (foundPost) {
                setSaveChecker(true)
            } else {
                setSaveChecker(false)
            }
        } else if (currentPage === 'photos') {
            const foundPhoto = savedPhotos.find(photo => photo.id === e.id)
            if (foundPhoto) {
                setSaveChecker(true)
            } else {
                setSaveChecker(false)
            }
        }
    }

    const complete = () => {
        const completedF = completedTask.find(task => task.id === e.id && task.completed)
        const anCompletedF = anCompletedTask.find(task => task.id === e.id && task.completed)

        setStatus(completedF || anCompletedF ? true : false)
    }
    useEffect(() => {
        complete()
    }, [completedTask, anCompletedTask,taskState])

    const filterComments=(data)=>{
        return data.filter(item => item.postId === e.id)
    }
    useEffect(() => {
        save();
        const commReq=async ()=>{
            const res = await axios.get('https://jsonplaceholder.typicode.com/comments')
            const filteredComm=filterComments(res.data)
            setComments(filteredComm)
        }
        commReq()
    }, [])

    useEffect(() => {
        save()
    }, [savedPosts, savedPhotos,e])


    const saveHandle = () => {
        if (currentPage === 'posts') {
            dispatch(savedPost(e))
        } else if (currentPage === "photos") {
            dispatch(savedPhoto(e))
        }
        setSaveChecker(!saveChecker)
    }

    const selectHandle = () => {
        setActive(!active)
        dispatch(selectAction(e))
    }
    const modalE=()=>{
        dispatch(modalEditAction(e))
    }

    useEffect(() => {
        setActive(false)
    }, [e])

    useEffect(() => {
        if (select.length === 0) {
            setActive(false)
        }
    }, [select])

    const handleStatusStart = () => {
        if (!status) {
            dispatch(changeStatusAction(e))
        }
    };

    const handleStatusFinish = () => {
        if (status) {
            dispatch(changeStatusAction(e))
        }
    }
    const selectAlbum = () => {
        dispatch(currentAlbumAction(e))
    }

    return (
            <div className={'mb-2'}>

                <div style={active?{background:'rgba(30, 104, 255)'}:{}} style={saveChecker?{border:'1px lime solid'}:{}} className={'flex h-24 rounded-lg'}>

                    <div onClick={selectHandle}  style={active?{background:'rgb(198,233,255)',borderRadius:'8px'}:{}}  className={'flex items-center justify-center'}>
                        <div className={"text-sm text-gray-500 select-none"}>выбрать</div>
                    </div>
                    <div style={saveChecker?{}:{border:'1px solid gray', borderRadius:'9px'}} className={'w-full h-full flex justify-between'}>
                        <div>
                            {currentPage==='todos'?<p style={status ? {textDecoration: 'line-through'} : {}}>{e.title}</p>:null}
                            {currentPage==='posts'?<p>{e.title}</p>:null}
                            {currentPage==='photos'?<Link onClick={selectAlbum}  to={`/${e.id}`}><p>{e.title}</p></Link>:null}
                            <div className={'truncated-text text-gray-600'}>{e.body}</div>
                        </div>
                        <div className={'w-1/3 items-end flex flex-col'}>
                            {currentPage!=='todos'?<div className={'flex justify-end'}>
                                {currentPage !== 'todos' ? <img style={{cursor:'pointer',width:'24px', height:"24px"}} src={edit} onClick={modalE}/> : null}
                                <div style={saveChecker ? {color: 'green'} : {}} onClick={saveHandle}><img style={{cursor:'pointer',width:'24px', height:"24px"}} src={saves}/></div>
                            </div>:null}
                            {currentPage==='posts'?<img style={{width:'24px', height:'24px'}} src={comment} onClick={() => setStateCom(!stateCom)}/>:null}
                            {currentPage==='todos'?<div>
                                <div className={'flex  flex-col w-full pr-2'}>
                                    <button onClick={handleStatusFinish} className={'mb-3 mt-3 rounded-md'} style={!status? {background:'rgb(189,189,189)'}:{background:'rgb(112,243,255)'}}>начать</button>
                                    <button onClick={handleStatusStart} className={'rounded-md text-white'} style={status? {background:'rgb(255,112,112)'}:{background:'rgb(255,0,0)'}}>завершить</button>
                                </div>
                            </div>:null}
                        </div>
                    </div>
                </div>
                {currentPage==='posts'?
                    stateCom? <div className={'bg-gray-100 rounded-md transition'}>
                        комментарии:
                        {comments.map((e) =>
                            <div className={'flex flex-col mb-2 text-xs'}>
                                <div className={'text-gray-500'}>name: {e.name}</div>
                                <div className={'text-gray-500'}>email: {e.email}</div>
                                <div>{e.body}</div>
                            </div>
                        )}
                </div>:null:null}
            </div>
    );
};

export default CardItem;