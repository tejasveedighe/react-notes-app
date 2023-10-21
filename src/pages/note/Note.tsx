import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { NoteType } from "../../types/Notes";

export default function Note() {
	const { id } = useParams();
	const [note, setNote] = useState<NoteType>();
	useEffect(() => {
		const getDocument = async () => {
			if (id) {
				const docRef = doc(db, "notes", id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					console.log(docSnap.data());
					const data = docSnap.data();

					setNote({
						id: id,
						title: data.title,
						note: data.note,
						date: data.date,
						category: {
							title: data.category.title,
						},
						authorid: data.uid,
					});
				} else {
					console.log("not exitst");
				}
			}
		};
		getDocument();
	}, [id]);

	return (
		<div>
			<h1>{note?.title}</h1>
			<textarea value={note?.note}></textarea>
		</div>
	);
}
