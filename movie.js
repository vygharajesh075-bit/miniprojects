const apiKey = "1de9a541"; // replace this

async function searchMovies() {
  const query = document.getElementById("search").value;

  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  const container = document.getElementById("movies");
  container.innerHTML = "";

  if (data.Search) {
    data.Search.forEach(movie => {
      const div = document.createElement("div");
      div.classList.add("movie");

      div.innerHTML = `
        <img src="${movie.Poster}" alt="">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;

      container.appendChild(div);
    });
  } else {
    container.innerHTML = "<p>No movies found 😢</p>";
  }
}