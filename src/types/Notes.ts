export type NoteType = {
	id?: string;
	title: string;
	note: string;
	date: Date;
	category: {
		title: string;
	};
	authorid: string;
};

export type NotesType = NoteType[];
