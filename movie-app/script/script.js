const section = document.querySelector('.section');
const gallery = document.querySelector('.gallery');
const search = document.querySelector('#search');
const searchBtn = document.querySelector('.search__btn');
const searchClear = document.querySelector('.search__clear');
const logo = document.querySelector('.logo');
const language = document.querySelector('.language');

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0177ac7fe6b20dc668bda83741a865fe';

const cinema = {
    genres: {},
    language: '',
    movies: {},
}

const pagination = {
    currentPage:  {
        item: document.querySelector('.pagination__current'),
        value: -1,
    },
    firstPage: {
        item: document.querySelector('.pagination__first'),
        value: -1,
    },
    totalPages:  {
        item: document.querySelector('.pagination__total'),
        value: -1,
    },
    prevPage:  {
        item: document.querySelector('.pagination__prev'),
        value: -1,
    },
    nextPage:  {
        item: document.querySelector('.pagination__next'),
        value: -1,
    },
    moreFirst:  {
        item: document.querySelector('.pagination__item--first'),
    },
    moreLast:  {
        item: document.querySelector('.pagination__item--last'),
    },
}

const request = {
    typeSearch: 'discover',
    search: `popularity.desc`,
    searchPref: `sort_by=`,
    page: 1,
    language: '',
}

window.addEventListener('DOMContentLoaded', () => {
    main()
        .then()
        .catch((error) => console.error(error))
})

search.addEventListener('keydown', async (e)=>{
    if(e.keyCode === 13){
        if(search.value){
            setRequestOptions('search', search.value, 'query=', 1);
            await setRequest();
        }else{
            setRequestOptions('discover',`popularity.desc`, `sort_by=`, 1);
            await setRequest();
        }
    }
})

searchBtn.addEventListener('click', async (e)=>{
    if(search.value){
        setRequestOptions('search', search.value, 'query=', 1);
        await setRequest();
    }
    else{
        setRequestOptions('discover',`popularity.desc`, `sort_by=`, 1);
        await setRequest();
    }
    searchBtn.blur();
})

searchClear.addEventListener('click', async (e)=>{
    search.value = '';
    setRequestOptions('discover',`popularity.desc`, `sort_by=`, 1);
    await setRequest();
    searchClear.blur();
})

logo.addEventListener('click', async ()=>{
    setRequestOptions('discover', 'popularity.desc', 'sort_by=', 1);
    await setRequest();
    logo.blur();
})

pagination.currentPage.item.addEventListener('change', async ()=>{
    request.page = pagination.currentPage.item.value;
    await setRequest();
    pagination.nextPage.item.blur();
})

pagination.firstPage.item.addEventListener('click', async ()=>{
    request.page = 1;
    await setRequest();
    pagination.firstPage.item.blur();
})

pagination.totalPages.item.addEventListener('click', async ()=>{
    request.page = pagination.totalPages.value;
    await setRequest();
    pagination.totalPages.item.blur();
})

pagination.prevPage.item.addEventListener('click', async ()=>{
    request.page = pagination.prevPage.value;
    await setRequest();
    pagination.prevPage.item.blur();
})

pagination.nextPage.item.addEventListener('click', async ()=>{
    request.page = pagination.nextPage.value;
    await setRequest();
    pagination.nextPage.item.blur();
})

language.addEventListener('click', async (e)=>{
    setLanguage(e.target.id);
    await findGenres();
    await setRequest();
})

async function main() {
    await findLanguage();
    await findGenres();
    await setRequest();
}

async function findLanguage() {
    if(localStorage.getItem('lang')) {
        request.language = localStorage.getItem('lang');
    }
    else{
        request.language = document.documentElement.lang;
        localStorage.setItem('lang', request.language);
    }
    toggleLanguage(request.language);
}

async function findGenres(){
    const genres = await requestGenres();
    genres['genres'].forEach(item => genres[item.id] = item.name);
    cinema.genres = genres;
}

async function requestGenres() {
    let url = `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=${request.language}`;
    const res = await fetch(url);
    return await res.json();
}

async function setRequest(){
    await findMovies(request.typeSearch, `${request.searchPref}${request.search}`);
    await showMovies(cinema.movies, cinema.genres);
    setPagination(pagination.currentPage.value, pagination.totalPages.value);
}

async function findMovies(typeSearch, searchValue){
    const {movies, page, totalPages} =  await requestMovies(typeSearch, searchValue);
    cinema.movies = movies;
    pagination.currentPage.value = page;
    pagination.totalPages.value = totalPages;
}

async function requestMovies(typeSearch, searchValue) {
    const url = `${API_URL}/${typeSearch}/movie?${searchValue}&api_key=${API_KEY}&language=${request.language}&page=${request.page}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
        page: data.page,
        totalPages: data['total_pages']>500? 500 : data['total_pages'],
        movies: data['results'].map(item => {
            return {
                title: item.title,
                id: item.id,
                genre: item['genre_ids'],
                img: item['poster_path']?`https://image.tmdb.org/t/p/w300/${item['poster_path']}`:'./assets/img/ico/no_img.png',
                overview: item.overview,
                range: item['vote_average'],
                year: item['release_date']?item['release_date'].split('-')[0]:'?',
            }
        })
    }
}

async function findMovie(typeSearch, id){
    const movie = await requestMovie(typeSearch, id);
    showMovieFull(movie);
}

async function requestMovie(typeSearch, id){
    const url = `${API_URL}/movie/${id}?api_key=${API_KEY}&language=${request.language}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
        title: data.title,
        homepage: data.homepage,
        id: data.id,
        language: data['original_language'],
        tagline: data.tagline,
        productionCompanies: data['production_companies'],
        productionCountries: data['production_countries'],
        spokenLanguages: data['spoken_languages'],
        genre: data.genres,
        img: data['poster_path']?`https://image.tmdb.org/t/p/w300/${data['poster_path']}`:'./assets/img/ico/no_img.png',
        backdrop: data['backdrop_path']?`https://image.tmdb.org/t/p/w300/${data['backdrop_path']}`:'./assets/img/ico/no_img.png',
        overview: data.overview,
        range: data['vote_average'],
        year: data['release_date'] ? data['release_date'].split('-')[0] : '?',
    }
}


function toggleLanguage(lang){
    const switchLanguage = language.querySelectorAll('input[name="language"]');
    switchLanguage.forEach(item => {
        item.checked = item.value === lang;
    })
}

function setLanguage(language){
    localStorage.setItem('lang', language);
    request.language = language;
    toggleLanguage(language)
}

function setRequestOptions(typeSearch, search, searchPref, page){
    request.typeSearch = typeSearch;
    request.search = search;
    request.searchPref = searchPref;
    request.page = page;
}

function setPagination(current, total){
    pagination.currentPage.item.max = total;
    pagination.currentPage.item.value = current;

    pagination.prevPage.value = current - 1 > 0 ? current -1 : -1;
    pagination.firstPage.value = 1 < current - 1  ? 1 : -1;
    pagination.totalPages.value = total > current + 1 ? total : -1;
    
    if(current + 1 < total){
        pagination.nextPage.value = current + 1;
    }else if(current + 1 === total){
        pagination.nextPage.value = total;
    }else{
        pagination.nextPage.value = -1;
    }

    for(let key in pagination){
        if(pagination[key].value > 0){
            pagination[key].item.innerHTML = pagination[key].value;
            pagination[key].item.classList.remove('hidden');
        }
        else{
            pagination[key].item.classList.add('hidden');
        }
    }
    
    hiddenItem(pagination.firstPage.item, pagination.moreFirst.item);
    hiddenItem(pagination.totalPages.item, pagination.moreLast.item);
    
    function hiddenItem(itemCheck, item){
        if(itemCheck.classList.contains('hidden')){
            item.classList.add('hidden');
        }
        else{
            item.classList.remove('hidden');
        }
    }
}

function showMovies(movies, genres) {
    gallery.innerHTML='';
    section.classList.remove('full');
    section.classList.remove('void');

    if(movies.length){
        movies.forEach((movie) => showMovie(movie, genres));
    }
    else{
        section.classList.add('void');
        gallery.innerHTML='❓';
    }
}

function showMovie(data, genres) {
    const movie = document.createElement('article');
    movie.setAttribute('data-id', data.id);
    movie.classList.add('movie', 'movie--release');
    movie.innerHTML = `
                    <h3 class="movie__title">${data.title}</h3>
                    <div class="movie__about">
                        <div class="movie__info">
                            <div class="">
                                <span class="movie__country">USA</span>
                                <span class="movie__year">${data.year}</span>
                            </div>
                            <ul class="movie__genre">${setGenre(data.genre, genres)}</ul>
                        </div>
                        <div class="movie__img">
                            <img src=${data.img} alt="poster for movie ${data.title}">
                        </div>
                    </div>
                    <div class="movie__more">
                        <div class="movie__range">
                            <span>${data.range}</span>
                        </div>
                        <button class="movie__btn">>>></button>
                    </div>
                    
    `;
    gallery.append(movie);
    setColorRange(data.range, movie.querySelector('.movie__range'));
    const btn = movie.querySelector('.movie__btn');
    btn.addEventListener('click', async ()=>{
        await findMovie('find', movie.dataset.id);
    })
}

function showMovieFull(data){
    gallery.innerHTML='';
    section.classList.add('full');
    section.classList.remove('void');
    const movie = document.createElement('article');
    movie.setAttribute('data-id', data.id);
    movie.classList.add('movie', 'movie--full');
    movie.innerHTML = `
                    <div class="movie__img">
                        <img src=${data.img} alt="poster for movie ${data.title}">
                    </div>
                    <div class="movie__content">
                        <h3 class="movie__title">${data.title}</h3>
                        <p class="movie__tagline">${data.tagline}</p>
                        <div class="movie__overview">${data.overview}</div>
                    </div>
                    <div class="movie__about">
                        <div class="movie__range">
                            <span>${data.range}</span>
                        </div>
                        <div class="movie__info">
                            <span class="movie__country">USA</span>
                            <span class="movie__language">${data.language}</span>
                            <span class="movie__year">${data.year}</span>
                        </div>
                        <a class="movie__homepage" href="${data.homepage}" target="_blank">Homepage</a>
                        <ul class="movie__genre">${setGenreForFullMovie(data.genre)}</ul>
                    </div>
                    <div class="movie__btn">
                        <button class="">BASK</button>
                    </div>
    `;
    gallery.append(movie);
    movie.style.backgroundImage = `url(${data.backdrop})`;
    setColorRange(data.range, movie.querySelector('.movie__range'));
    const back = movie.querySelector('.movie__btn');
    back.addEventListener('click', async ()=>{
        await setRequest();
    })
}

function setGenre(itemsGenres, genres) {
    let items = '';
    itemsGenres.forEach(item => {
            items += `<li>${genres[item]}</li>`
        }
    )
    return items;
}

function setGenreForFullMovie(genres){
    let items = '';
    genres.forEach(item => {
        items += `<li>${item.name}</li>`
        }
    )
    return items;
}

function setColorRange(range, item) {
    if (range > 6.6) {
        item.classList.add('movie__range--green');
    } else if (range > 3.3) {
        item.classList.add('movie__range--orange');
    } else {
        item.classList.add('movie__range--red');
    }
}