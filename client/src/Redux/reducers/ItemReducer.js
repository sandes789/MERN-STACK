import {
    GET_ITEMS,
    POST_ITEMS,
    DEL_ITEMS,
    ITEMS_LOADING
} from '../actions/type';
import {v4 as uuid} from 'uuid';

const initialState = {
    ListItems: [],
    isloading:false
}

export default function ( state = initialState, action ){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                isloading:false,
                ListItems: [...action.payload]

            }
        case POST_ITEMS:
            return {
                ...state,
                ListItems: [...state.ListItems, action.payload]
            }
        case DEL_ITEMS:
            return{
                ...state,
                ListItems: state.ListItems.filter(item =>{
                    return(
                        item._id !== action.payload
                    )
                })
            }
        case ITEMS_LOADING:
            return{
                ...state,
                isloading:true
            }
        default:
            return state
    }
}