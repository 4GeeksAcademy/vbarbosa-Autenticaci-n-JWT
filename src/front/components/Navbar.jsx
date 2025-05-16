import { Link } from "react-router-dom";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpaceAwesome } from '@fortawesome/free-brands-svg-icons'

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
						<FontAwesomeIcon icon={faSpaceAwesome} size="xl" />
					</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-success m-2">Log In</button>
					</Link>
					<button className="btn btn-danger m-2">Sign Up</button>
				</div>
			</div>
		</nav>
	);
};