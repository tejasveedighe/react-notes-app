import { Menu, Transition } from "@headlessui/react";
import { collection, onSnapshot } from "firebase/firestore";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { NotesType } from "../../types/Notes";

export default function Notes() {
	const [notes, setNotes] = useState<NotesType>([]);
	const navigate = useNavigate();

	const handleAddNote = useCallback(() => {
		navigate("/add-note");
	}, [navigate]);

	const noteRef = collection(db, "notes");

	useEffect(() => {
		const unsubscribe = onSnapshot(noteRef, (querySnapshot) => {
			const notes = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					title: data.title,
					note: data.note,
					date: data.date,
					category: {
						title: data.title,
					},
					authorid: data.uid,
				};
			});
			setNotes(notes);
		});
		return () => unsubscribe();
	}, []);

	return (
		<div className="bg-white py-12 sm:py-32">
			<button onClick={handleAddNote} className="text-3xl absolute right-10">
				<BsPlusLg />
			</button>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl ">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Your Notes
					</h2>
				</div>
				<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{notes.map((post, index) => (
						<article
							key={index}
							className="flex max-w-xs flex-col items-start justify-between border border-yellow-500 p-2"
						>
							<div className="relative w-full flex items-center justify-between text-xs">
								<a className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
									{post.category.title}
								</a>
							</div>
							<div className="group relative">
								<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
									<Link to={`/note/${post.id}`}>
										<span className="absolute inset-0" />
										{post.title}
									</Link>
								</h3>
								<p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600 text-ellipsis w-100 break-words">
									{post.note}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
