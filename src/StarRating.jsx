import { useState } from "react";

const containerStyles = {
	display: "flex",
	alignItems: "center",
	gap: "16px",
};

const starContainerStyles = {
	display: "flex",
	flexWrap: "wrap",
};

export default function StarRating({
	maxRating = 5,
	color = "#fcc419",
	size = 48,
	className = "",
	message = [],
	defaultRating = 0,
	// onSetRating = {},
}) {
	const [rating, setRating] = useState(defaultRating);
	const [tempRating, setTempRating] = useState(0);

	const textStyle = {
		lineHeight: "1",
		margin: "0",
		color,
		fontSize: `${size / 1.5}px`,
	};

	function handleSetRating(rating) {
		setRating(rating);
		// onSetRating(rating);
	}

	return (
		<div style={containerStyles} className={className}>
			<div style={starContainerStyles}>
				{Array.from({ length: +maxRating }, (_, i) => (
					<Star
						key={i}
						onRate={() => handleSetRating(i + 1)}
						full={
							tempRating ? tempRating >= i + 1 : rating >= i + 1
						}
						onHoverIn={() => setTempRating(i + 1)}
						onHoverOut={() => setTempRating(0)}
						color={color}
						size={size}
					/>
				))}
			</div>
			<p style={textStyle}>
				{message.length === maxRating
					? message[
							tempRating ? tempRating - 1 : rating - 1
					  ]?.toLocaleUpperCase()
					: tempRating || rating || ""}
			</p>
		</div>
	);
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
	const starStyle = {
		width: `${size}px`,
		height: `${size}px`,
		display: "block",
		cursor: "pointer",
	};

	return (
		<span
			style={starStyle}
			onClick={onRate}
			onMouseEnter={onHoverIn}
			onMouseLeave={onHoverOut}>
			{full ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
					fill={color}
					stroke={color}>
					<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 20 20'
					stroke={color}>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={1}
						d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
					/>
				</svg>
			)}
		</span>
	);
}

// export const TextExpander = () => {
// 	return (
// 		<>
// 			<Todo className='box' expandedTextNum={20}>
// 				Lorem ipsum dolor sit amet consectetur adipisicing elit.
// 				Inventore mollitia pariatur excepturi sed ratione consequatur
// 				modi architecto nesciunt ad nihil, expedita reiciendis, eius
// 				illum officiis, aspernatur eos placeat. Eum officia a, dolorum
// 				nam dolores eaque vitae rerum libero dolor assumenda, est sunt
// 				quas dolorem doloribus debitis culpa ratione natus
// 				exercitationem
// 			</Todo>
// 			<Todo collapseBtnText='Collapse Text' expandBtnText='Show Text'>
// 				Lorem ipsum dolor sit amet consectetur adipisicing elit.
// 				Inventore mollitia pariatur excepturi sed ratione consequatur
// 				modi architecto nesciunt ad nihil, expedita reiciendis, eius
// 				illum officiis, aspernatur eos placeat. Eum officia a, dolorum
// 				nam dolores eaque vitae rerum libero dolor assumenda, est sunt
// 				quas dolorem doloribus debitis culpa ratione natus
// 				exercitationem!
// 			</Todo>
// 			<Todo buttonColor='#ff6622 ' expanded={true}>
// 				Lorem ipsum dolor sit amet consectetur adipisicing elit.
// 				Inventore mollitia pariatur excepturi sed ratione consequatur
// 				modi architecto nesciunt ad nihil, expedita reiciendis, eius
// 				illum officiis, aspernatur eos placeat. Eum officia a, dolorum
// 				nam dolores eaque vitae rerum libero dolor assumenda, est sunt
// 				quas dolorem doloribus debitis culpa ratione natus
// 				exercitationem
// 			</Todo>
// 		</>
// 	);
// };

// function Todo({
// 	className,
// 	collapseBtnText = "Show Less",
// 	expandBtnText = "Show More",
// 	buttonColor = "#1f09cd",
// 	children,
// 	expandedTextNum = 10,
// 	expanded = false,
// }) {
// 	const buttonStyles = {
// 		background: "none",
// 		border: "none",
// 		font: "inherit",
// 		color: buttonColor,
// 		cursor: "pointer",
// 	};
// 	const [isExpanded, setIsExpanded] = useState(expanded);

// 	const expandedText = isExpanded
// 		? children
// 		: children.split(" ").slice(0, expandedTextNum).join(" ") + "...";

// 	return (
// 		<div>
// 			<h1>{expandedText}</h1>
// 			<button
// 				style={buttonStyles}
// 				onClick={() => setIsExpanded((exp) => !exp)}>
// 				{isExpanded ? collapseBtnText : expandBtnText}
// 			</button>
// 		</div>
// 	);
// }
