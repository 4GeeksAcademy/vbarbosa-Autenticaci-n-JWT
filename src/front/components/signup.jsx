import { useState } from "react"
import { useNavigate } from "react-router-dom"

//Services
import userServices from "../services/userServices"

export const SignUp = () => {

    const navigate = useNavigate('/login')
        const [formData, setFormData] = useState({
            email: "",
            password: ""
        })
    
        const handleChange = e => {
            setFormData({
                ...formData, 
                [e.target.name]: e.target.value
            })
        }
    
        const handleSubmit = e => {
            e.preventDefault();
            userServices.signup(formData).then(data=> {
                if (data.success) {
                    navigate('/login')
                }
            })
        }

    return(
        <div className="alert alert-warning w-75 mx-auto">
            <form className="p-3" onSubmit={handleSubmit}>

                {/* <div className="mb-3">
                    <label htmlFor="InputName2" className="form-label fs-5">Email</label>
                    <input type="name" 
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    className="form-control" 
                    id="InputName2" 
                    aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div> */}

                <div className="mb-3">
                    <label htmlFor="InputEmail2" className="form-label fs-5">Email</label>
                    <input type="email" 
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    className="form-control" 
                    id="InputEmail2" 
                    aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="InputPassword2" className="form-label fs-5">Password</label>
                    <input type="password"
                    value={formData.password} 
                    name="password"
                    onChange={handleChange}
                    className="form-control" 
                    id="InputPassword2"/>
                </div>

                <button type="submit" className="btn btn-danger mt-2">Sign Up!</button>

            </form>
        </div>
        
    )
}