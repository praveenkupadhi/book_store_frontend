import axios from "axios";
import {
	BOOK_DATA_FETCH_FAILURE,
	BOOK_DATA_FETCH_REQUEST,
	BOOK_DATA_FETCH_SUCCESS,
	BOOK_DATA_SEARCH_FAILURE,
	BOOK_DATA_SEARCH_REQUEST,
	BOOK_DATA_SEARCH_SUCCESS,
	CART_DATA_FETCH_FAILURE,
	CART_DATA_FETCH_REQUEST,
	CART_DATA_FETCH_SUCCESS,
} from "./actionTypes";

export const bookDataFetchRequest = () => ({
	type: BOOK_DATA_FETCH_REQUEST,
});

export const bookDataFetchSuccess = (booksData) => ({
	type: BOOK_DATA_FETCH_SUCCESS,
	payload: booksData,
});

export const bookDataFetchFailure = (message) => ({
	type: BOOK_DATA_FETCH_FAILURE,
	payload: message,
});

export const bookDataFetch = () => {
	return (dispatch) => {
		dispatch(bookDataFetchRequest());
		axios
			.get("http://localhost:3001/")
			.then((res) => {
				// console.log(res.data);
				dispatch(bookDataFetchSuccess(res.data));
			})
			.catch((error) => dispatch(bookDataFetchFailure(error)));
	};
};

export const bookDataSearchRequest = () => ({
	type: BOOK_DATA_SEARCH_REQUEST,
});

export const bookDataSearchSuccess = (searchInput) => ({
	type: BOOK_DATA_SEARCH_SUCCESS,
	payload: searchInput,
});

export const bookDataSearchFailure = (message) => ({
	type: BOOK_DATA_SEARCH_FAILURE,
	payload: message,
});

export const cartDataFetchRequest = () => ({
	type: CART_DATA_FETCH_REQUEST,
});

export const cartDataFetchSuccess = (cart) => ({
	type: CART_DATA_FETCH_SUCCESS,
	payload: cart,
});

export const cartDataFetchFailure = (message) => ({
	type: CART_DATA_FETCH_FAILURE,
	payload: message,
});
