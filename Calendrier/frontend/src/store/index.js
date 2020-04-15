import { createStore } from "redux";

const inicalState = {
    userInfo: {
        __v: null,
        _id: null,
        events: null,
        nickname: null,
    }, 

    sessionInfo: {
        year: new Date().getFullYear(),
        isChangeYearMenuOpen: false,
        changeYearMenuYearRange: [
            new Date().getFullYear() - 3,
            new Date().getFullYear() - 2,
            new Date().getFullYear() - 1,
            new Date().getFullYear(),
            new Date().getFullYear() + 1,
            new Date().getFullYear() + 2,
            new Date().getFullYear() + 3,
        ]

    }
}

function reducer(state = inicalState, action){

    switch (action.type){
        case "CHANGE_USER_DATA":
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    __v: action.__v,
                    _id: action._id,
                    events: action.events,
                    nickname: action.nickname
                }
            }
        
        case "CHANGE_SESSION_INFO_YEAR":
            return {
                ...state,
                sessionInfo: {
                    ...state.sessionInfo,
                    year: action.newYear
                }
            }
        
        case "CHANGE_SESSION_INFO_IS_CHANGE_YEAR_MENU_OPEN":
            return {
                ...state,
                sessionInfo: {
                    ...state.sessionInfo,
                    isChangeYearMenuOpen: action.newIsChangeYearMenuOpen
                }
            }
        
        case "CHANGE_SESSION_INFO_CHANGE_YEAR_MENU_YEAR_RANGE":
        return {
            ...state,
            sessionInfo: {
                ...state.sessionInfo,
                changeYearMenuYearRange: action.newChangeYearMenuYearRange
            }
        }
    
        default:
            return state
    }
}

const store = createStore(reducer)

export default store
