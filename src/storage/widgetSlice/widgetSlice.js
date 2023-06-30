import {createSlice} from "@reduxjs/toolkit";

const widgetSlice=createSlice({
    name:'widgetSlice',
    initialState:{
        amount:'10',
        currentPage:'posts',
        modal:false,
        modalEdit:false,
        currentPost:null,
        activeSave:false,
        check:false,
        taskState:'uncommit'
    },
    reducers:{
        sectionAction:(state, action)=>{
            state.currentPage=action.payload
            localStorage.setItem('currentPage',action.payload)
        },
        modalAction:(state, action)=>{
            state.modal=!state.modal
            state.modalEdit=false
        },
        modalEditAction:(state, action)=>{
            state.modalEdit=!state.modalEdit
            state.currentPost=action.payload
        },
        closeEdit:(state, action)=>{
            state.modalEdit=false
            state.currentPost=null
        },
        amountAction:(state, action)=>{
            state.amount=action.payload
        },
        saveAction:(state, action)=>{
            state.activeSave=!state.activeSave
        },
        checkAT:(state, action)=>{
            state.check = true
        },
        sortByTask:(state, action)=>{
            state.taskState=action.payload
            console.log(action.payload)
        }

    }
})

export const {sectionAction,modalAction,modalEditAction,closeEdit,amountAction,saveAction,checkAT,sortByTask}=widgetSlice.actions
export default widgetSlice.reducer