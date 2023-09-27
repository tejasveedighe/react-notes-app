import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Notes from "./pages/home-page/Notes";
import Note from "./pages/note/Note";
import { Auth } from "./pages/auth/Auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

export default function App() {
	const [hasSignedIn, setHasSignedIn] = useState<boolean>(false);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user);
				setHasSignedIn((prev) => !prev);
			} else {
				console.log("signed out");
			}
		});
	}, []);
	return (
		<Routes>
			{hasSignedIn ? (
				<Route path="/" element={<Auth />} />
			) : (
				<Route element={<Layout />}>
					<Route index path="/" element={<Notes />} />
					<Route path="/note/:id" element={<Note />} />
				</Route>
			)}
		</Routes>
	);
}
