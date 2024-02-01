import React, { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
	children: ReactNode;
	onClick?: () => void;
	type?: "secondary" | "disabled" | "" | "submit" | "icon";
	disabled?: boolean;
}
const Button = ({
	children,
	onClick,
	type = "",
	disabled = false,
}: ButtonProps) => {
	return (
		<button
			className={`btn ${type} ${disabled && "disabled"}`}
			disabled={disabled}
			onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
