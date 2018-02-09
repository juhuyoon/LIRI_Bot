# LIRI - Language Interpretation and Recognition Interface
LIRI Bot is a command line node app that takes in certain parameters and returns data.
For this Bot, Twitter, Spotify, and OMDB Data were used to gain their respective data and display on the command line.
### Introduction

  * LIRI Bot gathers its information through the [Twitter](https://www.npmjs.com/package/twitter) and [Spotify](https://www.npmjs.com/package/spotify) NPM packages.   

  * In order to gain access to the OMDB API, the [Request](https://www.npmjs.com/package/request) NPM package was used.  

  * To hide authentication information for Twitter and Spotify, Dotenv NPM package was used to gain access to .env files hidden with        .gitignore.   
  
   * Technologies Used: 
     1. Node.js
     2. Javascript
     3. npm packages
------

### How to Run
  1. Clone the Repo.
  2. Run the command 'npm install' in Terminal or GitBash
  3. Run command 'node liri.js' with the following commands: 
      * LIRI will respond to the following commands once entered into the command line  
     1. "my-tweets"
     2. "spotify-this-song"
     3. "movie-this"
     4. "do-what-it-says"
------  
### What Each Command Does
1. "my-tweets" 
    * Show the last 20 tweets associated with the twitter account information linked.
2. "spotify-this-song "song-name"" 
    * Show information of the song requested
    ```  
         *Artist
         *Song Name
         *External URL
         *Album Name
3. "movie-this "movie-name""
    * Show information of the movie requested
    ```
        *Title
        *Release Year
        *IMDB Rating
        *Rotten Tomatoes Rating
        *Country
        *Language
        *Plot
        *Actors
4. "do-what-it says"  
    * return the gathered information of the currently ran commands. 
    * the information is placed inside of the log.txt via the use of the fs Node Package.  
------    
### Interesting Code Snippets  

1. The switch statement was used to set specific clauses of when the commands would be called upon. 
```
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
```
2. Using the twitter API get request, the information for tweets of a user's timeline is called and displaced, using the forEach function to pull up to the maximum of 20. 
```
function showTweets() {
    var client = new twitter(keys.twitter);
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (error) {
            return console.log(error)
        }
        logResults('\nCommand: ' + cmd + '\n')
        tweets.forEach(function (tweet) {
 ```
 
 3. Using the Spotify API search request, a specific song can be called upon, and the ternary operator was used to retrieve a default song "Ace of Base" if a song request was not given in the command line. 
 
 ```
 function spotifySong(searchTerm) {
        var spotify = new Spotify(keys.spotify)
        var preSong = searchTerm ? searchTerm : 'The Sign Ace of Base'
        spotify.search({
            'type': 'track',
            query: preSong
        }
 ```
 
4. Accessing the OMDB database via the Request NPM, a specified movie is called upon, with the ternary operator retrieving a default movie "Lord of the Rings: Fellowship of the Ring" if a movie request is not given in the command line. 

```
function movieData(searchTerm) {
        var movie = searchTerm ? searchTerm : "Lord%20of%20the%20Rings"
        var query = 'https://www.omdbapi.com/?apikey=trilogy&t=' + movie;

        request.get(query, function (err, response, body)
```
------
## Authors
Junghoon Yoon
