import styled from 'styled-components';

/*rgb(79, 175, 204)*/
/*rgb(125, 220, 255)*/
/*rgb(20, 115, 255)*/

export const Container = styled.div`
  position: fixed;
  top: 7vh;

  /*
  To be compatible with Firefox

  bottom: 0;
  
  Header's Height{
    height: 7vh;
    min-height: 30px;
  }
  */

  left: 0;
  right: 0;
  margin: auto;

  width: max-content;
  min-width: 300px;
  max-width: 100%;

  height: -moz-fit-content;
  min-height: 150px;
  max-height: 100%;

  background-color: #ffffff;

  border: 2px solid rgb(20, 115, 255);
  border-radius: 25px;

  #titleDiv{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 3%;

    span{
      font-size: 1.5em;
      font-weight: bold;

      text-align: center;
    }


  }

  #buttonsDiv{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    padding: 3%;
    margin-top: 1%;

    border-top: 1px solid rgb(20, 115, 255);

  }
`;

export const Button = styled.button`

  border: 2px solid rgb(20, 115, 255);
  border-radius: 5px; 

  padding: 2%;
  margin: 2%;

  span{
      font-size: 1.2em;
      font-weight: bold;

      text-align: center;

      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }
  
  :hover{
    border-color: rgb(20, 115, 255);
    background-color: rgba(0, 50, 255, 0.5);

    transition: 0.3s;
  }
`;

export const TableContainer = styled.table`
  width: 100%;

  border-collapse: separate;auto
  border-spacing: 10px;
`;

export const DayEventCreatorRow = styled.tr`
`;

export const TextColumn = styled.td`

  vertical-align: top;
  text-align: center;

  width: 30%;


  span{
    font-size: 1.1em;
    font-weight: bold;
  }


`;

export const InputColumn = styled.td`

  width: 70%;

  input, textarea{
    border: 2px solid rgb(20, 115, 255);
    border-radius: 5px;

    padding: 3px 5px;

    width: 100%;
    
    resize: none;

    text-align: center;

    font-family: Arial, Helvetica, sans-serif;
  }

  #inputTime{
    text-align: center
  }

  #inputName{
    font-size: 1.1em;
  }
`;

export const ExitText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  padding: 10%;

  span{
    font-size: 1.1em;
    font-weight: bold;

    text-align: center;
    vertical-align: center;
  }
`;


export const ExitButton = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  button{  
    border: 2px solid rgb(20, 115, 255);
    border-radius: 5px; 

    padding: 2%;
    margin: 0 4% 8% 4%;

    span{
        font-size: 1.2em;
        font-weight: bold;

        text-align: center;

        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    
    :hover{
      border-color: rgb(20, 115, 255);
      background-color: rgba(0, 50, 255, 0.5);

      transition: 0.3s;
    }
  }
`;
