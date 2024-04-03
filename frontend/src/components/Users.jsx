import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Users(){
    const [users , setUsers] = useState([])
    const[filter , setFilter]  = useState("")
    

    useEffect(function(){
        
     axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
      .then(function(res){
         setUsers(res.data.users)
        
      })
    },[filter])


    return <div className="mx-4 ">
        <div className="pb-4 ">
            Users
        </div>
        <div className="border">
        <input onChange={function(e){
            setFilter(e.target.value)
        }} className="h-10 w-full p-2" type="text" placeholder="Search Users..." />
        </div>
        <div>
            {users.map(function(user){
                return <User user={user} />
            })}
        </div>
    </div>
}

function User({user}){
    const navigate = useNavigate()

    return <div className="flex justify-between mt-2 ">
        <div className="flex items-center">
        <div className="rounded-full bg-slate-200 h-12 w-12 flex justify-center ">
            <div className="flex items-center text-xl font-semibold">
                {user.firstName[0]}
            </div>
        </div>
        <div className="flex items-center px-2 font-semibold ">
            {user.firstName} {user.lastName}
        </div> 
        </div>
        <div>
            <Button onclick={function(e){
                navigate(`/send?id=${user._id}&name=${user.firstName}`)
            }} label={"Send Money"}/>
        </div>
    </div>
}