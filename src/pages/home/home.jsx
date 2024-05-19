/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Card from '../../components/expense card/card';
import PieChartComponent from '../../components/piechart/piechart';
import classes from './home.module.css';
import AddBalance from '../../components/forms/balanceForm/addBalance';
import ModalWrapper from '../../components/modal/modal';
import AddExpense from '../../components/forms/expenseForm/expense';
import BarChartComponent from '../../components/barChart/barchart';
import ShowExpenseList from '../../components/showExpense/showExpense';

export default function Home(){
    const[balance, setBalance] = useState(0);

    const[expense, setExpense] = useState(0);
    const[expenseList, setExpenseList] = useState([]);

    const[isOpenBalance, setIsOpenBalance] = useState(false);
    const[isOpenExpense, setIsOpenExpense] = useState(false);

    const [isMounted, setIsMounted] = useState(false);

    const [categorySpends, setCategorySpends] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
      });
      const [categoryCount, setCategoryCount] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
      });


    useEffect(() => {
        let localBalance = localStorage.getItem("balance");

        if(localBalance){
            setBalance(Number(localBalance));
        }else{
            setBalance(5000);
            localStorage.setItem("balance", 5000);
        }

        try {
            const items = JSON.parse(localStorage.getItem("expensesList"));
            setExpenseList(items || []);
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            setExpenseList([]);
        }


        setIsMounted(true);
    }, [])

    useEffect(()=>{
        if(expenseList.length > 0 || isMounted){
            localStorage.setItem("expensesList", JSON.stringify(expenseList));
        }

        if(expenseList.length > 0){
            setExpense(expenseList.reduce((accumulator, currentvalue) => accumulator + Number(currentvalue.price), 0));
        }else{
            setExpense(0);
        }

        let foodSpend = 0, entertainmentSpend = 0, travelSpend = 0;
        let foodCount = 0, entertainmentCount = 0, travelCount = 0;

        expenseList.map((item) => {
            if(item.category === "food"){
                foodSpend += Number(item.price);
                foodCount++;
            }
            if(item.category === "entertainment"){
                entertainmentSpend += Number(item.price);
                entertainmentCount++;
            }
            if(item.category === "travel"){
                travelSpend += Number(item.price);
                travelCount++;
            }
        })

        setCategorySpends({
            food: foodSpend,
            entertainment: entertainmentSpend,
            travel: travelSpend
        })

        setCategoryCount({
            food: foodCount,
            entertainment: entertainmentCount,
            travel: travelCount
        })

    },[expenseList])

    useEffect(()=>{
        isMounted && localStorage.setItem("balance", balance);
    }, [balance])

    return(
        <>
        <div className={classes.main}>
            <h1>Expense Tracker</h1>

            <div className={classes.cardWrapper}>
                <Card 
                    type="Wallet Balance" 
                    value={balance}
                    buttonText = "+ Add Income"
                    buttonStyle = "balance"
                    handlClick={() => setIsOpenBalance(true)}
                />
                <Card 
                    type="Expense" 
                    value={expense} 
                    buttonText = "+ Add Expense"
                    buttonStyle = "expense"  
                    handlClick={() => setIsOpenExpense(true)}

                />

                <PieChartComponent
                    data = {[
                        {name: "Food", value: categorySpends.food},
                        {name: "Entertainment", value: categorySpends.entertainment},
                        {name: "Travel", value: categorySpends.travel}
                    ]}
                />

            </div>

            <div className={classes.data}>
                <div>
                    <ShowExpenseList
                        title="Recent Transactions"
                        expenseList={expenseList}
                        setExpenseList={setExpenseList}
                        balance={balance}
                        setBalance={setBalance}
                    />
                </div>

                <div>
                    <BarChartComponent
                        data = {[
                            {name: "Food", value: categorySpends.food},
                            {name: "Entertainment", value: categorySpends.entertainment},
                            {name: "Travel", value: categorySpends.travel}
                        ]}
                    />
                </div>
            </div>

            {/* MODALS */}
            <ModalWrapper isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
                <AddBalance setIsOpen={setIsOpenBalance} setBalance={setBalance}/>
            </ModalWrapper>

            <ModalWrapper isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
                <AddExpense
                    setIsOpen={setIsOpenExpense}
                    expenseList={expenseList}
                    setExpenseList={setExpenseList}
                    balance={balance}
                    setBalance={setBalance}
                />
            </ModalWrapper>
        </div>
        </>
    )
}