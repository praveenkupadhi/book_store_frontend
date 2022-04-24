import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

export const Login = () => {
	const [cookies, setCookie] = useCookies("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/login", {
				email: e.target[0].value,
				password: e.target[1].value,
			})
			.then((res) => {
				setCookie("loginToken", res.data, { path: "/" });
				alert("login successful");
				navigate("/");
			})
			.catch((error) => {
				if (error.message.split(" ").pop() !== "200") {
					alert("either email or password is incorrect");
				}
			});
	};

	return (
		<>
			<h2>Welcome to login page</h2>
			<form onSubmit={handleSubmit}>
				<input type="email" placeholder="Enter email id" required />
				<input type="password" placeholder="Enter password" required />
				<input type="submit" value="Login" />
			</form>
		</>
	);
};
