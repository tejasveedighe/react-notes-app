import React from "react";
import styles from "./Input.module.css";

type InputProps = {
	required?: boolean;
	autoFocus?: boolean;
	placeholder: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
};

function Input(props: InputProps) {
	return <input className={styles.input} {...props} />;
}

export default Input;
