import React, { useState } from 'react'

const RegisterContent = props => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [retVal, setRetVal] = useState('');

    async function submitHandler(e) {
        e.preventDefault();

        const user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
        }

        const response = await fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const returnData = await response.json();
        console.log(returnData);


        setAlert(alert => true);
        if (returnData.message == null) {
            setRetVal(retVal => 'Registered');
        } else {
            setRetVal(retVal => returnData.message);
        }

        // Make the alert disappear after 1.5 seconds
        setTimeout(() => {
            setAlert(alert => false);
        }, 1500);
    } 

    return (
        <>
            { alert &&
                <div className="alert-box">
                    <p className="alert">{retVal}</p>
                </div>
            }

            <div className="register-content">
                <div className="register-container">
                    <form action="" onSubmit={submitHandler}>
                        <label>First Name</label>
                        <div>
                            <input type="text" placeholder='First Name' onChange={e=>setFirstName(e.target.value)}/>
                        </div>
                                    
                        <label>Last Name</label>
                        <div>
                            <input type="text" placeholder='Last Name' onChange={e=>setLastName(e.target.value)}/>
                        </div>

                        <label>Username</label>
                        <div>
                            <input type="text" placeholder='Username' onChange={e=>setUsername(e.target.value)}/>
                        </div>
                                    
                        <label>Password</label>
                        <div>
                            <input type="text" placeholder='Password' className="password-text" onChange={e=>setPassword(e.target.value)}/>
                        </div>
                        <button type='submit'>Submit</button>
                    </form> 
                </div>
            </div>


        </>
    )
}
export default RegisterContent;

