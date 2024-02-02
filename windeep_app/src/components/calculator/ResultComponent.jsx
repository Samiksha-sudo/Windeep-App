import React, { Component } from 'react';
import styles from "./stylesdata.module.css";
export default function ResultComponent(props) {

    return (
      <div className={styles.result}>
        <p>{props.state.question  }{props.state.result && " = " +props.state.result }</p>
      </div>
    )
}

