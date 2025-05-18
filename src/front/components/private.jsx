import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// store
import useGlobalReducer from "../hooks/useGlobalReducer"

//Services
import userServices from "../services/userServices"

export const Private = () => {

    const navigate = useNavigate()
    const {store, dispatch} = useGlobalReducer()

    const getUser = async () => {
        if (!localStorage.getItem('token')){
            return navigate('/login')
        }

        const data = await userServices.get_user(formData);
        if (data.success){ 
            dispatch({type: 'get_user', payload: data.user})
        } else{
            window.alert(data.error)
            navigate('/login')
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    const handleLogout = () => {
        dispatch({type: 'logout'})
        navigate('/')
    }

    return(
        <div className="container-fluid">
           <div className="card fs-1 bg-success p-4 text-center">
                Welcome to your private page
                <button className="btn btn-primary mt-2" onClick={handleLogout}>Log Out</button>
                <button className="btn btn-primary mt-2" onClick={handleLogout}>Home</button>
           </div>
        </div>
    )
}