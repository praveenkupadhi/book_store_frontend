import {
	BOOK_DATA_FETCH_FAILURE,
	BOOK_DATA_FETCH_REQUEST,
	BOOK_DATA_FETCH_SUCCESS,
	BOOK_DATA_SEARCH_FAILURE,
	BOOK_DATA_SEARCH_REQUEST,
	BOOK_DATA_SEARCH_SUCCESS,
	CART_DATA_COUNT_FAILURE,
	CART_DATA_COUNT_REQUEST,
	CART_DATA_COUNT_SUCCESS,
	CART_DATA_FETCH_FAILURE,
	CART_DATA_FETCH_REQUEST,
	CART_DATA_FETCH_SUCCESS,
} from "./actionTypes";

const initState = {
	booksData: [],
	filterData: [],
	cartData: [],
	loading: true,
	error: "No error",
};

export const reducer = (store = initState, { type, payload }) => {
	switch (type) {
		case BOOK_DATA_FETCH_REQUEST:
			return { ...store, loading: true };
		case BOOK_DATA_FETCH_SUCCESS:
			return {
				...store,
				booksData: payload,
				filterData: payload,
				loading: false,
			};
		case BOOK_DATA_FETCH_FAILURE:
			return { ...store, error: payload, loading: false };
		case BOOK_DATA_SEARCH_REQUEST:
			return { ...store, loading: true };
		case BOOK_DATA_SEARCH_SUCCESS:
			return {
				...store,
				filterData: store.booksData.filter(
					(book) =>
						book.name.toLowerCase().includes(payload.toLowerCase()) ||
						book.author.toLowerCase().includes(payload.toLowerCase())
				),
				loading: false,
			};
		case BOOK_DATA_SEARCH_FAILURE:
			return { ...store, error: payload, loading: false };
		case CART_DATA_FETCH_REQUEST:
			return { ...store, loading: true };
		case CART_DATA_FETCH_SUCCESS:
			return {
				...store,
				cartData: payload.length === 0 ? payload : [...payload],
				loading: false,
			};
		case CART_DATA_FETCH_FAILURE:
			return { ...store, error: payload, loading: false };
		default:
			return store;
	}
};
