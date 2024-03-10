import { useState } from "react";

export default function Box({ children, className }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className={`box ${className}`}>
			<button
				className='btn-toggle'
				onClick={() => setIsOpen((isOpen) => !isOpen)}>
				{isOpen ? "–" : "+"}
			</button>
			{isOpen && <>{children}</>}
		</div>
	);
}
