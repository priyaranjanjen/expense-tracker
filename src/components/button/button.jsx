/* eslint-disable react/prop-types */
import classes from './button.module.css';

export default function Button({text, style, handleClick, shadow=false, type="button"}){
    return(
        <button 
            type={type}
            className={`${classes.button} ${classes[style]} ${shadow && classes.shadow}`}
            onClick={handleClick}
        >
            {text}
        </button>
    )
}