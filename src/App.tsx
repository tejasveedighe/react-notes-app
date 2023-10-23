import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import { auth } from "./firebase/firebase";
import AddNote from "./pages/add-note/AddNote";
import { Auth } from "./pages/auth/Auth";
import Notes from "./pages/home-page/Notes";
import Note from "./pages/note/Note";
import { setUser } from "./redux/userSlice/userSlice";

export default function App() {
	const [hasSignedIn, setHasSignedIn] = useState<boolean>(false);
	const dispatch = useDispatch();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setHasSignedIn(true);
				dispatch(setUser(user));
			} else {
				setHasSignedIn(false);
				dispatch(setUser({}));
			}
		});
	}, [dispatch]);
	return (
		<>
			<Routes>
				{hasSignedIn ? (
					<Route element={<Layout />}>
						<Route index path="/" element={<Notes />} />
						<Route path="/note/:id" element={<Note />} />
						<Route path="/add-note" element={<AddNote />} />
					</Route>
				) : (
					<Route path="/" element={<Auth />} />
				)}
			</Routes>
			<ToastContainer />
		</>
	);
}
