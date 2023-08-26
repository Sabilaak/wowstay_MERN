import React,{useState} from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';


function Login() {
    const[email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [loading ,setloading] = useState(false)
    const [error , seterror] = useState()
   async function Loginform(){
        const user = {
            
            email,
            password
        
        }
          try {
            setloading(true)
        const result = (await axios.post('/api/users/login', user)).data
        setloading(false);
        localStorage.setItem('currentUser' , JSON.stringify(result));
        window.location.href='/home'
      } catch (error) {
        setloading(false);
        seterror(true)
      }
    }
  return (
    <div >
      {loading &&(<Loader/>)}
     <div class="container m-4" style={{backgroundColor:'beige',width:'600px'}}>
      {error && (<Error message='Invalid name or password'/>)}
        <div className='row d-flex '>
            <div className='col-md-6 '>
            <h2>Login Form</h2>
  <div class="form-group">
    <label for="Email1">Email address</label>
    <input type="email" class="form-control"  name="email"
    value={email} onChange={(e)=>{setemail(e.target.value)}}/>
  </div>
  <div class="form-group">
    <label for="Password">Password</label>
    <input type="password" class="form-control"  name="password"
    value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
  </div>
  
  <button class="btn btn-primary mt-2" onClick={Loginform} style={{float:'right'}}>Sign in</button>

</div>
            </div>
        </div>
	
    </div>
  )
}

export default Login
