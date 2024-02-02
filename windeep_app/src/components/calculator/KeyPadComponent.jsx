import React from 'react';
import styles from "./stylesdata.module.css";
import {  Button} from "@mui/material";
    export default function KeyPadComponent(props) {
    return (
      <div className={styles.buttonCacli}>
        <Button variant="contained"  name="(" onClick={e => props.onClick(e.target.name)}>(</Button>
        <Button variant="contained"  name="CE" onClick={e => props.onClick(e.target.name)}>CE</Button>
        <Button variant="contained"  name=")" onClick={e => props.onClick(e.target.name)}>)</Button>
        <Button variant="contained"  name="C" onClick={e => props.onClick(e.target.name)}>C</Button><br/>


        <Button variant="contained"  name="1" onClick={e => props.onClick(e.target.name)}>1</Button>
        <Button variant="contained"  name="2" onClick={e => props.onClick(e.target.name)}>2</Button>
        <Button variant="contained"  name="3" onClick={e => props.onClick(e.target.name)}>3</Button>
        <Button variant="contained"  name="+" onClick={e => props.onClick(e.target.name)}>+</Button><br/>


        <Button variant="contained"  name="4" onClick={e => props.onClick(e.target.name)}>4</Button>
        <Button variant="contained"  name="5" onClick={e => props.onClick(e.target.name)}>5</Button>
        <Button variant="contained"  name="6" onClick={e => props.onClick(e.target.name)}>6</Button>
        <Button variant="contained"  name="-" onClick={e => props.onClick(e.target.name)}>-</Button><br/>

        <Button variant="contained"  name="7" onClick={e => props.onClick(e.target.name)}>7</Button>
        <Button variant="contained"  name="8" onClick={e => props.onClick(e.target.name)}>8</Button>
        <Button variant="contained"  name="9" onClick={e => props.onClick(e.target.name)}>9</Button>
        <Button variant="contained"  name="*" onClick={e => props.onClick(e.target.name)}>x</Button><br/>


        <Button variant="contained"  name="." onClick={e => props.onClick(e.target.name)}>.</Button>
        <Button variant="contained"  name="0" onClick={e => props.onClick(e.target.name)}>0</Button>
        <Button variant="contained"  name="=" onClick={e => props.onClick(e.target.name)}>=</Button>
        <Button variant="contained"  name="/" onClick={e => props.onClick(e.target.name)}>÷</Button><br/>
      </div>
    )
}
