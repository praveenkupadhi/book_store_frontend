import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cartDataFetchRequest, cartDataFetchSuccess } from "../redux/actions";

export const Checkout = () => {
	const [cookies, setCookies] = useCookies("");
	const cartData = useSelector((store) => store.cartData);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let totalPrice = 0;
	for (let i = 0; i < cartData.length; i++) {
		totalPrice += +cartData[i].price;
	}

	useEffect(() => {
		if (cookies.loginToken !== undefined) {
			let books = [];
			axios
				.post("http://localhost:3001/cartFind", {
					user_id: jwtDecode(cookies.loginToken).user._id,
				})
				.then((res) => {
					books.push(res.data.book_ids);
					books.map((book) => {
						axios.post("http://localhost:3001", { _id: book }).then((res) => {
							dispatch(cartDataFetchRequest());
							dispatch(cartDataFetchSuccess(res.data));
						});
					});
				});
		}
		if (cookies.loginToken === undefined) {
			dispatch(cartDataFetchRequest());
			dispatch(cartDataFetchSuccess([]));
			alert("login is required");
			navigate("/login");
		}
	}, [cookies, dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = {
			address: e.target[0].value,
			contact: e.target[1].value,
			totalPrice: totalPrice,
			user_id: jwtDecode(cookies.loginToken).user._id,
		};
		axios
			.post("http://localhost:3001/checkout", data)
			.then(() => {
				alert("order successful");
				navigate("/");
			})
			.catch(() => navigate("/login"));
	};

	return (
		<>
			<h2>Welcome to checkout page</h2>
			<form onSubmit={handleSubmit}>
				<textarea placeholder="enter address details" required />
				<input type="number" placeholder="enter phone number" required />
				<input type="submit" value="Order now" />
			</form>
		</>
	);
};
