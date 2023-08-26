import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios';
import Swal from 'sweetalert2';
const { TabPane } = Tabs;
function Admin() {
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = '/home'
        }

    }, [])

    return (
        <div className='mt-3 ml-3 mr-3 boxsw '>
            <h1 className='text-center'>Admin Page</h1>
            <div >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Bookings" key="1">
                        <Bookings />
                    </TabPane>
                    <TabPane tab="Rooms" key="2">
                        <Rooms />
                    </TabPane>
                    <TabPane tab="Add Room" key="3">
                        <Adroom/>
                    </TabPane>
                    <TabPane tab="Users" key="4">
                        <Users />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default Admin


export function Bookings() {
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = (await axios.get('/api/bookings/getallbookings')).data
                setbookings(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        fetchData();
    }, [])

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h4>Bookings</h4>
                {loading && (<Loader />)}
                <table className='table table-striped table-dark'>
                    <thead>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export function Rooms() {
    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = (await axios.get('/api/rooms/getallrooms')).data
                setrooms(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        fetchData();
    }, [])

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h4>Rooms</h4>
                {loading && (<Loader />)}
                <table className='table table-striped table-dark'>
                    <thead>
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per day</th>
                            <th>Max count</th>
                            <th>Phone number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.phonenumber}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export function Users() {
    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = (await axios.get('/api/users/getallusers')).data
                setusers(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        fetchData();
    }, [])
    return (
        <div className='row'>
            <div className='col-md-12'>
                <h4>Users<br />
                    <table className='table table-striped table-dark mt-4' style={{ fontSize: '15px' }}>
                        <thead>
                            <tr>
                                <th>UserId</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && (users.map(user => {
                                return <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                </tr>
                            }))}
                        </tbody>
                    </table>
                </h4>
            </div>
        </div>
    )
}



export  function Adroom() {

const [name,setname] = useState('')
const [rentperday,setrentperday] = useState('')
const [maxcount,setmaxcount] = useState('')
const [description,setdescription] = useState('')
const [phonenumber,setphonenumber] = useState('')
const [type,settype] = useState('')
const [imageurl1,setimageurl1] = useState('')
const [imageurl2,setimageurl2] = useState('')
const [imageurl3,setimageurl3] = useState('')

async function addRoom(){
    const newroom = {
        name,
        rentperday,
        maxcount,
        description,
        phonenumber,
        type,
        imageurls:[imageurl1,imageurl2,imageurl3]
    }
    try {
       const result = await axios.post('/api/rooms/addroom' , newroom)
       Swal.fire('Congratulations','Your Room Added Successfully','timer: 1500')
       setTimeout(function(){
           window.location.href='/home'
        }, 3000);
   
       console.log(result)
    } catch (error) {
      console.log(error)  
    }
}
  return (
    <div className='row-container'>
 <div className='row'>
      <div className='col-md-5'>
<input type='text' className='form-control' placeholder='room name'
value={name} onChange={(e)=>{setname(e.target.value)}}
/>
<input type='text' className='form-control' placeholder='rent per day'
value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}
/>
<input type='text' className='form-control' placeholder='max count'
value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}
/>
<input type='text' className='form-control' placeholder='description'
value={description} onChange={(e)=>{setdescription(e.target.value)}}
/>
<input type='text' className='form-control' placeholder='phone number'
value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}
/>
      </div>
      <div className='col-md-5'>
      <input type='text' className='form-control' placeholder='type'
      value={type} onChange={(e)=>{settype(e.target.value)}}
      />
<input type='text' className='form-control' placeholder='image url 1'
value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}
/>
<input type='text' className='form-control' placeholder='image url 2'
value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}
/>
<input type='text' className='form-control' placeholder='image url 3'
value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}
/>
<div className='text-right mt-4'>
    <button className='btn btn-primary' onClick={addRoom}>Add Room</button>
</div>
      </div>
    </div>

    </div>
     )
}
