var media = document.querySelector("#media");
var genreDropDown = document.querySelector("#genre");
var platform = document.querySelector("#platform");
var servicesArray = [];

// local storage array
var searches = [];

// previous search button elements
var prvSearches = document.getElementById("history");
var pastSearchBtn = document.getElementById("history");

// Responsive Dropdowns
media.onchange = function () {
    if (media.value === "movie") {
        genreDropDown.innerHTML = `<option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="35">Comedy</option>
        <option value="10749">Romance</option>
        <option value="878">Sci-Fi</option>
        <option value="27">Horror</option>                    
        <option value="18">Drama</option>
        <option value="14">Fantasy</option>
        <option value="9648">Mystery</option>`;
        platform.innerHTML = `<option value="theaters">In Theaters</option>
        <option value="streaming">Streaming Service</option>`;
    } else if (media.value == "tv") {
        genreDropDown.innerHTML = `<option value="10759">Action/Adventure</option>
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
        platform.innerHTML = `<option value="Streaming Service">Streaming Service</option>
        `;
    } else {
        genreDropDown.innerHTML = `<option value="action">Action</option>
        <option value="indie">Indie</option>
        <option value="adventure">Adventure</option>
        <option value="rpg">RPG</option>
        <option value="strategy">Strategy</option>
        <option value="shooter">Shooter</option>
        <option value="casual">Casual</option>
        <option value="simulation">Simulation</option>
        <option value="puzzle">Puzzle</option>
        <option value="arcade">Arcade</option>
        <option value="platformer">Platformer</option>
        <option value="racing">Racing</option>
        <option value="massively-multiplayer">Massively Multiplayer</option>
        <option value="sports">Sports</option>
        <option value="fighting">Fighting</option>
        <option value="family">Family</option>
        <option value="board-games">Board Games</option>
        <option value="educational">Educational</option>
        <option value="card">Card</option>`;
        platform.innerHTML = `<option value="3">XboX</option>
        <option value="2">PlayStation</option>
        <option value="7">Nintendo</option>
        <option value="1">PC</option>`;
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

// Beginning Identifier to determine which API call to make on previous results "click"

// var searchPastMedia = function (mediaInfo) {
//     console.log(mediaInfo);
//     if (mediaInfo.Type == "tv") {
//         pastTv();
//     } else if (searches[i].Type == "movie") {
//         // pastMovie();
//     } else if (searches[i].Type == "game") {
//         // pastGame();
//     }
// };

// Movie search function
var movieSearch = function () {
    genre = genreDropDown.value;
    
    var tmdbUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&with_genres=" +
    genre;
    fetch(tmdbUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var mediaType = media.value;
                
                randomId =
                data.results[Math.floor(Math.random() * data.results.length)];
                console.log(randomId);
                
                showId = randomId.id;
                movieName = randomId.title;
                moviePoster = randomId.poster_path;
                movieDetails = randomId.overview;
                movieRating = randomId.vote_average;
                
                findIdMovie();

                var showInfo = {
                    ID: showId,
                    Title: movieName,
                    Type: mediaType
                }
                setPreviousSearches(showInfo);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

// Tv search function
var tvSearch = function () {
    genre = genreDropDown.value;
    
    var tmdbUrl =
    "https://api.themoviedb.org/3/discover/tv?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&with_genres=" +
    genre;
    fetch(tmdbUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);
                randomId =
                data.results[Math.floor(Math.random() * data.results.length)];
                
                showId = randomId.id;
                movieName = randomId.name;
                moviePoster = randomId.poster_path;
                movieDetails = randomId.overview;
                movieRating = randomId.vote_average;

                var mediaType = media.value;

                var showInfo = {
                    ID: showId,
                    Title: movieName,
                    Type: mediaType
                }
                
                createElements();
                findIdTv(tvSearch);
                setPreviousSearches(showInfo);
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
    var platformSelect = platform.value;
    var genre = document.querySelector("#genre").value;
    var rawgUrl =
    "https://api.rawg.io/api/games?key=d7bbd8310023473491e2cb8f933da6ba&genres=" +
    genre +
    "&parent_platforms=" +
    platformSelect;
    fetch(rawgUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                randomId =
                data.results[Math.floor(Math.random() * data.results.length)];
                gameId = randomId.id;
                gameName = randomId.name;
                gamePoster = randomId.background_image;
                    gameRating = randomId.metacritic;
                    var mediaType = media.value;

                    var gameInfo = {
                        ID: gameId,
                        Title: gameName,
                        Type: mediaType
                    }
                    createGameElements();
                    setPreviousSearches(gameInfo);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to RAWG API!");
        });
};

// Locate Id of found media
var findIdMovie = function () {
    var previewUrl =
        "https://api.themoviedb.org/3/movie/" +
        showId +
        "?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&sort_by=popularity.desc";
    fetch(previewUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    findServicesMovies();
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to TMDB!");
        });
};

// Locate Id of found media
var findIdTv = function () {
    var previewUrl =
        "https://api.themoviedb.org/3/tv/" +
        showId +
        "?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&sort_by=popularity.desc";
    fetch(previewUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    findServicestv(findIdTv);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to TMDB!");
        });
};

// Available services for found recommendation
var findServicesMovies = function () {
    var previewUrl =
        "https://api.themoviedb.org/3/movie/" +
        showId +
        "/watch/providers?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&sort_by=popularity.desc";
    fetch(previewUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    servicesArray = [];
                    // findProvider(data);
                    // if (data.results.US.buy == true && data.results.US.flatrate == false){
                    for (i = 0; i < data.results.US.buy.length; i++) {
                        providerName = data.results.US.buy[i].provider_name;
                        //console.log(data.results.US.buy.length)
                        console.log(providerName);
                        servicesArray.push(providerName);
                    }
                    console.log(servicesArray);
                    // for (i = 0; i < data.results.US.flatrate.length; i++){
                    //     providerName = data.results.US.flatrate[i].provider_name;
                    //     //console.log(data.results.US.buy.length)
                    //     console.log(providerName);
                    //     servicesArray.push(providerName);
                    //     servicesAsString = servicesArray.join(', ');
                    // }
                    // createElements();
                    // }else if (data.results.US.flatrate == true && data.results.US.buy == false){
                    // console.log(servicesArray);
                    createElements();
                    // }
                });
            } else {
                alert("Error: " + response.statusText);
            }
            console.log(servicesArray);
            createElements();
        })
        .catch(function (error) {
            alert("Unable to connect to TMDB!");
        });
};

// Available services for found recommendation
var findServicestv = function () {
    var previewUrl =
        "https://api.themoviedb.org/3/tv/" +
        showId +
        "/watch/providers?api_key=159f40037d6a65fa5a6290ec992f31ce&language=en-US&sort_by=popularity.desc";
    fetch(previewUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    servicesArray = [];
                    // findProvider(data);
                    for (i = 0; i < data.results.US.flatrate.length; i++) {
                        providerName = data.results.US.flatrate[i].provider_name;
                        //console.log(data.results.US.buy.length)
                        servicesArray.push(providerName);
                        console.log(providerName);
                    }
                    console.log(servicesArray);
                    createElements(findServicestv);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to TMDB!");
        });
};

// Function to populate results elements
var createElements = function () {
    $("#foundDetails").html(movieDetails);
    $("#foundDetails").css({
        width: "300px",
        height: "500px",
        "margin-left": "1%",
        border: "2px solid goldenrod",
        "box-shadow": "3px 3px 3px 3px black",
        "border-radius": "15px",
        padding:"10px",
        'text-align':'center'
    });
    $("#foundVotes").html("Entertain Me! Score: " + movieRating + "/10");
    $("#foundVotes").css({
        height: "50px",
        width: "300px",
        "margin-left": "1%",
        border: "2px solid goldenrod",
        "box-shadow": "3px 3px 3px 3px black",
        "border-radius": "15px",
        'text-align':'center',
        'font-weight':'bold',
        'padding-top':'10px'
    });
    $("#moviePoster").attr(
        "src",
        "https://image.tmdb.org/t/p/w500" + moviePoster
    );
    $("#moviePoster").css({
        "margin-left": "1%",
        border: "2px solid goldenrod",
        "box-shadow": "3px 3px 3px 3px black",
        "border-radius": "15px",
        padding: "10px",
        "align-content": "center",
    });
    $("#title").html(movieName);
    $("#title").css({ height: "100px", width: "200px", "text-align": "center" });
    $("#foundWhereAvailable").html(servicesArray.toString());
    $("#foundWhereAvailable").css({
        "margin-left": "1%",
        border: "2px solid goldenrod",
        "box-shadow": "3px 3px 3px 3px black",
        "border-radius": "15px",
        width: '300px',
        height: '150px',
        padding: '10px'
    });
};

// Populates page with details of found game
var createGameElements = function () {
    $("#moviePoster").attr("src", gamePoster);
    $("#title").html(gameName);
    $("#foundVotes").html("Entertain Me! Score: " + gameRating / 10 + "/10");
};


// starting localStorage functions
function setPreviousSearches(id) {
    if (searches.length === 5) {
        searches.shift();
        searches.push(id);
        localStorage.setItem("previousSearches", JSON.stringify(searches));
        // grabPrevSearches();
    } else {
        searches.push(id);
        localStorage.setItem("previousSearches", JSON.stringify(searches));
    }
}

// Adds buttons dynamically based on previous search results
function grabPrevSearches() {
    var previousSearches = "";
    var previousSearch = localStorage.getItem("previousSearches");
    if (previousSearch) {
        searches = JSON.parse(previousSearch);
        for (var i = 0; i < searches.length; i++) {
            // Add buttons to reference previously searched cities
            previousSearches += `<button id=${searches[i].ID} class="prvSearch">${searches[i].Title}</button>`;
        }
    }
    prvSearches.innerHTML = previousSearches;
};

grabPrevSearches();
    
    $("#search").on("click", function() {
        searchMedia();
        grabPrevSearches();
    });

// Beginning function to recall previous searches "On Click"

    // $(".prvSearch").on("click", function(element) {
    //     console.log("yay");
    //     var match = {};
    //     var previousSearches = localStorage.getItem("previousSearches");
    //     if (previousSearches) {
    //         for (var i = 0; i < previousSearches.length; i++) {
    //             if (previousSearches[i].ID === element.id) {
    //                 match = previousSearches[i];
    //             }  
    //         }
    //     }
    //     searchPastMedia(match);
    // });
    
    
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
    
    //=============== Notes for Fetch Calls ========================================================================= 
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
