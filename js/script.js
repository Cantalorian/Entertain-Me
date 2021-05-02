var media = document.querySelector("#media");
var genreDropDown = document.querySelector("#genre");
var platform = document.querySelector("#platform");

media.onchange = function() {
    if (media.value === "movie") {
        genre.innerHTML = 
        `<option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="35">Comedy</option>
        <option value="10749">Romance</option>
        <option value="878">Sci-Fi</option>
        <option value="27">Horror</option>                    
        <option value="18">Drama</option>
        <option value="14">Fantasy</option>
        <option value="9648">Mystery</option>`;
        platform.innerHTML = 
        `<option value="theaters">In Theaters</option>
        <option value="streaming">Streaming Service</option>`;
    } else if (media.value == "tv") {
        genre.innerHTML = 
        `<option value="10759">Action/Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="80">Crime</option>
        <option value="99">Documentary</option>
        <option value="18">Drama</option>
        <option value="10751">Family</option>
        <option value="10762">Kids</option>
        <option value="9648">Mystery</option>
        <option value="10763">News</option>
        <option value="10764">Reality</option>
        <option value="10765">Sci-Fi & Fantasy</option>
        <option value="10766">Soap</option>                    
        <option value="10767">Talk</option>
        <option value="10768">War & Politics</option>
        <option value="37">Western</option>`;
        platform.innerHTML = 
        `<option value="Streaming Service">Streaming Service</option>
        `
    } else {
        genre.innerHTML =
        `<option value="">FPS</option>`;
        platform.innerHTML = 
        `<option value="">XBOX</option>
        <option value="">PlayStation</option>
        <option value="">Switch</option>
        <option value="">PC</option>`
    }
    
};


// Search execution function
var searchMedia = function () {
    if (media.value == "tv") {
        tvSearch();
    } else if (media.value == "movie") {
        movieSearch();
    } else if (media.value == "game") {
        gameSearch();
    }
};

// genre id

// Movie search function
var movieSearch = function () {
    genre = genreDropDown.value;    

    var tmdbUrl =
        "https://api.themoviedb.org/3/discover/movie?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&with_genres=" + genre;
    fetch(tmdbUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    // console.log(data);
                    // console.log(data.results[0]);

                    randomId = data.results[Math.floor(Math.random() * data.results.length)]
                    console.log(randomId);
                    
                    showId = randomId.id;
                    movieName = randomId.title;
                    moviePoster = randomId.poster_path;
                    movieDetails = randomId.overview;
                    movieRating = randomId.vote_average;
                    
                    findId();
                    // console.log(moviePoster);
                    // findId();

                    findServices();

                });
            } else {
                alert("Error: " + response.statusText);
            }        
        })
};

// Tv search function
var tvSearch = function () {
    genre = genreDropDown.value;
    var tmdbUrl =
        "https://api.themoviedb.org/3/discover/tv?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&with_genres=" + genre;
        fetch(tmdbUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                    });
                } else {
                    alert("Error: " + response.statusText);
                }
            })
            .catch(function (error) {
                alert("Unable to connect to TMDB API!");
            });
};

// Game search function
var gameSearch = function () {
    var rawgUrl =
        "https://api.rawg.io/api/games?key=d7bbd8310023473491e2cb8f933da6ba";
        fetch(rawgUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        // youtube();
                    //     randomId = data.results[Math.floor(Math.random() * data.results.length)]
                    // console.log(randomId);
                    
                    // showId = randomId.id;
                    // movieName = randomId.title;
                    // moviePoster = randomId.poster_path;
                    // movieDetails = randomId.overview;
                    // movieRating = randomId.vote_average;
                    
                    // findId();
                    // // console.log(moviePoster);
                    // // findId();

                    // findServices();
                    });
                } else {
                    alert("Error: " + response.statusText);
                }
            })
            .catch(function (error) {
                alert("Unable to connect to RAWG API!");
            });
};
var findId = function () {
    var previewUrl =
        "https://api.themoviedb.org/3/movie/" + showId + "?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&sort_by=popularity.desc";
        fetch(previewUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        // console.log(data);
                        // findServices();
                    });
                } else {
                    alert("Error: " + response.statusText);
                }
            })
            .catch(function (error) {
                alert("Unable to connect to TMDB!");
            });
};
var findServices = function () {
    var previewUrl =
        "https://api.themoviedb.org/3/movie/" + showId + "/watch/providers?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&sort_by=popularity.desc";
        fetch(previewUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        servicesArray = [];
                        // findProvider(data);
                        for (i = 0; i < data.results.US.buy.length; i++){
                            providerName = data.results.US.buy[i].provider_name;
                            //console.log(data.results.US.buy.length)
                            console.log(providerName);
                            servicesArray.push(providerName);
                        }
                        console.log(servicesArray);
                        createElements();
                        
                    });
                } else {
                    alert("Error: " + response.statusText);
                }
            })
            .catch(function (error) {
                alert("Unable to connect to TMDB!");
            });
};

var createElements = function(){
    $('#foundDetails').html(movieDetails);
    $('#foundVotes').html("Entertain Me! Score: " + movieRating + "/10");
    $('#moviePoster').attr('src', 'https://image.tmdb.org/t/p/w500' + moviePoster);
    $('#title').html(movieName);
    $('#foundWhereAvailable').html(servicesArray);
    
    
}

// var findProvider = function(data){
//     }
// }


// var showPreview = function () {
//     var previewUrl =
//         "https://api.themoviedb.org/3/movie/" + showId + "?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&sort_by=popularity.desc";
//         fetch(previewUrl)
//             .then(function (response) {
//                 if (response.ok) {
//                     response.json().then(function (data) {
//                         console.log(data);
//                     });
//                 } else {
//                     alert("Error: " + response.statusText);
//                 }
//             })
//             .catch(function (error) {
//                 alert("Unable to connect to TMDB!");
//             });
// };

$("#search").on("click", searchMedia);


// starting localStorage functions

// array to store search history
// var searchHistory = [];

// function grabPrevFinds() {
//     var previousRecommends = "";
//     var previousSearch = localStorage.getItem("");
//     if (previousSearch) {
//         searchHistory = JSON.parse(previousSearch);
//         for (var i = 0; i < searches.length; i++) {
//             // can add a linked button for previous recommendations
//         }
//     }
//     // need DIV to place text or links for past searches from local storage
// }

// $('#search').on('click', searchMedia);

// Data we need to pull for movies
// data.results[0].id - Gives a movie or show id to pass to preview function
// data.results[0].title - Movie title
// data.results[0].poster_path - Movie poster
// data.results[0].overview - Movie description
// data.results[0].video - To pull a preview if available, if false loop to another API for preview.
// data.results[0].vote_average - Movie popularity, maybe create a loop to pull a new result if popularity is below set threshold.
// data.results.total_pages - To limit how many results the API returns to avoid too much bandwidth utilization and accomidate heavier traffic.

// Data for TV
// data.results[0].poster_path - TV poster or image
// data.results[0].name - Title of show
// data.results[0].overview - TV Description
// data.results[0].vote_average - give show a score out of 10
// 

// Data we need to pull for video games
// data.results[0].platforms - Gives an array for available platforms, may need to be stringified
// data.results[0].name - Game title
// data.results[0].esrb_rating.name - Gives title ESRB rating
// data.results[0].rating - Gives a game score out of five could be used to set a minimum rating threshold
// 


// Setting to local storage
// function setPrevFinds () {
//     if (searchHistory === 5) {
//         searchHistory.shift();
//         searchHistory.push();
//         localStorage.setItem("", JSON.stringify(searchHistory));
//         grabPrevFinds();
//     } else {
//         searchHistory.push();
//         localStorage.setItem("", JSON.stringify(searchHistory));
//     }

