var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var dotenv = require("dotenv");
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");


// var spotify = new Spotify(keys.spotify);
var getTweets = function () {

    var client = new Twitter(keys.twitter);

    var params = {
        screen_name: 'caroline_scott1'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
        } else if (!error) {
            console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });
}

var getArtists = function (artist) {
    return artist.name;
}

function getSpotify(songName) {
    songName = process.argv.slice(3);

    var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: "track",
        query: songName
    }, function (error, data) {
        if (error) {
            return console.log(error);
        }
        var songs = data.tracks.items
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Artist: " + songs[i].artists.map(getArtists));
            console.log("Song: " + songs[i].name);
            console.log("Preview Song: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("-------------------------------------------------------");
        }
    })
}

function getMovies(movieName) {
    movieName = process.argv.slice(3);
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            console.log("Title: " + jsonData.Title);
            console.log("Release Year: " + jsonData.Year);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Rotten Tomato Score: " + jsonData.tomatoRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("---------------------------------------------");
        }
    })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        };
        var dataArr = data.split(",");
        if(dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }
    });
}

var pick = function (caseData, functionData) {
    switch (caseData) {
        case "my-tweets":
            getTweets();
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "movie-this":
            getMovies(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Try another command.");
    }
}

var runThis = function (argument1, argument2) {
    pick(argument1, argument2);
};

runThis(process.argv[2], process.argv[3]);