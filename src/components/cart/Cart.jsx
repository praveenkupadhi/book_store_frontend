import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { cartDataFetchRequest, cartDataFetchSuccess } from "../redux/actions";

export const Cart = () => {
	const [cookies, setCookies] = useCookies("");
	const cartData = useSelector((store) => store.cartData);
	const loading = useSelector((store) => store.loading);
	const dispatch = useDispatch();
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
		}
	}, [cookies, dispatch]);
	return loading ? (
		<h3>Loading...</h3>
	) : (
		<>
			<table>
				<thead>
					<tr>
						<th>Book Name</th>
						<th>Author</th>
						<th>Price</th>
					</tr>
				</thead>
				{cartData.length === 0 ? (
					<h3>Empty Cart</h3>
				) : (
					cartData.map((cart) => {
						return (
							<tbody key={cart._id}>
								<tr>
									<td>{cart.name}</td>
									<td>{cart.author}</td>
									<td>{cart.price}</td>
								</tr>
							</tbody>
						);
					})
				)}
			</table>
			{cartData.length !== 0 ? <h2>Total Price: ₹{totalPrice}</h2> : <></>}
			{cartData.length !== 0 ? (
				<NavLink to="/checkout">
					<button>Checkout</button>
				</NavLink>
			) : (
				<></>
			)}
		</>
	);
};
