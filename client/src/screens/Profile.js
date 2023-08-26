import React ,{useEffect, useState} from 'react'
import { Tabs } from 'antd';
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';

const { TabPane } = Tabs;
function Profile() {
  const user =JSON.parse(localStorage.getItem("currentUser"))
  useEffect(() => {
    if(!user){
      window.location.href='/login'
    }
  
    
  }, [])
  
  return (
    <div className='mt-3 ml-3'>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h2>My profile</h2>
          <br/>
          <h5>Name : {user.name}</h5>
          <h5>Email : {user.email}</h5>
          <h6>isAdmin : {user.isAdmin ? 'YES' : 'NO'}</h6>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings/>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Profile;



 export function MyBookings () {
  const user =JSON.parse(localStorage.getItem("currentUser"));
  const [bookings,setbookings] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()
  useEffect(() => {  
    const fetchData = async ()=>{
      try {
        setloading(true);
        const data = await axios.post('/api/bookings/getbookingsbyuserid',{userid : user._id});
        console.log(data);
        setbookings(data.data)
        setloading(false)
      } catch (error) {
        console.log(error)
        setloading(false)
        seterror(error)
      }
    }
    fetchData();
    }, [])
   
  function cancelBooking(bookingid , roomid){

try {
  setloading(true)
  const result =  ( axios.post('/api/bookings/cancelbooking' , {bookingid , roomid})).data
  console.log(result)
} catch (error) {
  console.log(error)
}
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
{loading && (<Loader/>)}
{bookings && (bookings.map((booking)=>{
 return  <div className='boxsw'>
    <h4>{booking.room}</h4>
<h6>BookingId :{booking._id}</h6>
<h6>CheckIn :{booking.fromdate}</h6>
<h6>Check Out :{booking.todate}</h6>
<h6>Amount :{booking.totalamount}</h6>
<h6>Status : {booking.status === 'booked' ? 'Confirmed' : ' Cancelled' }</h6>
<div className='text-right'>
  <button className='btn btn-outline-danger' style={{background:'red'}} onClick={()=>{cancelBooking(booking._id, booking.roomid)}}>Cancel Booking</button>
</div>
 </div>
}))}
        </div>
      </div>
    </div>
  )
}

