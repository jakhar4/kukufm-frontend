import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'


const Signup = (props) => {
  const {storeTokenInLS, userURL} = useAuth()
  const URL = `${userURL}signup`
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [user, setUser] = useState({firstName:'', lastName:'', email:'', password:''})

  const navigate = useNavigate()


  const onButtonClick = async (e) => {
    e.preventDefault();
    // Set initial error values to empty
    setErrorMsg('')
  
    // Check if the user has entered both fields correctly
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setErrorMsg('Please enter your first name')
      return
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setErrorMsg('Please enter your last name')
      return
    }
    if ('' === email) {
      setErrorMsg('Please enter your email')
      return
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorMsg('Please enter a valid email')
      return
    }
    if ('' === password) {
      setErrorMsg('Please enter a password')
      return
    }
    if (password.length < 7) {
      setErrorMsg('The password must be 8 characters or longer')
      return
    }
    // Authentication calls will be made here
    else{
      setUser({firstName, lastName, email, password})
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        // stored the token in localhost
        storeTokenInLS(res_data.token);
        navigate("/");
      } else {
        setErrorMsg(res_data.message);
      }
    } catch (error) {
      setErrorMsg(error)
      console.log("register ", error);
    }
    }
  }
  

  return (
    <div className={'container'}>
      <div className={'signup'}>
        <div>Signup</div>
      </div>
      <div className={'input_container'}>
        <div className="flex_row">
        <input
          value={firstName}
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
          className={'input1'}
        />
        <input
          value={lastName}
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
          className={'input1'}
        />
        </div>
      </div>
      <div className={'input_container'}>
        <input
          value={email}
          placeholder="Enter email here"
          onChange={(e) => setEmail(e.target.value)}
          className={'input'}
        />
      </div>
      <div className={'input_container'}>
        <input
          value={password}
          placeholder="Enter password here"
          onChange={(e) => setPassword(e.target.value)}
          className={'input'}
          />
      </div>
          <label className="error">{errorMsg}</label>
      <div className={'input_container'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
      </div>
    </div>
  )
}

export default Signup