import React, { useEffect, useState } from "react";
import styles from "./stylesdata.module.css";
import ResultComponent from './ResultComponent';
import KeyPadComponent from './KeyPadComponent';

export default function CalculatorMain() {

  const [state, setState] = useState({
    result: "",
    question:""
  });

  const onClick = button => {
    if(button === "=") {
      calculate();
    }

    else if(button === "C") {
      reset();
    }

    else if(button === "CE") {
      backspace();
    }

    else {
      setState({
        result: "",
        question:state.question + button
      })
    }
  };

  const calculate = () => {
    var checkResult = ''
    if(state.question.includes('--')) {
      checkResult = state.question.replace('--', '+')
    } else {
      checkResult = state.question;
    }

    try {
      setState({
        result: (eval(checkResult) || "") + "",
        question:state.question 
      })
    } catch(e) {
      setState({
        result: "error"
      })
    }
  };

  const reset = () => {
    setState({
      result: "",
      question:""
    })
  };

  const backspace = () => {
    setState({
      question: state.question.slice(0, -1),
      result: ""
    })
  };

    return (
      <div>
        <div className={styles.calculatorBody}>

          <ResultComponent state={state} />
          <KeyPadComponent onClick={onClick} />
        </div>
      </div>
    )
}

