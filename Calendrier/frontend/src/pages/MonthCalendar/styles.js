import styled from 'styled-components';

export const MonthCalendarContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100vw;

  margin: 0;

  /*rgb(125, 220, 255)*/
  /*rgb(79, 175, 204)*/
`;

export const DayButtonsTableContainer = styled.table`
    width: 100vw;
    height: 100%;
`

export const DayButtonsTr = styled.tr`
    height: ${props => `${props.rowHeight}px`};
`

export const DayButton = styled.td`
    height: 90%;

    div{

        display: flex;
        align-items: center;
        justify-content: center;

        width: 50%;
        height: 100%;

        margin: 12.5% 25%;

        background-color: rgb(82, 201, 237);
        border: 1px solid black;

        a{
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
            height: 100%;
            text-decoration: none;
            color: black;

            -webkit-user-select: none;
            -moz-user-select: -moz-none;
            -ms-user-select: none;
            user-select: none;
        }
    }

    div:hover{
        font-weight: bold;

        background-color: rgb(79, 175, 204);

        transition: 0.2s
    }
`

