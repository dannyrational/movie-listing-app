// Trending Movies
const apiURL = 'https://api.themoviedb.org/3/trending/all/week?api_key=123cbd0c291165ccb63a6a24a9499b36&page=1'

// Search
const searchAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=123cbd0c291165ccb63a6a24a9499b36&query='

// Movies Posters
const imgPATH = 'https://image.tmdb.org/t/p/w1280'
const nullImg = '../assets/images/null_img.svg'


const moviesDiv = document.querySelector('.movies');
const form = document.querySelector('form');
const search = document.querySelector('.search');
const trending = document.querySelector('.trending');


function getMovies(url) {
    fetch(url)
        .then(resp => resp.json())
        .then(data => displayMovies(data.results) + console.log(data))
}
getMovies(apiURL)

function displayMovies(movies) {
    moviesDiv.innerHTML = '';

    movies.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('movie');
        div.innerHTML = `
        <div class="poster_title">
        <img src="${movie.poster_path === null ? nullImg : imgPATH + movie.poster_path}" alt="" class="movie-poster">        
        <div class="details">
            <h2 class="title">${movie.title ? movie.title : movie.name}</h2>
            <p class="rate">Rating: <span class="rating">${movie.vote_average}</span></p>
            <p class="release-date">Release Date: <span class="date">${movie.release_date ? movie.release_date : movie.first_air_date}</span></p>
        </div>
        </div>
        <p class="overview">${movie.overview}</p>
        `;

        moviesDiv.appendChild(div);
    })
};


// Search Function
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchVal = search.value;

    if (searchVal) {
        getMovies(searchAPI + searchVal);
        search.value = '';
    }
})

// Trending
trending.addEventListener('click', (e) => {
    e.preventDefault();
    getMovies(apiURL);
})