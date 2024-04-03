import {Appbar} from '../components/Appbar'
import { Balance } from '../components/Balance'
import {Users} from '../components/Users'

export function Dashboard(){

    return <div>
        <Appbar />
    <div className='pt-10'>
        <Balance value={"10,000"} />
    </div>
    <div className='pt-10'>
        <Users />
    </div>
    </div>
}