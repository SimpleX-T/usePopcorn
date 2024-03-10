import { useEffect, useState } from "react";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import Search from "./Components/Search";
import NumResults from "./Components/NumResults";
import NavBar from "./Components/Navbar";
import MovieList from "./Components/MovieList";
import MovieDetails from "./Components/MovieDetails";
import WatchedMovieSummary from "./Components/WatchedMovieSummary";
import WatchedMovieList from "./Components/WatchedMovieList";
import Box from "./Components/Box";

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

function Main({ children }) {
	return <main className='main'>{children}</main>;
}

const _key = "6f86c2aa";

export default function App() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	function handleSetMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	useEffect(
		function () {
			async function fetchData() {
				try {
					setLoading(true);
					setError("");
					const res = await fetch(
						`https://omdbapi.com/?s=${query}&apikey=${_key}`
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
				<Search query={query} setQuery={setQuery} />
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
							apiKey={_key}
							onAddWatched={handleAddWatched}
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
