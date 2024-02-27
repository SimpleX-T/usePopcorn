import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import StarRating from "./StarRating";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
		{/* <StarRating /> */}
	</React.StrictMode>
);