export function InputBox({label , placeholder , onchange}){

    return <div>
        <div className="text-left py-2 px-4">
            <label className="text-sm mb-2 block font-medium ">{label}</label>
            <input onChange={onchange} type="text" placeholder={placeholder} className="border-2 h-8 w-full px-1"></input>
        </div>
    </div>
}