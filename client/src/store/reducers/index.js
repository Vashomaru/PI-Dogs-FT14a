const initialState = {
    detail : {},
    dogList : [],
    temperaments : []
}

export default function rootReducer(state = initialState , action){
    switch (action.type) {
        case "GET_DOGS":
            return {
                ...state , 
                dogList : action.payload
            }
        case "GET_TEMPERAMENTS":
            return{
                ...state ,
                temperaments : action.payload
            }
        case "GET_DETAIL":
            return{
                ...state ,
                detail : action.payload
            }
        case "CLEAR_DETAIL":
            return{
                ...state ,
                detail : {}
            }
        case "NULL_DETAIL":
            return{
                ...state ,
                detail : {error : action.payload}
            }
        default:
            return state
    }
}