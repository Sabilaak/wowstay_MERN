import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
function Register() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()
  const [success, setsuccess] = useState();
  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword
      };
      try {
        setloading(true);
        const result = await axios.post('/api/users/register', user).data;
        setloading(false)
        setsuccess(true)
        setname('')
        setemail('')
        setpassword('')
        setcpassword('')

      } catch (error) {
        setloading(false)
        seterror(true)
        console.log(error)
      }
      window.location.href = '/login'
    }
    else {
      alert("password not matched")
    }
  }
  return (
    <div>
      {loading && (<Loader />)}
      {error && (<Error />)}
      <div class="container m-4" style={{ backgroundColor: 'beige', width: '600px' }}>
        {success && (<Success message='Registration success' />)}
        <div className='row d-flex justify-content-center'>
          <div className='col-md-6 '>
            <h2>Registration Form</h2>
             <div class="form-group">
              <label for="firstname">First Name</label>
              <input type="text" class="form-control" name="firstname"
                value={name} onChange={(e) => { setname(e.target.value) }} />
            </div>
            <div class="form-group">
              <label for="Email1">Email address</label>
              <input type="email" class="form-control" name="email"
                value={email} onChange={(e) => { setemail(e.target.value) }} />
            </div>
            <div class="form-group">
              <label for="Password">Password</label>
              <input type="password" class="form-control" name="password"
                value={password} onChange={(e) => { setpassword(e.target.value) }} />
            </div>
            <div class="form-group">
              <label for="ConfirmPassword">Confirm Password</label>
              <input type="password" class="form-control" name="cpassword"
                value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
            </div>
            <button class="btn btn-primary mt-2" name="create" onClick={register}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
