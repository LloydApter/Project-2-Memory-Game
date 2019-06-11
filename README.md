# Memory Game Project

## Table of Contents

* [Background](#background)
* [Description](#discription)
* [Version 2](#Version 2)
* [Version 1](#Version 1)

## Background

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. I needed to convert this project from a static project to an interactive one. It required modifying the HTML and CSS files, but primarily the JavaScript file.

To see the main work on the project, open `js/app.js` and checkout the app's functionality


## Description

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Version 2

Version 2 includes all the missing functionality that was missing in the first Version 1.  This additional functionality added in Version 2 includes:

1. Timer
  - The timer functionality was missing in version one.
  - I decided to build a vanilla JavaScript solution using `` setInterval(startTimer, 10);```
  - The timer counts seconds and minutes and is set to run in humdreds of a second in order to improve accuracy.
  - The timer stops at the end of the game and is reset when a new game in started.
  - The timer also uses the classi stopwatch fomat of ```00:00```

2 Move Counter
  - There is a move counter in Version 1 but it had several bugs that made totally inaccurate.
  - Version 2 move counter includes the following improvements:
      - Does not count duplicate clicks on the same card, 
      - Only counts clicks on cards and not clicks around the deck,
      - Resets for a new game
      - Provides a total end of game count for the modal
      
3. Stars feature
  - The Version 1 star feature simple provided a calculated number of stars at the end of the game based on total moves.
  - Version 2 star feature calculates stars as the game progresses, starting with a max of 5 stars and going down.
  
4. Mobile solution
  - Version 2 includes a media query to provide a more user friendly user experience for mobile uses.
  - There is a bit of a compromise here in that I decided to use large font awesome icons, namely ```fa-2x```
  - As a results of the large icons used I limited the minimum screen size to 420px.
  
5. Score Panel
  - I used a CSS Table to provide the score panel.  It was the most straight forward and classic solution to use.
  - The score panel includes: 
    - a restart button
    - total number of stars
    - a game status message (START PLAYING!, PLAY ON!, GAME OVER!)
    - a restart feature
    - Move counter
    - Timer counter
    
 6. End of Game Modal
 - End of game modal needed to be added and was added using a standard Bootsrap modal.
 - Player is provided with a message that includes the number of stars, moves and time of the game.

## Version 1

Version 1, while very incomplete, included some functionality that was not changed much in the Version 2 and these include:

1. Adding the HTML to the page.
2. Turning over cards
3. Checking if cards matched.
4. Notifying the user that the game was over


