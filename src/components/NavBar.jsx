import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { cartDataFetchRequest, cartDataFetchSuccess } from "./redux/actions";

export const NavBar = () => {
	const [cookies, setCookie, removeCookie] = useCookies("");
	const dispatch = useDispatch();

	return (
		<>
			{cookies.loginToken !== undefined ? (
				<div className="title">
					Welcome, {jwtDecode(cookies.loginToken).user.first_name}
				</div>
			) : (
				<></>
			)}
			<div className="navbar">
				<NavLink to="/">Home</NavLink>
				{cookies.loginToken === undefined ? (
					<NavLink to="/login">Login</NavLink>
				) : (
					<NavLink
						to="/"
						onClick={() => {
							removeCookie("loginToken", cookies.loginToken, { path: "/" });
							dispatch(cartDataFetchRequest());
							dispatch(cartDataFetchSuccess([]));
						}}
					>
						Logout
					</NavLink>
				)}
				{cookies.loginToken === undefined ? (
					<NavLink to="/signup">Signup</NavLink>
				) : (
					<></>
				)}
				<NavLink to="/cart">Cart</NavLink>
			</div>
		</>
	);
};
