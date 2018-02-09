require("dotenv").config();

//Grab the keys needed from keys.js
var keys = require('./keys.js'),
    request = require('request'),
    twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    fs = require('fs');

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
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (error) {
            return console.log(error)
        }
        logResults('\nCommand: ' + cmd + '\n')

        tweets.forEach(function (tweet) {
            console.log('')
            console.log('==============================================================')
            console.log(' Tweet: ' + tweet.text)
            console.log('==============================================================')
            console.log('')
            logResults('- ' + tweet.text + '\n')
        })
    })
}

    //function for spotify songs
    function spotifySong(searchTerm) {
        var spotify = new Spotify(keys.spotify)
        var preSong = searchTerm ? searchTerm : 'The Sign Ace of Base'
        spotify.search({
            'type': 'track',
            query: preSong
        }, function (err, data) {
            if(err) {
                console.log(err + "\n");
            } else {
                var track = data.tracks.items[0]
                console.log('')
                console.log('==============================================================')
                console.log('Artist: ' + track.album.artists[0].name);
                console.log('Song Name: ' + track.name);
                console.log('Ext URL: ' + track.external_urls.spotify);
                console.log('Album Name: ' + track.album.name);
                console.log('==============================================================')
                console.log('')
                logResults('\nCommand: ' + cmd + '\n')
            }
        })
    }




    //function for OMDB movies
    function movieData(searchTerm) {
        var movie = searchTerm ? searchTerm : "Lord%20of%20the%20Rings"
        var query = 'https://www.omdbapi.com/?apikey=trilogy&t=' + movie;

        request.get(query, function (err, response, body) {
            if (err) {
                    return console.log(err);
                } else {
                    body = JSON.parse(body)
                    // sends data to console
                    console.log('==============================================================')
                    console.log(" Title: " + body.Title);
                    console.log(" Release Year: " + body.Year);
                    console.log(" IMDB Rating: " + body.Ratings[0].Value);
                    console.log(" Rotten Tomatoes Rating: " + body.Ratings[1].Value);
                    console.log(" Country: " + body.Country);
                    console.log(" Language: " + body.Language);
                    console.log(" Plot: " + body.Plot);
                    console.log(" Actors: " + body.Actors);
                    console.log('==============================================================')
                    console.log('')
                    logResults('\nCommand: ' + cmd + '\n')
                }
            })
        };


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

    function logResults(text) {
        fs.appendFile("log.txt", text, function(err) {
            if (err) {
                return console.log(err);
            } else {
                console.log("updated log file ");
            }
        });
    };

