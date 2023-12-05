import React, { useState } from 'react';
// import history from './History';


export const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Account Login seccessfully", "success")
            window.location.href = '/'
            
        } else {
            props.showAlert("invalid Credentials","Danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="exampleInputPassword1" required />
                        <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
                    </div>

                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>

        </>
    )
}
