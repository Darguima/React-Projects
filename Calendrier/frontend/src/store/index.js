import { createStore } from "redux";

const inicalState = {
    __v: null,
    _id: null,
    events: null,
    nickname: null,
}

function reducer(state = inicalState, action){

    switch (action.type){
        case "CHANGE_USER_DATA":
            return {
                ...state,
                __v: action.__v,
                _id: action._id,
                events: action.events,
                nickname: action.nickname,
            }
        
        default:
            return state
    }
}

const store = createStore(reducer)

export default store
