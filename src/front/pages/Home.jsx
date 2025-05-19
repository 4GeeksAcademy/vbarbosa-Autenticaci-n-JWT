import React, { useEffect } from "react"
import { Link } from "react-router-dom";

// Hooks
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok){
				return "all is set"
			}

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="container-fluid m-4 text-center mt-5 align-content-center">

			<div className="row">
				<div className="col-12">
					<div className="card bg-dark text-white">
						<img src="https://images4.alphacoders.com/270/thumb-1920-27094.jpg" 
						className="card-img h-75 " alt="image"/>
						<div className="card-img-overlay d-flex bg_home">
							<Link to="/signup" className="mx-auto align-content-center">
								<button className="btn btn-danger" type="button">Sign Up</button>
							</Link>
							<p className="text-light fs-4 w-50 mx-auto align-content-center">Dear client,
								<br />
								If you have an account please <span className="text-primary">log in</span> in order to access your profile.
								<br />
								Otherwise, <span className="text-danger">sing up</span> first and proceed to log in.
							</p>
							<Link to="/login" className="mx-auto align-content-center">
								<button className="btn btn-primary " type="button">Log In</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}; 