import React, { useEffect, useCallback } from 'react';

import'./styles.css';
import { connect } from 'react-redux';

const ChangeYearMenu = ({sessionInfo, dispatch}) => {

  const changeToPreviousRange = () => {
    let lastYear = sessionInfo.changeYearMenuYearRange[0]

    dispatch({
      type: "CHANGE_SESSION_INFO_CHANGE_YEAR_MENU_YEAR_RANGE",
      newChangeYearMenuYearRange: [
        lastYear - 7,
        lastYear - 6,
        lastYear - 5,
        lastYear - 4,
        lastYear - 3,
        lastYear - 2,
        lastYear - 1,
      ]
    })
  }

  const changeYear = event => {
    dispatch({
      type: "CHANGE_SESSION_INFO_YEAR",
      newYear: Number(event.target.innerText)
    })

    dispatch({
      type: "CHANGE_SESSION_INFO_IS_CHANGE_YEAR_MENU_OPEN",
      newIsChangeYearMenuOpen: false
    })
  }

  const changeToNextRange = () => {
    let lastYear = sessionInfo.changeYearMenuYearRange[6]

    dispatch({
      type: "CHANGE_SESSION_INFO_CHANGE_YEAR_MENU_YEAR_RANGE",
      newChangeYearMenuYearRange: [
        lastYear + 1,
        lastYear + 2,
        lastYear + 3,
        lastYear + 4,
        lastYear + 5,
        lastYear + 6,
        lastYear + 7,
      ]
    })
  }

  // Handle with Esc press to close menu

  const closeMenu = useCallback(() => {
    dispatch({
      type: "CHANGE_SESSION_INFO_IS_CHANGE_YEAR_MENU_OPEN",
      newIsChangeYearMenuOpen: false
    })
  }, [dispatch])

  useEffect(() => {
    function handleEscKeyPress({key}){
      if (key === "Escape"){        
        closeMenu()
      }
    }

    document.addEventListener("keydown", handleEscKeyPress)

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress)
    }
  }, [closeMenu])

  return (
    <table id="changeYearMenuContainer"><tbody>

      <tr className="line">
        <td onClick={changeToPreviousRange}>
          {"<<"}
        </td>

        <td onClick={changeYear}>
          {sessionInfo.changeYearMenuYearRange[0]}
        </td>

        <td onClick={changeYear}>
          {sessionInfo.changeYearMenuYearRange[1]}
        </td>

      </tr>

      <tr className="line">
        <td onClick={changeYear}>
          {sessionInfo.changeYearMenuYearRange[2]}
        </td>

        <td onClick={changeYear}>
          {sessionInfo.changeYearMenuYearRange[3]}
        </td>

        <td onClick={changeYear}>
          {sessionInfo.changeYearMenuYearRange[4]}
        </td>

      </tr>

      <tr className="line">
        <td onClick={changeYear}>
          {sessionInfo.changeYearMenuYearRange[5]}
        </td>

        <td onClick={changeYear}>
          {sessionInfo.changeYearMenuYearRange[6]}
        </td>

        <td onClick={changeToNextRange}>
          {">>"}
        </td>
      </tr>

    </tbody></table>
  );
}

export default connect(state => ({sessionInfo: state.sessionInfo}))(ChangeYearMenu)
