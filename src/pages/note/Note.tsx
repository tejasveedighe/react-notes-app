import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { TiTick } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { notify } from "../../helper";
import { NoteType } from "../../types/Notes";
import styles from "./Note.module.css";

export default function Note() {
	const { id } = useParams();
	const [uid, setUid] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [details, setDetails] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const navigate = useNavigate();
	const handleSubmit = useCallback(async () => {
		if (id) {
			try {
				const newNote: NoteType = {
					title: title,
					note: details,
					authorid: uid,
					category: {
						title: category,
					},
					date: new Date(),
				};
				await updateDoc(doc(db, "notes", id), newNote);
				notify("success", title);
			} catch (e) {
				notify("error", "Cannot Update Doc");
				console.log(e);
			}
		} else {
			notify("error", "Unknown Note ID");
		}
		navigate("/");
	}, [category, details, id, navigate, title, uid]);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUid(user.uid);
			} else {
				notify("error", "please login");
			}
		});
	}, []);
	useEffect(() => {
		const getDocument = async () => {
			if (id) {
				const docRef = doc(db, "notes", id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();

					setTitle(data.title);
					setDetails(data.note);
					setCategory(data.category.title);
				} else {
					notify("error", "Note Does not exists");
				}
			}
		};
		getDocument();
	}, [id]);
	return (
		<div className="min-h-full mt-5 relative">
			<div className={styles.inputsContainer}>
				<input
					required
					autoFocus
					className={styles.titleInput}
					placeholder="Title.."
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<input
					className={styles.categoryInput}
					placeholder="Category of Note"
					onChange={(e) => setCategory(e.target.value)}
					value={category}
				/>
				<textarea
					className={styles.textInput}
					placeholder="Notes.."
					onChange={(e) => setDetails(e.target.value)}
					value={details}
					rows={15}
				/>
			</div>
			<button
				onClick={handleSubmit}
				className="absolute bottom-3 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
			>
				<IconContext.Provider
					value={{
						size: "1.5em",
					}}
				>
					<TiTick />
				</IconContext.Provider>
			</button>
		</div>
	);
}
