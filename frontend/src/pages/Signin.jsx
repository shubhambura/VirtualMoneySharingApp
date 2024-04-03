import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"

export function Signin(){
    

    return <div className="bg-slate-300 h-screen flex justify-center items-center">
    <div className="bg-white h-96 rounded-lg">
        <div className="w-80 text-center ">
            <Heading label="Sign In" />
            <SubHeading label="Enter your credentials to access your account" />
            <InputBox label="Email" />
            <InputBox label="Password" />
            <Button label={"Sign In"} />
            <BottomWarning label={"Don't have an account?"} bottomText={"Sign Up"} />
        </div>
    </div>
    
    </div>
}