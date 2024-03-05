import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

import StarRating from "./StarRating";

// function Test() {
// 	// const [movieRating, setMovieRating] = useState(0);
// 	return (
// 		<div>
// 			<StarRating
// 				color='blue'
// 				size={30}
// 				maxRating={7}
// 				// onSetRating={setMovieRating}
// 			/>
// 			<p>This movie was rated {movieRating} star(s)</p>
// 		</div>
// 	);
// }

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		{/* <App /> */}
		<StarRating maxRating={10} size={30} defaultRating={3} />
		<StarRating
			color={"red"}
			className={"test"}
			message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
		/>
		{/* <Test /> */}
	</React.StrictMode>
);
