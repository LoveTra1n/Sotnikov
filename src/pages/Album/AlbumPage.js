import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import "../../app.css"


const AlbumPage = () => {
    const {photos}=useSelector(state=>state.postReduce)
    const {currentAlbum}=useSelector(state=>state.postReduce)
    const[img,setImg]=useState([])
    const [bigImg,setBigImg]=useState()
    const [modalImg,setModalImg]=useState(false)


    const filterPhoto = () => {
        const filteredPhotos = photos.filter(photo => photo.albumId === currentAlbum.id);
        setImg(filteredPhotos);
    }

    useEffect(()=>{
        filterPhoto()
    },[])


    const handleImage=(e)=>{
        setBigImg(e)
        setModalImg(true)
    }
    const closeImage=()=>{
        setModalImg(false)
    }

    return (
        <div className={'bg-white mt-10 h-800 rounded flex relative'}>
            <div className={'w-full flex flex-col items-center'}>
                название: {currentAlbum.title}
                <div  style={{overflowY:'scroll',height:'600px'}}className={'flex flex-wrap justify-around'}>
                    {img.map((e)=>
                        <div className={'w-20 mb-2'}>
                            <img onClick={()=>handleImage(e.url)} src={e.thumbnailUrl}/>
                            <p className={'text-xs'}>{e.title}</p>
                        </div>
                    )}
                </div>
            </div>
            {modalImg?<div className={'w-full h-full absolute'}>
                <div onClick={closeImage} className={'z-0 w-full h-full absolute'}></div>
                <div className={'z-10 relative w-[600px] m-auto'}>
                    <div onClick={closeImage} className={'select-none cursor-pointer absolute right-3'}>✕</div>
                    <img className={'w11/12'} src={bigImg}/>
                </div>
            </div>:null}

        </div>
    );
};

export default AlbumPage;