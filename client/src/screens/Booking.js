import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
function Booking() {
    const { roomid, fromdate, todate } = useParams();
    //  const firstdate = moment(fromdate, 'DD-MM-YYYY')
    //  const lastdate = moment(todate, 'DD-MM-YYYY')
    // // const firstdate = moment(fromdate.$d).format('LL');
    // const lastdate = moment(todate.$d).format('LL');
    const dateone = moment(fromdate).format('YYYY-MM-DD')
    const datetwo = moment(todate).format('YYYY-MM-DD')
    console.log(dateone)
    console.log(datetwo)
    // const firstdate = moment(fromdate, 'DD-MM-YYYY')
    // const lastdate = moment(todate, 'DD-MM-YYYY')

    let start_Date = moment(dateone);
    let end_Date = moment(datetwo);
    const totldays = end_Date.diff(start_Date, 'days') + 1;
    // const totldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1

    // console.log()
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const [room, setroom] = useState();
    //   const totalamount = room ? totldays * room.rentperday:0;
    const [totalamount, settotalamount] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const data = (await axios.post('/api/rooms/getroomid', { roomid: roomid })).data;
                settotalamount(data.rentperday * totldays)
                setroom(data);
                setloading(false);
            } catch (error) {
                seterror(true);
                setloading(false);
            }
        }
        fetchData();

    }, []);

    async function onToken(token) {
        console.log(token)
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totldays,
            token
        };
        try {
            const result = await axios.post('/api/bookings/bookroom', bookingDetails ,)
            
            Swal.fire('Congratulations','Your Room Booked Successfully','timer: 1500')
            setTimeout(function(){
                window.location.href='/bookings'
             }, 3000);
             
        } catch (error) {
             Swal.fire('Ooops','Something went wrong','error')
        }
    }

    return (
        <div>
            <div></div>
            {loading ? (<Loader />) : error ? (<Error />) : (
                <div className='row' style={{ justifyContent: 'center' }}>
                    <div className='col-md-5'>
                        <h3>{room.name}</h3>
                        <img src={room.imageurls[1]} className='img_b' />
                    </div>
                    <div className='col-md-5 p-4'>
                        <div >
                            <h3>Booking Details</h3>
                            <hr />
                            <b>
                                
                                 <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name }</p> 
                                  
                                <p> From Date :{fromdate}</p>
                                <p>To Date :{todate}</p>
                                <p>max Count: {room.maxcount}</p>
                            </b>
                        </div>
                        <div>
                            <h4>Amount</h4>
                            <hr />
                            <b>
                                <p>Total days :{totldays}</p>
                                <p>Rent per day : {room.rentperday}</p>
                                <p>Total Amount: {totalamount}</p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }}>
                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency='INR'
                                stripeKey="pk_test_51NghDESJwBn78nR3VrVmQWifD5G3S1YxA0jEyjF8a9gyWUqu36pBPGtLVmfGLBb3CZANMD2Pu2ij2L14o7rnjf2U00IiDzyuh9"
                            >
                                <button className='btn btn-primary'>Pay Now</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Booking
