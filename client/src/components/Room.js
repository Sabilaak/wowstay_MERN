import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function Room({room,  fromdate, todate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='row boxsw'>
      <div className='col-md-4'>
<img src= {room.imageurls[1]} className='image_s'/>
      </div>
      <div className='col-md-7 '>
<h3>{room.name}</h3>
<h5>Max Count :{room.maxcount}</h5>
<p> Phone Number :{room.phonenumber}</p>
<p>Type: {room.type}</p>
<div className='butoon' style={{float:'right'}}>
  {/* <Link  to={`/book/${room._id}`}> */}
  {(fromdate && todate) && (
    <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
  <Button className='btn btn-primary m-2'>Book Now</Button>
  </Link>
  )}
  
  <button className='btn btn-primary'  onClick={handleShow}>Show Details</button>
</div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel>
      {room.imageurls.map(url=>{
        return <Carousel.Item>
      
        <img className='d-block w-100 img_b' src={url} />
    
        <Carousel.Caption>
          <p>{room.Description}</p>
        </Carousel.Caption>
      </Carousel.Item>
        })}
     
    </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Room;
