const apiKey = '37e7fac9';  // Replace with your OMDB API Key
const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const errorMessage = document.getElementById('errorMessage');
const movieResults = document.getElementById('movieResults');

// Function to fetch movie data
async function fetchMovies(movieName) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
            errorMessage.textContent = '';  // Clear error message if results found
        } else {
            movieResults.innerHTML = '';  // Clear previous results
            errorMessage.textContent = 'No movies found. Please try another search.';
        }
    } catch (error) {
        errorMessage.textContent = 'Error fetching movie data. Please try again later.';
    }
}

// Function to display movies
function displayMovies(movies) {
    movieResults.innerHTML = ''; // Clear previous results

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const movieImage = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150";
        movieDiv.innerHTML = `
            <img src="${movieImage}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;

        movieResults.appendChild(movieDiv);
    });
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const movieName = movieInput.value.trim();
    if (movieName) {
        fetchMovies(movieName);
    } else {
        errorMessage.textContent = 'Please enter a movie name.';
    }
});

// Optional: Handle Enter key press for search
movieInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
