import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Notes from "./pages/home-page/Notes";
import Note from "./pages/note/Note";

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index path="/" element={<Notes />} />
				<Route path="/note/:id" element={<Note />} />
			</Route>
		</Routes>
	);
}
