
function fetchJokes() {
    fetch("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?type=single&amount=10")
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {

            breedArray = Object.entries(data.jokes);
            breedArray.forEach(link => {
            categorize(link)
            })
        });
    }
fetchJokes();
fetchJokes();
fetchJokes();
fetchJokes();
fetchJokes();

function categorize(theJoke) {
    if (theJoke[1].category === "Programming") {
        findCorrectCategory("Programming", theJoke)
    }
    if (theJoke[1].category === "Misc") {
        findCorrectCategory("Misc", theJoke)
    }
    if (theJoke[1].category === "Dark") {
        findCorrectCategory("Dark", theJoke)
    }
    if (theJoke[1].category === "Pun") {
        findCorrectCategory("Pun", theJoke)
    }
    if (theJoke[1].category === "Spooky") {
        findCorrectCategory("Spooky", theJoke)
    }
}

function findCorrectCategory(whichcategory, theJoke) {
        const jokeCategory = document.querySelector(`#${whichcategory}-jokes`)
        const actualJoke = document.createElement('div')
        actualJoke.className = 'single-joke-box'
        const theJokeItself = theJoke[1].joke
        actualJoke.innerHTML = `<p>${theJokeItself}</p>`
        jokeCategory.append(actualJoke)
    }

