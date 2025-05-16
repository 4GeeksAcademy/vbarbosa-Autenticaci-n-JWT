import { useState } from "react"
import { useNavigate } from "react-router-dom"

//Services
import userServices from "../services/userServices"

export const LogIn = () => {

    const navigate = useNavigate('/private')
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    // need to add here on key down to avoid being update while we write
    const handleChange = e => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        userServices.login(formData).then(data=> {
            if (data.success) {
                navigate
            }
        })
    }

    return(

        <div className="alert alert-info w-75 mx-auto">
            <form className="p-3" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="InputEmail1" className="form-label fs-5">Email</label>
                    <input type="email" 
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    className="form-control" 
                    id="InputEmail1" 
                    aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label fs-5">Password</label>
                    <input type="password"
                    value={formData.password} 
                    name="password"
                    onChange={handleChange}
                    className="form-control" 
                    id="InputPassword1"/>
                </div>

                <button type="submit" className="btn btn-primary mt-2">Log In</button>

            </form>          
        </div>
        
    )
}