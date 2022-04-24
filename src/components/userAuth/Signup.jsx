import axios from "axios";
import { useNavigate } from "react-router";

export const Signup = () => {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/signup", {
				first_name: e.target[0].value,
				last_name: e.target[1].value,
				email: e.target[2].value,
				password: e.target[3].value,
			})
			.then(() => {
				alert("signup successful");
				navigate("/login");
			})
			.catch((error) => {
				if (error.message.split(" ").pop() !== "200") {
					alert("email is already exists");
				}
			});
	};

	return (
		<>
			<h2>Welcome to signup page</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Enter first name" required />
				<input type="text" placeholder="Enter last name" required />
				<input type="email" placeholder="Enter email id" required />
				<input type="password" placeholder="Enter password" required />
				<input type="submit" value="Signup" />
			</form>
		</>
	);
};
