
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

    setTimeout(dropdownSorter, 500)
    function dropdownSorter(){
        const dropDown = document.querySelector('#joke-dropdown')
        dropDown.addEventListener('change', handleChange)

    }


function handleChange(event) {
    const letter = event.target.value
    console.log(letter)
    console.log(event)
    console.log(event.target)
    // const filteredBreeds = breeBree.filter(breed => breed.startsWith(letter))
    // let breedContainer = document.querySelector('#dog-breeds')
    // breedContainer.innerHTML = ''
    // filteredBreeds.forEach(bree => addBreedToImagine(bree))
    // breedContainer.append(filteredBreeds)
}
    // function addBreedToImagine(bree){
    //     let breedContainer = document.querySelector('#dog-breeds')
    //     let breed = document.createElement('li')
    //     breed.innerHTML = bree
    //     breedContainer.append(breed);
    // }