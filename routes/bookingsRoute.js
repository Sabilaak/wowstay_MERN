const express = require("express");
const router = express.Router();
const Booking = require('../models/booking')
const Room = require('../models/room')
const moment = require('moment')
router.post("/bookroom", async(req, res) => {

    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totldays
    } = req.body
    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: moment(fromdate).format('DD-MM-YYYY'),
            todate: moment(todate).format('DD-MM-YYYY'),
            totalamount,
            totldays,
            transactionId: '1234'
        })
        const bokking = await newbooking.save()
        const roomtemp = await Room.findOne({_id : room._id})
       const roombook =  new Room()
       roombook.currentbookings.push({
        bookingid: bokking._id,
        fromdate: moment(fromdate).format('DD-MM-YYYY'),
        todate : moment(todate).format('DD-MM-YYYY'),
        userid :userid,
        status : bokking.status
       })

       console.log('roomff',roombook)
      await roomtemp.currentbookings.push({
            bookingid: bokking._id,
            fromdate: moment(fromdate).format('DD-MM-YYYY'),
            todate : moment(todate).format('DD-MM-YYYY'),
            userid :userid,
            status : bokking.status
        })
      
         
        console.log('rr',roomtemp.currentbookings
        );
       roombook.save()
         roomtemp.save()

        res.send('Room Booked sucessfully')

    } catch (error) {
return res.status(400).json({error}
    )};
});

router.post("/getbookingsbyuserid", async(req,res) => {
    const userid = req.body.userid

    try {
        const bokkings = (await Booking.find({userid :userid}))
        res.send(bokkings)
    } catch (error) {
        return res.status(400).json({error});
        
    }
})
router.post('/cancelbooking' ,async (req ,res) =>{
    const { bookingid , roomid} = req.body


    try {
       const bookingitem = await Booking.findOne({_id : bookingid}) 
       bookings.status = 'cancelled'
      await bookingitem.save()
       const room = await Room.findOne({_id : roomid})
       const bookings = room.currentbookings
       console.log('mmm',bookings)
       const temp = bookings.filter(booking =>booking.bokkingid.toString()!==bookingid)
       room.currentbookings = temp
       await room.save()
    } catch (error) {
        res.send('your booking cancelled')
    }
})


router.get('/getallbookings', async(req, res) =>{
try {
  const bookings = await Booking.find()  
  res.send(bookings)
} catch (error) {
    return res.status(400).json({ message: error});  
}
});
module.exports = router