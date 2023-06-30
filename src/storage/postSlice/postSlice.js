    import {createSlice} from "@reduxjs/toolkit";

    const postSlice=createSlice({
        name:'postSlice',
        initialState:{
            select:[],
            deleted:[],
            deletedPhoto:[],
            deletedTasks:[],
            photos:[],
            albums:[],
            currentAlbum:{},
            savedPosts:[],
            savedPhotos:[],
            completedTask:[],
            anCompletedTask:[],
            allTasks:[],
            selectSort:'postName'
        },
        reducers:{
            currentAlbumAction:(state, action)=>{
                state.currentAlbum=action.payload
            },
            addPhotos:(state, action)=>{
                state.photos=action.payload
            },
            addAlbums:(state, action)=>{
                state.albums=action.payload
            },
            selectAction:(state, action)=>{
                const existingIndex = state.select.findIndex(item => item.id === action.payload.id);
                if (existingIndex !== -1) {
                    state.select = state.select.filter(item => item.id !== action.payload.id);
                } else {
                    state.select= [...state.select,action.payload]
                }
                },
            deleteSelectAction:(state, action)=>{
                state.select=[]
            },
            deleteObject:(state, action)=>{
                state.deleted = [...state.deleted,...state.select]
                state.select = []
            },
            deleteObjectPhoto:(state, action)=>{
                state.deletedPhoto=[...state.deletedPhoto,...state.select]
            },
            deleteObjectTasks:(state, action)=>{
                const selectedIds = state.select.map(item => item.id)

                state.completedTask = state.completedTask.filter(item => !selectedIds.includes(item.id))

                state.anCompletedTask = state.anCompletedTask.filter(item => !selectedIds.includes(item.id))

                state.select = []
            },
            savedPost:(state,action)=>{
                try {
                    const existingIndex = state.savedPosts.findIndex(item => item.id === action.payload.id)
                    if (existingIndex !== -1) {
                        state.savedPosts = state.savedPosts.filter(item => item.id !== action.payload.id)
                    } else {
                        state.savedPosts.push(action.payload)
                    }
                }catch (e){
                    state.savedPosts=[]
                }
            },
            savedPhoto:(state,action)=>{
                    const existingIndex = state.savedPhotos.findIndex(item => item.id === action.payload.id)
                    if (existingIndex !== -1) {
                        state.savedPhotos = state.savedPhotos.filter(item => item.id !== action.payload.id)
                    } else {
                        state.savedPhotos.push(action.payload)
                    }
            },
            selectSortAction:(state, action)=>{
                state.selectSort=action.payload
            },
            completedTaskAction:(state, action)=>{
                state.completedTask = []
                state.anCompletedTask = []

                state.allTasks.forEach((task) => {
                    if (task.completed) {
                        state.completedTask.push(task)
                    } else {
                        state.anCompletedTask.push(task)
                    }
                })

            },
            changeStatusAction:(state, action)=>{
                const { id, completed } = action.payload

                state.completedTask = state.completedTask.filter(task => task.id !== id)
                if (completed) {
                    state.completedTask.push(action.payload)
                }
                state.anCompletedTask = state.anCompletedTask.filter(task => task.id !== id)
                if (!completed) {
                    state.anCompletedTask.push(action.payload)
                }
            },
            allTaskAction:(state, action)=>{
                state.allTasks=action.payload
            }
        }
    })

    export const {currentAlbumAction,selectAction,deleteSelectAction,deleteObject,deleteObjectPhoto,addPhotos,addAlbums,savedPost,savedPhoto,selectSortAction,completedTaskAction,allTaskAction,changeStatusAction,deleteObjectTasks}=postSlice.actions
    export default postSlice.reducer