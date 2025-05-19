import { useEffect} from "react"
import { useNavigate } from "react-router-dom"

// store
import useGlobalReducer from "../hooks/useGlobalReducer"

//Services
import userServices from "../services/userServices"

export const Private = () => {

    const navigate = useNavigate()
    const {store, dispatch} = useGlobalReducer()

    // const getUser = async () => {

    //     if (!localStorage.getItem('token')){
    //         return navigate('/login')
    //     }

    //     const data = await userServices.get_user();

    //     if (data.success){ 
    //         dispatch({type: 'get_user', payload: data.user})
    //     } else{
    //         window.alert(data.error);
    //         navigate('/login');
    //     }
    // }

    // useEffect(()=>{
    //     getUser()
    // },[])

    useEffect(()=>{
        if (!localStorage.getItem('token')){
            return navigate('/login')
        }

        userServices.getUser().then(data=> {
            if (!data.success){ 
                return navigate('/login')
            }
            dispatch({type: 'get_user', payload: data.user})
        })
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
                        <div className="card-img-overlay justify-content-center">
                            <div className="mx-auto">
                                <button className="btn btn-primary mx-auto" onClick={handleLogout}>Go to home</button>
                            </div>
                            <button className="btn btn-primary mt-2" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}