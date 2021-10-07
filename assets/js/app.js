const apiURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=123cbd0c291165ccb63a6a24a9499b36&page=1'

const searchAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=123cbd0c291165ccb63a6a24a9499b36&query='

const imgPATH = 'https://image.tmdb.org/t/p/w1280'

let moviesDiv = document.querySelector('.movies')
let form = document.querySelector('form')
let search = document.querySelector('.search')


// getMovies(apiURL)
// async function getMovies(url) {
//     const res = await fetch(url);
//     const data = await res.json();

//     displayMovies(data.results)
// }

function getMovies(url) {
    fetch(url)
        .then(resp => resp.json())
        .then(data => displayMovies(data.results))

}
getMovies(apiURL)

function displayMovies(movies) {
    moviesDiv.innerHTML = '';

    movies.forEach(movie => {
        const div = document.createElement('div');

        div.classList.add('movie');

        div.innerHTML = `
        <img src="${imgPATH + movie.poster_path}" alt="" class="movie-poster">        
        <div class="details">
            <h2 class="title">${movie.title}</h2>
            <p class="rate">Rating: <span class="rating">${movie.vote_average}</span></p>
            <p class="overview">${movie.overview}</p>
        </div>`;

        moviesDiv.appendChild(div);
    })
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // moviesDiv.innerHTML = '';

    const searchVal = search.value;

    if (searchVal) {
        getMovies(searchAPI + searchVal);
        search.value = '';
    }
})