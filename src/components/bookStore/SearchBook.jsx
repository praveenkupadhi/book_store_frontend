import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookDataSearchRequest, bookDataSearchSuccess } from "../redux/actions";

export const SearchBook = () => {
	const filterData = useSelector((store) => store.filterData);
	const dispatch = useDispatch();

	useEffect(() => {}, [filterData]);

	const handleChange = (e) => {
		dispatch(bookDataSearchRequest());
		dispatch(bookDataSearchSuccess(e.target.value));
	};

	return (
		<>
			<input type="text" placeholder="Search Books" onChange={handleChange} />
		</>
	);
};
