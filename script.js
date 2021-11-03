'use strict';

const API_URL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6ab67c6d30bbaf41ac1f973b19016c95&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL =
	'https://api.themoviedb.org/3/search/movie?api_key=6ab67c6d30bbaf41ac1f973b19016c95&query="';

const overviewContainter = document.querySelector('.overview');
const searchBar = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const showMovies = function (movies) {
	main.innerHTML = '';

	movies.forEach((movie) => {
		const { title, poster_path, vote_average, overview } = movie;

		const movieEl = document.createElement('div');
		movieEl.classList.add('movie');
		movieEl.innerHTML = `
    <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
  `;

		main.appendChild(movieEl);
	});
};

const getClassByRate = function (vote) {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
};

const getMovies = async function (url) {
	const res = await fetch(url);
	const data = await res.json();
	console.log(data.results);
	showMovies(data.results);
};

getMovies(API_URL);

searchBar.addEventListener('submit', function (e) {
	e.preventDefault();

	const searchTerm = search.value;
	if (!searchTerm) return;

	getMovies(SEARCH_URL + searchTerm);

	search.value = '';
});
