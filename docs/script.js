const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&api_key=c8c519bd0d0baf45eb026e4be9d0599c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI='https://api.themoviedb.org/3/search/movie?&api_key=c8c519bd0d0baf45eb026e4be9d0599c&query=';
const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
];

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');
const loadMoreBtn = document.getElementById('loadMore');
const genreContainer = document.querySelector('.genre');

let currentPage = 1;
let currentURL = APILINK;

returnMovies(APILINK);

function returnMovies(url){
    fetch(url)
        .then(res => res.json())
        .then(function(data){
            console.log(data.results);
            data.results.forEach(elements => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                const rating = document.createElement('div');
                rating.classList.add('rating');

                const year = document.createElement('div');
                year.classList.add('year');

                const overview = document.createElement('div');
                overview.classList.add('overview');

                const movieInfo = document.createElement('div');
                movieInfo.classList.add('movie-info');

                const ratingYear = document.createElement('div');
                ratingYear.classList.add('rating-year');

                ratingYear.appendChild(rating);
                ratingYear.appendChild(year);

                movieInfo.appendChild(ratingYear);
                movieInfo.appendChild(overview);


                title.innerHTML = `${elements.title}<br><a href="movies.html?id=${elements.id}&title=${elements.title}">Reviews</a>`;
                
                image.src = elements.poster_path
                    ? IMG_PATH + elements.poster_path
                    : 'https://raw.githubusercontent.com/kushwaha-aryan/storage/refs/heads/main/mohamed_hassan-cinema-4153289_1920.jpg';
                image.onerror = () => image.src = 'https://raw.githubusercontent.com/kushwaha-aryan/storage/refs/heads/main/mohamed_hassan-cinema-4153289_1920.jpg';

                rating.innerHTML = `⭐ ${elements.vote_average.toFixed(2)}`;

                year.innerHTML = elements.release_date?.split("-")[0];

                overview.innerHTML = elements.overview;

                div_card.appendChild(image);
                div_card.appendChild(title);
                div_card.appendChild(movieInfo);

                main.appendChild(div_card);
            });
        });
}

genres.forEach(g => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="genre" value="${g.id}"> ${g.name}`;
    genreContainer.appendChild(label);
});

genreContainer.addEventListener('change', () => {
    const selected = document.querySelector('input[name="genre"]:checked').value;

    currentURL = APILINK + `&with_genres=${selected}`;

    main.innerHTML = '';
    currentPage = 1;

    returnMovies(currentURL);
});

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    const nextURL = currentURL.replace(/&page=\d+/, `&page=${currentPage}`);
    currentURL = nextURL;
    returnMovies(nextURL);
});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    main.innerHTML = '';
    currentPage = 1;
    const searchItem=search.value;

    if(searchItem){
        currentURL = SEARCHAPI + searchItem + `&page=1`;
        main.innerHTML = '';
        currentPage = 1;
        returnMovies(currentURL);
        search.value="";
        // optional: deselect genre radios
        document.querySelectorAll('input[name="genre"]').forEach(r => r.checked = false);
    }
})



// Theme Toggle Script
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});