    import React, {useEffect, useState} from 'react';
    import {useDispatch, useSelector} from "react-redux";
    import SettingsPage from "../settings/SettingsPage";
    import axios from "axios";
    import CardItem from "../cardItem/CardItem";
    import {
        addAlbums,
        addPhotos,
        allTaskAction,
        completedTaskAction,
        deleteSelectAction
    } from "../../storage/postSlice/postSlice";
    import Pagination from "../Pagination/Pagination";
    import {checkAT} from "../../storage/widgetSlice/widgetSlice";

    const FunctionPage = () => {
        const [posts,setPosts]=useState([])
        const {currentPage}=useSelector(state=>state.widgetReducer)
        const {deleted}=useSelector(state=>state.postReduce)
        const {deletedPhoto}=useSelector(state=>state.postReduce)
        const dispatch=useDispatch()
        const {selectSort}=useSelector(state=>state.postReduce)
        const {activeSave}=useSelector(state=>state.widgetReducer)
        const {savedPosts}=useSelector(state=>state.postReduce)
        const {savedPhotos}=useSelector(state=>state.postReduce)
        const {amount}=useSelector(state=>state.widgetReducer)
        const {allTasks}=useSelector(state=>state.postReduce)
        const [currentPageP,setCurrentPage]=useState(1)
        const {anCompletedTask}=useSelector(state=>state.postReduce)
        const {completedTask}=useSelector(state=>state.postReduce)
        const {check}=useSelector((state=>state.widgetReducer))
        const [mergedTasks,setMergedTasks]=useState([])
        const {taskState}=useSelector(state=>state.widgetReducer)

        useEffect(() => {
            if (taskState === 'uncommit') {
                setMergedTasks([...anCompletedTask, ...completedTask])
            }else if (taskState === 'commit') {
                setMergedTasks([...completedTask, ...anCompletedTask])
            }
        }, [completedTask, anCompletedTask, taskState])

        const sortFunc=(arr)=>{
            if (selectSort === 'postName') {
                return [...arr].sort((a, b) => a.title.localeCompare(b.title))
            } else if (selectSort === 'userId') {
                return [...arr].sort((a, b) => a.userId - b.userId)
            } else if (selectSort === 'postId') {
                return [...arr].sort((a, b) => a.id - b.id)
            } else {
                return arr
            }
        }


        const filterPosts = async (data) => {
            try {
                if (currentPage === 'posts') {
                    const similarObjects = data.filter(obj1 => deleted.some(obj2 => obj2.id === obj1.id))
                    const filteredPosts = data.filter(obj1 => !similarObjects.some(obj2 => obj2.id === obj1.id))
                    return filteredPosts
                } else if (currentPage === 'photos') {
                    const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`)
                    dispatch(addPhotos(res.data))
                    if (deletedPhoto) {
                        const similarPhotos = data.filter(obj1 => deletedPhoto.some(obj2 => obj2.id === obj1.id))
                        const filteredPhotos = data.filter(obj1 => !similarPhotos.some(obj2 => obj2.id === obj1.id))
                        dispatch(addAlbums(filteredPhotos))
                        console.log(deletedPhoto)
                        return filteredPhotos
                    } else {
                        dispatch(addAlbums(data))
                        return data
                    }
                }
                else {
                    return data
                }
            }catch (e){
                alert(e)
            }

        };

        const handleReq = async () => {
            try {
                if (currentPage!='todos'){
                    const res = await axios.get(`https://jsonplaceholder.typicode.com/${currentPage==='photos'?'albums':currentPage}`)
                    const filteredData = await filterPosts(res.data)
                    setPosts(sortFunc(filteredData))
                }else {
                    if (allTasks.length===0){
                        const res = await axios.get(`https://jsonplaceholder.typicode.com/${currentPage}`)
                        dispatch(allTaskAction(res.data))
                    }else {
                        if (!check){
                            dispatch(completedTaskAction())
                        }
                        dispatch(checkAT())
                    }
                }
            }catch (e) {
                alert(e)
            }
        };
        useEffect(() => {
            handleReq()
        }, [currentPage, deleted,selectSort])

        useEffect(()=>{
            dispatch(deleteSelectAction())
            handleReq()
        },[])


        const indexOfLastPost = currentPageP * amount
        const indexOfFirstPost = indexOfLastPost - amount
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
        const howManyPages = Math.ceil(posts.length/amount)

        const currentPostsTask = mergedTasks.slice(indexOfFirstPost, indexOfLastPost)
        const howManyPagesTask = Math.ceil(posts.length/amount)



        return (
            <div  className={'w-full h-full'}>

                <SettingsPage/>
                <div style={{overflowY:'scroll',height:'600px'}} className="w-11/12 m-auto flex flex-col item-center">
                    {currentPage==='todos'
                        ?
                        <div>
                        {currentPostsTask.map((e) => <CardItem e={e}/>)}
                        </div>
                        :

                        <div>
                    {activeSave ? (
                        currentPage === 'posts' ? (
                        savedPosts.map((e) => <CardItem e={e} spec={currentPage} />)
                        ) : (
                        savedPhotos.map((e) => <CardItem e={e} spec={currentPage} />)
                        ))
                        :
                        (
                        currentPosts.map((e) => <CardItem e={e} spec={currentPage} />)
                        )}
                        </div>}


                    {currentPage === 'todos'
                        ?
                        <div>

                        </div>
                        :
                        <div>
                            <Pagination setCurrentPage={setCurrentPage} pages={howManyPages}/>
                        </div>
                    }
                </div>
            </div>
        )
    };

    export default FunctionPage;