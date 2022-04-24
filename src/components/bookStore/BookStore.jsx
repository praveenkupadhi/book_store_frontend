import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
	bookDataFetch,
	cartDataFetchRequest,
	cartDataFetchSuccess,
} from "../redux/actions";
import { SearchBook } from "./SearchBook";

export const BookStore = () => {
	const filterData = useSelector((store) => store.filterData);
	const loading = useSelector((store) => store.loading);
	const dispatch = useDispatch();
	const [cookies, setCookies] = useCookies("");
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(bookDataFetch());
	}, [dispatch]);

	const handleClick = (e) => {
		if (cookies.loginToken !== undefined) {
			axios
				.post("http://localhost:3001/cartUpdate", {
					user_id: jwtDecode(cookies.loginToken).user._id,
					book_id: e.target.id,
				})
				.then(() => {
					alert("added to cart");
				})
				.catch((error) => {
					if (error.message.split(" ").pop() !== "200") {
						alert("already added to cart");
					}
				});
		}
		if (cookies.loginToken === undefined) {
			dispatch(cartDataFetchRequest());
			dispatch(cartDataFetchSuccess([]));
			alert("login is required");
			navigate("/login");
		}
	};

	return (
		<>
			<SearchBook />
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<table>
					<thead>
						<tr>
							<th>Book Name</th>
							<th>Author</th>
							<th>Original Price</th>
							<th>Discount</th>
							<th>Final Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{filterData.length === 0 ? (
							<tr>
								<h3>No Data Found</h3>
							</tr>
						) : (
							filterData.map((book) => {
								return (
									<tr key={book._id}>
										<td>{book.name}</td>
										<td>{book.author}</td>
										<td>
											<del>₹{book.price}</del>
										</td>
										<td>{book.discount}%</td>
										<td>₹{book.finalPrice}</td>
										<td>
											<button id={book._id} onClick={handleClick}>
												Add to cart
											</button>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			)}
		</>
	);
};
