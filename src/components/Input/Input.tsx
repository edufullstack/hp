import "./Input.css";
import React from "react";

interface InputTextProps {
	onChange: (() => void) | ((e: any) => void);
	placeholder?: string;
	value: string;
	id: string;
	name: string;
	label?: string;
	type?: "text" | "number";
}

const InputText = ({
	onChange,
	placeholder,
	value,
	id,
	name,
	label,
	type = "text",
}: InputTextProps) => {
	return (
		<div className="container_input">
			{label && <label htmlFor={name}>{label}</label>}
			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				id={id}
				name={name}
			/>
		</div>
	);
};

export default InputText;
