import React from 'react';
import Header from "../../components/header/Header";
import FunctionPage from "../../components/function/FunctionPage";
import Modal from "../../components/modal/Modal";
import {useSelector} from "react-redux";
import ModalEdit from "../../components/modalEDit/ModalEdit";

const HomePage = () => {
    const {modal}=useSelector(state=>state.widgetReducer)
    const {modalEdit}=useSelector(state=>state.widgetReducer)
    return (
        <div className={'bg-white mt-10 h-800 rounded flex relative'}>
            {modal?<Modal/>:null}
            {modalEdit?<ModalEdit/>:null}
            <Header/>
            <FunctionPage/>
        </div>
    );
};

export default HomePage;