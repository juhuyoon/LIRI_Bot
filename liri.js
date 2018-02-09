require("dotenv").config();

//Grab the keys needed from keys.js
var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var fs = require('fs');

//Make argv array
var cmd = process.argv[2];
var searchTerm = process.argv[3];

pullRequest(cmd, searchTerm)

//switch case
function pullRequest(cmd, searchTerm) {
    switch (cmd) {
        case "my-tweets":
            showTweets();
            break;

        case "spotify-this-song":
            spotifySong(searchTerm);
            break;

        case "movie-this":
            movieData(searchTerm);
            break;

        case "do-what-it-says":
            doThing();
            break;

        default:
            console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says");
            break;
    }
};

//function for Tweet requests
function showTweets() {
    var client = new twitter(keys.twitter);
    client.get('statuses/user_timerline', function (err, tweets, response) {
        if (err) {
            return console.log(err);
        } else {
            for (var i = 0; i < tweets.length; i++) {
                console.log('')
                console.log('==============================================================')
                console.log(' Tweet: ' + tweets[i].text)
                console.log('')
                console.log(" Tweet Number: " + (i + 1))
                console.log('')
                console.log(' Created: ' + tweets[i].created_at)
                console.log('==============================================================')
                console.log('')
            }
        }
    });

    //function for spotify songs
    function spotifySong(searchItem) {
        var spotify = new Spotify(keys.spotify)
        var query = searchItem ? searchItem : 'The Sign',
            trackNum = searchItem ? 0 : 5 //done in order to get song by Ace of Bass
        var secondArg = searchTerm ? searchTerm : '' //accurately log command line entry

        spotify.search({ type: 'track', query: query }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var track = data.tracks.items[trackNum]

            var album = track.album.name;
            var artist = track.artists[0].name;
            var ext_url = track.external_urls.spotify;
            var song = track.name;
            var result = '* ' + artist + '\n* ' + song + '\n* ' + ext_url + '\n* ' + album
                + '\n'

            console.log(result);
            logResults('\nCommand: ' + command + ' ' + secondArg + '\n' + result)
        });
    }
    //function for OMDB movies
    function movieData(searchTerm) {
        var query = 'http://www.omdbapi.com/?t=' + searchTerm + '&plot=short&r=json&tomatoes=true';
        request(query, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                var movieDetails = JSON.parse(body);
                // if no movie entered use below movieDetails for movie
                if (movieDetails.Response === 'False') {
                    myMovieDetails('Avengers');
                } else {
                    // sends data to console
                    console.log('')
                    console.log('==============================================================')
                    console.log(" Title: " + JSON.parse(body)["Title"]);
                    console.log(" Release Year: " + JSON.parse(body)["Released"]);
                    console.log(" IMDB Rating: " + JSON.parse(body)["imdbRating"]);
                    console.log(" Country: " + JSON.parse(body)["Country"]);
                    console.log(" Language: " + JSON.parse(body)["Language"]);
                    console.log(" Plot: " + JSON.parse(body)["Plot"]);
                    console.log(" Actors: " + JSON.parse(body)["Actors"]);
                    console.log(" Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
                    console.log(" Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
                    console.log('==============================================================')
                    console.log('')
                }
            }
        });
    }


    function doThing() {
        fs.readFile('random.txt', 'utf-8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            var dataArr = data.split(',');
            var cmdSpace = dataArr[0]
            var searchSpace = dataArr[1]

            pullRequest(cmdSpace, searchSpace)
        })
    }

    function logReults(text) {
        fs.appendFile("log.txt", text, function(err) {
            if (err) {
                return console.log(err);
            } else {
                console.log("updated log file ");
            }
        });
    }
};

