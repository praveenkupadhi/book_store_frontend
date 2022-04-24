import { Route, Routes } from "react-router";
import { BookStore } from "../bookStore/BookStore";
import { Cart } from "../cart/Cart";
import { Checkout } from "../Checkout/Checkout";
import { Login } from "../userAuth/Login";
import { Signup } from "../userAuth/Signup";

export const RoutesMain = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<BookStore />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="*" element={<h3>404 Not Found</h3>} />
			</Routes>
		</>
	);
};
