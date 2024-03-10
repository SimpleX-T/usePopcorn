import { useEffect, useState } from "react";
import StarRating from "./StarRating";

// const tempMovieData = [
// 	{
// 		imdbID: "tt1375666",
// 		Title: "Inception",
// 		Year: "2010",
// 		Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
// 	},
// 	{
// 		imdbID: "tt0133093",
// 		Title: "The Matrix",
// 		Year: "1999",
// 		Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
// 	},
// 	{
// 		imdbID: "tt6751668",
// 		Title: "Parasite",
// 		Year: "2019",
// 		Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
// 	},
// ];

// const tempWatchedData = [
// 	{
// 		imdbID: "tt1375666",
// 		Title: "Inception",
// 		Year: "2010",
// 		Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
// 		runtime: 148,
// 		imdbRating: 8.8,
// 		userRating: 10,
// 	},
// 	{
// 		imdbID: "tt0088763",
// 		Title: "Back to the Future",
// 		Year: "1985",
// 		Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
// 		runtime: 116,
// 		imdbRating: 8.5,
// 		userRating: 9,
// 	},
// ];

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Search({ query, setQuery }) {
	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}

function Logo() {
	return (
		<div className='logo'>
			<span role='img'>🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function NumResults({ movies }) {
	return (
		<p className='num-results'>
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function NavBar({ children }) {
	return (
		<nav className='nav-bar'>
			<Logo />
			{children}
		</nav>
	);
}

function Movie({ movie, onSelectMovie }) {
	return (
		<li onClick={() => onSelectMovie(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

function MovieDetails({ selectedId, onClose }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

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

	useEffect(
		function () {
			async function fetchSelectedMovie() {
				setIsLoading(true);
				setError("");
				try {
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${_key}&i=${selectedId}`
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
		[selectedId]
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
								defaultRating={Math.round(imdbRating)}
							/>
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

function MovieList({ movies, onSelectMovie }) {
	return (
		<ul className='list list-movies'>
			{movies.map((movie) => (
				<Movie
					movie={movie}
					key={movie.imdbID}
					onSelectMovie={onSelectMovie}
				/>
			))}
		</ul>
	);
}

// function ListBox({ children }) {
// 	const [isOpen1, setIsOpen1] = useState(true);
// 	return (
// 		<div className='box'>
// 			<button
// 				className='btn-toggle'
// 				onClick={() => setIsOpen1((open) => !open)}>
// 				{isOpen1 ? "–" : "+"}
// 			</button>
// 			{isOpen1 && children}
// 		</div>
// 	);
// }

function WatchedMovieSummary({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
	return (
		<div className='summary'>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMovie({ movie }) {
	return (
		<li>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
			</div>
		</li>
	);
}

function WatchedMovieList({ watched }) {
	return (
		<ul className={`list`}>
			{watched.map((movie) => (
				<WatchedMovie movie={movie} key={movie.imdbID} />
			))}
		</ul>
	);
}

function Box({ children, className }) {
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

function Main({ children }) {
	return <main className='main'>{children}</main>;
}

function Loader() {
	return <p className='loader'>Loading...</p>;
}

function ErrorMessage({ message }) {
	return (
		<p className='error'>
			<span>📛</span> {message}
		</p>
	);
}

const _key = "6f86c2aa";

export default function App() {
	// const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	let query = "inception";

	function handleSetMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	useEffect(
		function () {
			async function fetchData() {
				try {
					setLoading(true);
					setError("");
					const res = await fetch(
						`http://omdbapi.com/?s=${query}&apikey=${_key}`
					);

					if (!res.ok)
						throw new Error(
							"Something went wrong while fetching data"
						);

					const data = await res.json();

					if (data.Response === "False")
						throw new Error("movie not found!");

					setMovies(data.Search);
				} catch (err) {
					setError(err.message);
					console.error(err.message);
				} finally {
					setLoading(false);
				}
			}

			if (query.length < 3) {
				setMovies([]);
				setError("");
				return;
			}
			fetchData();
		},
		[query]
	);

	return (
		<>
			<NavBar>
				<Search
					query={query}
					// setQuery={setQuery}
				/>
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{!loading && !error && (
						<MovieList
							movies={movies}
							onSelectMovie={handleSetMovie}
						/>
					)}
					{loading && <Loader />}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box className='watched'>
					{selectedId ? (
						<MovieDetails
							onClose={handleCloseMovie}
							selectedId={selectedId}
						/>
					) : (
						<>
							<WatchedMovieSummary watched={watched} />
							<WatchedMovieList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
