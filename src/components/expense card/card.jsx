/* eslint-disable react/prop-types */
import classes from './card.module.css';
import Button from '../button/button';

export default function Card({type, value, buttonText, buttonStyle, handlClick}){

    let classname;

    if(type === "Wallet Balance"){
        classname = `${classes.first}`;
    }else{
        classname = `${classes.second}`;
    }
    

    return(
        <div className={classes.card}>
            <h3>
                <span className={classes.text}>{type}</span>{`: `}
                <span className={classname}>₹{value}</span>
            </h3>
            <Button text={buttonText} style={buttonStyle} handleClick={handlClick}/>
        </div>
    )
}