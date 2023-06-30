import {useDispatch, useSelector} from "react-redux";
import {sectionAction} from "../../storage/widgetSlice/widgetSlice";
import {deleteSelectAction} from "../../storage/postSlice/postSlice";


const Header = () => {
    const dispatch=useDispatch()
    const {currentPage}=useSelector(state=>state.widgetReducer)

    const handleSec=(spec)=>{
        dispatch(sectionAction(spec))
        dispatch(deleteSelectAction())
    }


    return (
        <div className={'flex flex-col w-1/5 bg-gray-100 rounded text-gray-600 p-4 text-lg'}>
            <div style={currentPage==='posts'?{borderBottom:'2px solid gray', transition:'200ms'}:{}}><h2 onClick={()=>handleSec('posts')} className={'mr-2 '}>Посты</h2></div>
            <div style={currentPage==='photos'?{borderBottom:'2px solid gray'}:{}}><h2 onClick={()=>handleSec('photos')} className={'mr-2'}>Фото</h2></div>
            <div style={currentPage==='todos'?{borderBottom:'2px solid gray'}:{}}><h2 onClick={()=>handleSec('todos')} className={'mr-2'}>Задачи</h2></div>
        </div>
    );
};

export default Header;