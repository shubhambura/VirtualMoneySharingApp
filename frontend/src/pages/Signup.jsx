import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export function Signup(){
    const [firstName , setFirstName] = useState("")
    const [lastname , setLastName] = useState("")
    const [email , setEmail] = useState("")
    const [Password , setPassword] = useState("") 
    const navigate = useNavigate()

    return <div className="bg-slate-300 h-screen flex justify-center items-center">
    <div className="bg-white h-3/4 rounded-lg ">
    <div className="text-center w-80 ">
    <Heading label={"Sign up"} />
    <SubHeading label={"Enter you information to create an account"}/>
    <InputBox onchange={function(e){
        setFirstName(e.target.value)
    }} label={"First Name"} placeholder="John" />
    <InputBox onchange={function(e){
        setLastName(e.target.value)
    }} label={"Last Name"} placeholder="Doe" />
    <InputBox onchange={function(e){
        setEmail(e.target.value)
    }} label={"Email"} placeholder="abcd@gmail.com"/>
    <InputBox onchange={function(e){
        setPassword(e.target.value)
    }} label={"Password"} placeholder="123456"/>
    <Button onclick={async function(){
       const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
            firstName:firstName,
            lastName:lastname,
            userName:email,
            password:Password
        })
        localStorage.setItem("token" , res.data.token)
        navigate("/dashboard")
    }} label={"Sign up"} />
    <BottomWarning label={"Already have an account?"} bottomText={"Sign in"} to={"/signin"} />
    </div>
    </div>
    </div>
}