/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from '../../button/button';
import classes from './addBalance.module.css';

export default function AddBalance({setIsOpen, setBalance}){
    const [amount, setAmount] = useState("");
    // console.log(amount)

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(Number(amount) < 0){
            alert("amount should be greater than 0")
            setIsOpen(false)
            return;
        }

        setBalance(prev => prev + Number(amount));
        setIsOpen(false);
    } 


    return(
        <div className={classes.formModal}>
            <h1>Add Balance</h1>
            <div className={classes.formWrapper}>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='number'
                        placeholder='Income Amount'
                        value={amount}
                        onChange={(e)=> setAmount(e.target.value)}
                        required
                    />
                    <Button 
                        type="submit" 
                        text="Add Balance" 
                        style="primary" 
                        shadow
                    />
                    <Button 
                        text="Cancel"  
                        handleClick={()=>setIsOpen(false)}
                        shadow    
                    />
                </form>    
            </div>
        </div>
    )
}