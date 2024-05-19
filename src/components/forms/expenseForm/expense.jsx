/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../../button/button";
import classes from './expense.module.css';
import { enqueueSnackbar } from "notistack";


export default function AddExpense({setIsOpen, editId, expenseList, setExpenseList, balance, setBalance}){
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: "",
        date: ""
    })

    const handleChange = (e) => {

        const name = e.target.name;
        setFormData(formData => ({...formData, [name]: e.target.value}))
    }

    const handleAdd = (e) => {
        e.preventDefault();

        if(balance < Number(formData.price)){
            enqueueSnackbar("Price should be less than the balance", {
                variant: "warning",
            })
        }

        const lastId = expenseList.length > 0 ? expenseList[0].id : 0;
        setExpenseList( prev => [{...formData, id: lastId+1}, ...prev])

        setBalance(prev => prev - Number(formData.price));

        setFormData({
            title: "",
            category: "",
            price: "",
            date: ""
        })
        
        setIsOpen(false)
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const updatedItem = expenseList.map(item => {
            if(item.id == editId){
                const priceDiff = Number(item.price) - Number(formData.price);

                if(priceDiff < 0 && Math.abs(priceDiff) > balance){
                    enqueueSnackbar("price should not exceed wallet balance",{
                        variant: "warning",
                    })
                }

                setBalance(prev => prev + priceDiff);

                return {...formData, id: editId}
            }
            else{
                return item;
            }

        })
        
        setExpenseList(updatedItem);
        setIsOpen(false);

    }

    useEffect(() => {
        if(editId){
            const updatedItem = expenseList.find(item => item.id == editId)

            setFormData({
                title: updatedItem.title,
                category: updatedItem.category,
                price: updatedItem.price,
                date: updatedItem.date
            })
        }
    }, [editId])



    return(
        <div className={classes.formModal}>
            <h1>{editId? "Edit Expenses" : "Add Expenses"}</h1>
            <div className={classes.formWrapper}>
                <form onSubmit={editId? handleEdit : handleAdd }>
                    <input 
                        type='text'
                        name="title"
                        placeholder='Title'
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type='number'
                        name="price"
                        placeholder='Price'
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <select name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value='' disabled>Select category</option>
                        <option value='food'>Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="travel">Travel</option>
                    </select>
                    <input 
                        type='date'
                        name="date"
                        placeholder='dd/mm/yy'
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    <Button 
                        type="submit" 
                        text={editId? "Edit expense": "Add expense"} 
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