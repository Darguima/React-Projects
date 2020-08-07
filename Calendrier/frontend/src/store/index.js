import { createStore } from "redux";

const inicalState = {

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


        isConfigurationsMenuOpen: false,

        isDayEventCreatorOpened: false,
    },

    eventManager: {
        year: new Date().getFullYear(),
        month: null,
        day: null
    }
}

function reducer(state = inicalState, action){

    switch (action.type){
       
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
        
        case "CHANGE_SESSION_INFO_IS_DAY_EVENT_CREATOR_OPENED":
        return {
            ...state,
            sessionInfo: {
                ...state.sessionInfo,
                isDayEventCreatorOpened: action.newIsDayEventCreatorOpened
            }
        }
        
        case "CHANGE_ANY_MENU_TO_THE_SAME_STATE":
            return {
                ...state,
                sessionInfo: {
                    ...state.sessionInfo,
                    isConfigurationsMenuOpen: action.newState,
                    isChangeYearMenuOpen: action.newState,
                    isDayEventCreatorOpened: action.newState,
                }
            }
        
        case "CHANGE_EVENT_MANAGER_YEAR":
            return {
                ...state,
                eventManager: {
                    ...state.eventManager,
                    year: action.newYear
                }
            }

        case "CHANGE_EVENT_MANAGER_MONTH":
            return {
                ...state,
                eventManager: {
                    ...state.eventManager,
                    month: action.newMonth
                }
            }

        case "CHANGE_EVENT_MANAGER_DAY":
            return {
                ...state,
                eventManager: {
                    ...state.eventManager,
                    day: action.newDay
                }
            }
        
        case "CHANGE_EVENT_MANAGER":
            return {
                ...state,
                eventManager: {
                    year: action.newYear,
                    month: action.newMonth,
                    day: action.newDay
                }
            }
    
        default:
            return state
    }
}

const store = createStore(reducer)

export default store
