import { useEffect} from "react"
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

        const data = await userServices.getUser();

        if (data.success){ 
            dispatch({type: 'get_user', payload: data.user})
        } else{
            window.alert(data.error);
            navigate('/login');
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
            <div className="row">
                <div className="col-12">
                    <div className="card bg-dark text-white">
                        <img src="https://live.staticflickr.com/2425/5852459673_d911210364_z.jpg" 
                        className="card-img" alt="..."/>
                        <div className="card-img-overlay d-flex">
                            <div className="ms-auto m-2">
                                <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}