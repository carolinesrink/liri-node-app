var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var dotenv = require("dotenv");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


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
    songName = process.argv[3].slice();

    spotify.search({
        type: "track",
        query: songName
    }, function (error, data) {
        if (error) {
            return console.log(error);
        }
        var songs = data.tracks.items
        for (var i = 0; i < songs.length; i++) {
            console.log("JS line 46: ", i);
            console.log("Artist: " + songs[i].artists.map(getArtists));
            console.log("Song: " + songs[i].name);
            console.log("Preview Song: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("-------------------------------------------------------");
        }
    })
}

var pick = function (caseData, functionData) {
    switch (caseData) {
        case "my-tweets":
            getTweets();
            break;
        case "spotify-this-song":
            getSpotify();
            break;
        case "movie-this":
            getMovies();
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log("Try another command.");
    }
}

var runThis = function (argument1, argument2) {
    pick(argument1, argument2);
};

runThis(process.argv[2], process.argv[3]);