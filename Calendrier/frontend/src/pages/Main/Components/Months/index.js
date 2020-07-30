import React, { useState } from 'react';

import {Link, useRouteMatch} from "react-router-dom"

import { MonthsContainer, MonthButtonsTableContainer, MonthButtonsTr, MonthButton } from "./styles"

const Months = () => {
  const screenSizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    componentHeight: null,
    ratio: null,
    proportions: null
  }

  const [userId] = useState(useRouteMatch().params.userId)

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
              <Link to={`/month/January/${userId}`}> January </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/February/${userId}`}> February </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/March/${userId}`}> March </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/April/${userId}`}> April </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/May/${userId}`}> May </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/June/${userId}`}> June </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/July/${userId}`}> July </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/August/${userId}`}> August </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/September/${userId}`}> September </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/October/${userId}`}> October </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/November/${userId}`}> November </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 2}>
            <div className="LinkContainer">
              <Link to={`/month/December/${userId}`}> December </Link>
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
              <Link to={`/month/January/${userId}`}> January </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/February/${userId}`}> February </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/March/${userId}`}> March </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/April/${userId}`}> April </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/May/${userId}`}> May </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
            <Link to={`/month/June/${userId}`}> June </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/July/${userId}`}> July </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
            <Link to={`/month/August/${userId}`}> August </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/September/${userId}`}> September </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/October/${userId}`}> October </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/November/${userId}`}> November </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 3}>
            <div className="LinkContainer">
              <Link to={`/month/December/${userId}`}> December </Link>
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
              <Link to={`/month/January/${userId}`}> January </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/February/${userId}`}> February </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/March/${userId}`}> March </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/April/${userId}`}> April </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/May/${userId}`}> May </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/June/${userId}`}> June </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/July/${userId}`}> July </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/August/${userId}`}> August </Link>
            </div>
          </MonthButton>
        </MonthButtonsTr>

        <MonthButtonsTr>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/September/${userId}`}> September </Link>
            </div>
          </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/October/${userId}`}> October </Link>
          </div>
        </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/November/${userId}`}> November </Link>
          </div>
        </MonthButton>
          <MonthButton columnWidth={screenSizes.width / 4}>
            <div className="LinkContainer">
              <Link to={`/month/December/${userId}`}> December </Link>
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

export default Months
