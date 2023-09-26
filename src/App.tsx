import classNames from "classnames";
import styles from "./App.module.css";

export default function App() {
	return (
		<div className={classNames(styles.parent, "border-8")}>
			<header className="text-3xl font-bold text-center text-cyan-400">
				Notes App
			</header>
			<div className="notes mt-12 flex gap-2">
				<div className={styles.note}>Some hsdasdasdasdasdasdasdasdsdlnote</div>
				<div className={styles.note}>Some note</div>
				<div className={styles.note}>Some note</div>
			</div>
		</div>
	);
}
