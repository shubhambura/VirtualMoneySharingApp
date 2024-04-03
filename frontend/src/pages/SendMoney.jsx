
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function SendMoney() {

    const [amount , setAmount] = useState("")
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name")
    const id = searchParams.get("id")

    return <div className="flex justify-center items-center h-screen ">
    <div className=" w-96 h-80 flex flex-col p-6 shadow-2xl border">
        <h1 className="text-3xl font-bold text-center">Send Money</h1>
    
    <div className=" flex mt-4 ">
        <div className=" bg-slate-300 rounded-full h-14 w-14 flex justify-center">
            <div className="font-semibold justify-center flex items-center">
           {name[0].toUpperCase()}
            </div>
        </div>
        <div className="flex items-center font-semibold ml-2 text-lg">
            <h4>{name}</h4>
        </div>
    </div>
    <div className="font-semibold ">
        <h4 className="mt-4">Amount (in Rs)</h4>
        <input onChange={function(e){
            setAmount(e.target.value)
        }} type="text" className="border w-80 h-8 rounded-lg mt-2 pl-2" placeholder="Enter amount"></input>
        <button onClick={function(){
            axios.post("http://localhost:3000/api/v1/account/transfer",{
                to:id,
                amount:amount
            },{
                headers:{
                    Authorization:"Bearer "+ localStorage.getItem("token")
                }
            })
        }} className=" mt-4 w-full py-2 px-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" >Initiate Tranfer</button>
   
    </div>
    </div>
    </div>
}