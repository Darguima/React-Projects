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
        ],


        isConfigurationsMenuOpen: false
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
        
        case "CHANGE_USER_DATA_NICK":
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    nickname: action.newNickname
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
        
        case "CHANGE_SESSION_INFO_IS_CONFIGURATIONS_MENU_OPEN":
            return {
                ...state,
                sessionInfo: {
                    ...state.sessionInfo,
                    isConfigurationsMenuOpen: action.newIsConfigurationsMenuOpen
                }
            }
        
        case "CHANGE_ANY_MENU_TO_THE_SAME_STATE":
            return {
                ...state,
                sessionInfo: {
                    ...state.sessionInfo,
                    isConfigurationsMenuOpen: action.newState,
                    isChangeYearMenuOpen: action.newState
                }
            }
    
        default:
            return state
    }
}

const store = createStore(reducer)

export default store
