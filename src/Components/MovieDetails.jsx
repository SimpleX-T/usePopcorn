import { useState, useEffect } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import StarRating from "../StarRating";

export default function MovieDetails({
	selectedId,
	onClose,
	apiKey,
	onAddWatched,
}) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [userRating, setUserRating] = useState(0);

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imbdID: selectedId,
			title,
			poster,
			imdbRating: Number(imdbRating),
			runtime: runtime ? Number(runtime.split(" ")[0]) : 0,
			userRating,
		};

		console.log(newWatchedMovie, Number(runtime.split(" ")[0]));

		onAddWatched(newWatchedMovie);
	}

	useEffect(
		function () {
			async function fetchSelectedMovie() {
				setIsLoading(true);
				setError("");
				try {
					const res = await fetch(
						`https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
					);

					if (!res.ok) throw new Error("couldn't fetch data");

					const data = await res.json();
					if (!data) throw new Error("Error loading movie!");
					setMovie(data);
				} catch (error) {
					setError(error.message);
				} finally {
					setIsLoading(false);
				}
			}

			fetchSelectedMovie();
		},
		[selectedId, apiKey]
	);

	return (
		<div className='details'>
			{!isLoading && !error && (
				<>
					<header>
						<button className='btn-back' onClick={onClose}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${title} movie`} />
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span> {imdbRating} IMDb rating
							</p>
						</div>
					</header>

					<section>
						<div className='rating'>
							<StarRating
								maxRating={10}
								size={24}
								defaultRating={imdbRating}
								onSetRating={setUserRating}
							/>
							<button className='btn-add' onClick={handleAdd}>
								+ Add to list
							</button>
						</div>

						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
			{isLoading && <Loader />}
			{error && <ErrorMessage message={error} />}
		</div>
	);
}
