import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { DatePicker, Space } from 'antd';
import 'antd/dist/reset.css';
import moment from 'moment'
const { RangePicker } = DatePicker;

const Homescreen = () => {  
const[rooms ,setrooms] = useState([])
const [loading ,setloading] = useState()
const [error , seterror] = useState()
const [fromdate,setFromdate] = useState();
const [todate,setTodate] = useState();
const [ searchkey , setsearchkey] =useState("");
const  [type ,settype] = useState("all")
useEffect(() => {  
const fetchData = async ()=>{
    try {
        setloading(true);
        const data = (await axios.get('/api/rooms/getallrooms')).data
setrooms(data);
setloading(false);
    } catch (error) {
        seterror(true);
        setloading(false);
    }
}
fetchData();
}, [])
 function Datefilter(dates){
    const from = moment(dates[0].$d).format('LL');
    const to = moment(dates[1].$d).format('LL');
    setFromdate(from);
    setTodate(to);
    
    // console.log(moment(dates[0].format('DD-MM-YYYY')))
    // console.log(moment(dates[1].format('DD-MM-YYYY')))
    // setFromdate((dates[0].format('DD-MM-YYYY')))
    // setTodate(moment(dates[1].format('DD-MM-YYYY')))
 }
 function filterBySearch(){
    
 }
  return (
    <div className='container'>
        <div className='row mt-5 '>
            <div className='col-md-3 mt-4 boxsw'>
            <RangePicker format='DD-MM-YYYY' onChange={Datefilter} />
            </div>
            {/* <div className='col-md-3  mt-4 boxsw'>
                <input type='text' className='form-control' placeholder='Search Room..'
                value={searchkey} onChange={(e)=>{searchkey(e.target.value)}} onKeyUp={filterBySearch}
                />
            </div>
            <div className='col-md-3 mt-4 boxsw '>
            <select className='form-control'>
                <option value="all">All</option>
                <option value="delux">Delux</option>
                <option value="nondelux">Non-Delux</option>
            </select>
            </div> */}
           
        </div>
        <div className='row justify-content-center' >
        {loading ? (
<Loader/>
) : rooms.length>0 ? (
    rooms.map((room)=>{
        return <div className='col-md-9 mt-3'>
            {/* <h1>{room.name}</h1> */}
            <Room room= {room} fromdate={fromdate} todate={todate} />
           </div>;     
        })
) :
 (<Error/>)
}

        </div>
    </div>
  )
}

export default Homescreen