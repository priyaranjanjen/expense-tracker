/* eslint-disable react/prop-types */
import classes from './showExpense.module.css';
import AddExpense from '../forms/expenseForm/expense';
import Pagination from '../pagination/pagination';


// icons
import { PiPizzaLight, PiGift, } from "react-icons/pi";
import { BsSuitcase2 } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import ModalWrapper from '../modal/modal';
// import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';


function ExpenseCard({item, handleDelete, handleEdit}){
    return(
        <div className={classes.card}>

            <div className={classes.first}>
                <div className={classes.icon}>
                    {item.category === "food" && <PiPizzaLight/>}
                    {item.category === "entertainment" && <PiGift/>}
                    {item.category === "travel" && <BsSuitcase2/>}

                </div>

                <div>
                <h4 className={`${classes.title} ${classes.capitalizeFirstLetter}`}> {item.title} </h4>
                    <span className={classes.date}> {item.date} </span>
                </div>
            </div>

            <div className={classes.first}>
                <span className={classes.price}> ₹{item.price} </span>

                <div className={classes.buttonWrapper}>

                    <button 
                        className={classes.closeButton} 
                        onClick={handleDelete}
                    >
                            <IoCloseCircleOutline/>
                    </button>

                    <button 
                        className={classes.editButton}
                        onClick={handleEdit}
                    >
                        <MdOutlineEdit/>
                    </button>

                </div>
            </div>
            
        </div>
    )  
}

export default function ShowExpenseList({title, expenseList, setExpenseList, balance, setBalance}){

    const [editId, setEditId] = useState(0);
    const [displayEditor, setDisplayEditor] = useState(false);

    const [currentTransactions, setCurrentTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const maxRecords = 3;
    const [totalPages, setTotalPages] = useState(0);


    const handleDelete = (id) => {
        const item = expenseList.find(item => item.id === id)
        const price = item.price;

        setBalance(prev => prev + Number(price));

        setExpenseList(prev => (
            prev.filter((item) => item.id != id)
        ))
    }

    const handleEdit = (id) => {
        setEditId(id);
        setDisplayEditor(true);
    }

    useEffect(() => {
        const startIndex = (currentPage - 1) * maxRecords;
        const endIndex = Math.min(currentPage * maxRecords, expenseList.length);
    
        setCurrentTransactions([...expenseList].slice(startIndex, endIndex));
        setTotalPages(Math.ceil(expenseList.length / maxRecords));
      }, [currentPage, expenseList]);
    
      // update page if all items on current page have been deleted
      useEffect(() => {
        if (totalPages < currentPage && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      }, [totalPages]);
    

    return(
        <div className={classes.cardWrapper}>
            <h2>{title}</h2>
            {
                expenseList.length > 0 ? 
                (
                    <>
                        <div className={classes.showCard}>
                            {currentTransactions.map((item) => (
                                <ExpenseCard 
                                    key={item.id}
                                    item={item}
                                    handleDelete={()=>handleDelete(item.id)}
                                    handleEdit={()=>handleEdit(item.id)}
                                />
                            ))}
                            <>
                                {totalPages > 1 && (
                                    <Pagination
                                    updatePage={setCurrentPage}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                />
                        )}
                            </>
                        </div>
                    </>
                    
                ) : (
                    <div className={classes.showCard}>
                        No Transactions!
                    </div>
                )
            }


            <ModalWrapper isOpen={displayEditor} setIsOpen={setDisplayEditor}>
                <AddExpense
                    setIsOpen={setDisplayEditor}
                    editId={editId}
                    expenseList={expenseList}
                    setExpenseList={setExpenseList}
                    balance={balance}
                    setBalance={setBalance}
                />
            </ModalWrapper>
        </div>
    )

}