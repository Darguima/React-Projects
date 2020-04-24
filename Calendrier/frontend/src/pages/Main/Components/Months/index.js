import React from 'react';
import {Link} from "react-router-dom"

import { MonthsContainer, MonthButtonsTableContainer, MonthButtonsTr, MonthButton } from "./styles"

import { connect } from "react-redux"

const Months = ({userInfo}) => {
  const screenSizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    componentHeight: null,
    ratio: null,
    proportions: null
  }

  screenSizes.componentHeight = screenSizes.height * 0.07 <= 30 ? screenSizes.height - 30 : screenSizes.height * 0.93

  if (screenSizes.width > screenSizes.height){ // horizontal screen

      screenSizes.ratio = 4 / 3
      screenSizes.proportions = [4, 3]
  }

  else{ // vertical screen
      if (screenSizes.width * 2 < screenSizes.height * 1.5){
          screenSizes.ratio = 2 / 6
          screenSizes.proportions = [2, 6]
      }

      else {
          screenSizes.ratio = 3 / 4
          screenSizes.proportions = [3, 4]
      }
  }

  return(
    <MonthsContainer>
      <MonthButtonsTableContainer screenWidth={screenSizes.width} screenProportions={screenSizes.proportions}>
      <tbody>

      {screenSizes.ratio === 2 / 6 &&
      <>
        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/January/${userInfo._id}`}> January </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/February/${userInfo._id}`}> February </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/March/${userInfo._id}`}> March </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/April/${userInfo._id}`}> April </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/May/${userInfo._id}`}> May </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/June/${userInfo._id}`}> June </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/July/${userInfo._id}`}> July </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/August/${userInfo._id}`}> August </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/September/${userInfo._id}`}> September </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/October/${userInfo._id}`}> October </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/November/${userInfo._id}`}> November </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/December/${userInfo._id}`}> December </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>
      </>
      }

      {screenSizes.ratio === 3 / 4 &&
      <>
        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/January/${userInfo._id}`}> January </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/February/${userInfo._id}`}> February </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/March/${userInfo._id}`}> March </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/April/${userInfo._id}`}> April </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/May/${userInfo._id}`}> May </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
            <Link to={`/month/June/${userInfo._id}`}> June </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/July/${userInfo._id}`}> July </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
            <Link to={`/month/August/${userInfo._id}`}> August </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/September/${userInfo._id}`}> September </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/October/${userInfo._id}`}> October </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/November/${userInfo._id}`}> November </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/December/${userInfo._id}`}> December </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>
      </>
      }



      {screenSizes.ratio === 4 / 3 &&
      <>
        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/January/${userInfo._id}`}> January </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/February/${userInfo._id}`}> February </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/March/${userInfo._id}`}> March </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/April/${userInfo._id}`}> April </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/May/${userInfo._id}`}> May </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/June/${userInfo._id}`}> June </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/July/${userInfo._id}`}> July </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/August/${userInfo._id}`}> August </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/September/${userInfo._id}`}> September </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/October/${userInfo._id}`}> October </Link>
          </div>
        </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/November/${userInfo._id}`}> November </Link>
          </div>
        </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/December/${userInfo._id}`}> December </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>
      </>
      }

      </tbody>
      </MonthButtonsTableContainer>
    </MonthsContainer>
  )
}

export default connect(state => ({userInfo: state.userInfo}))(Months)
