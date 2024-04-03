import axios from "axios"
import { useEffect, useState } from "react"

export function Balance({value}){

    // const [balance , setBalance] = useState("")

    // useEffect(function(){
    // axios.get("http://localhost:3000/api/v1/account/balance",{
    //         userName:"demo8@gmail.com"
    //     }) .then(function(res){
    //         setBalance(res.data.balance)
    //     })
       

    // },[])

    return <div className="flex">
        <div className="ml-4 font-semibold">
            your Balance: 
        </div>
        <div className="ml-2 font-semibold">
           Rs {value}
        </div>
    </div>
}