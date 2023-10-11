import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Notes from "./pages/home-page/Notes";
import Note from "./pages/note/Note";
import { Auth } from "./pages/auth/Auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import AddNote from "./pages/add-note/AddNote";

export default function App() {
	const [hasSignedIn, setHasSignedIn] = useState<boolean>(false);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setHasSignedIn(true);
			} else {
				setHasSignedIn(false);
			}
		});
	}, []);
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
		</>
	);
}
