import { Link } from "react-router-dom";

export function BottomWarning({label , bottomText , to}){

    return <div className="text-sm py-2 flex justify-center font-medium">
        <div>
            {label}
        </div>
        <Link className="text-sm px-1 underline cursor-pointer" to={to} >{bottomText}</Link>
    </div>
}