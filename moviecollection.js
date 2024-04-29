const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    'Content-Type': 'application/json;charset=utf-8',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTI3ZTRmNTE5NGE5Y2I4MjM1ODQwYzUzZTYwN2QwYyIsInN1YiI6IjY2MjljYmQ4OGQ3N2M0MDA5YjJkN2NhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4rAgqLmw9SuSgTo__-CeayGcrzowkMVcMPPhswcNAo',
  },
};



fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)

const getImageUrl = (path, size = 400) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`;
};

let movies;

function handleSearch(event) {
  event.preventDefault(); // Prevent form submission
  const searchWord = document.querySelector("#search-input").value;

  // Check if movies is defined
  if (!movies) {
    return; // Exit the function if movies is not defined
  }

  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchWord.toLowerCase());
  });

  renderCards(filteredMovies);
}





function renderCards(movies) {
  const cardList = document.querySelector(".card-list");
  cardList.innerHTML = ""; // Clear existing cards

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
    <img src="${getImageUrl(movie.poster_path)}" alt="${movie.title}">
    <h3 class="movie-title">${movie.title}</h3>
    <p>${movie.overview}</p>
    <p>Rating: ${movie.vote_average}</p>
  `;

    cardList.appendChild(card);
  });
}

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    // 영화 정보에서 필요한 정보를 추출한다.
    const adult = response.adult;
    const backdrop_path = response.backdrop_path;
    const genre_ids = response.genre_ids;
    const id = response.id;
    const original_language = response.original_language;
    const original_title = response.original_title;
    const overview = response.overview;
    const popularity = response.popularity;
    const poster_path = response.poster_path;
    const release_data = response.release_data;
    const title = response.title;
    const video = response.video;
    const vote_average = response.vote_average;
    const vote_count = response.vote_count;

    // 추출한 정보를 하나의 객체에 넣는다.
    const movie = {
      adult,
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_data,
      title,
      video,
      vote_average,
      vote_count,
    };

    // 객체를 콘솔에 출력한다.
    console.log(movie);

    const data = JSON.stringify([response]);

    movies = response.results;

    console.log(movies);

    movies.forEach((movie) => {
      const cardList = document.querySelector(".card-list");
      const card = document.createElement("div");
      card.classList.add("movie-card");

      card.innerHTML = `
        <img src="${getImageUrl(movie.poster_path)}" alt="${movie.title}">
        <h3 class="movie-title">${movie.title}</h3>
        <p>${movie.overview}</p>
        <p>Rating: ${movie.vote_average}</p>
      `;

      // 이미지에 클릭 이벤트 리스너 추가
      card.querySelector("img").addEventListener("click", () => {
        alert(`영화 id : ${movie.id}`);
      });

      cardList.appendChild(card);
    });
  })
  .catch((err) => console.error(err));