let i = 1;
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
    let jokeCategories = theJoke[1].category
    findCorrectCategory(`${jokeCategories}`, theJoke)
}

function findCorrectCategory(whichcategory, theJoke) {
    const jokeCategory = document.querySelector(`#${whichcategory}-jokes`)
    const actualJoke = document.createElement('div')
    actualJoke.className = 'single-joke-box'
    const theJokeItself = theJoke[1].joke
    actualJoke.innerHTML = `<p id="jokeNumber${i}">${theJokeItself}</p>`
    i ++
    jokeCategory.append(actualJoke)
}

setTimeout(dropdownSorter, 500)
function dropdownSorter() {
    const dropDown = document.querySelector('#joke-dropdown')
    dropDown.addEventListener('change', handleChange)
}


function handleChange(event) {
    const letter = event.target.value
    if (letter === "all") {
        window.location.hash = "#top";    
     }
    if (letter === "a") {
        window.location.hash = "#pro-jokes";    
    }
    if (letter === "b") {
        window.location.hash = "#mis-jokes";    
    }
    if (letter === "c") {
        window.location.hash = "#dar-jokes";    
    }
    if (letter === "d") {
        window.location.hash = "#pu-jokes";    
    }
    if (letter === "e") {
        window.location.hash = "#spo-jokes";    
    }

}
   
function randomizeTheJoke() {
    const randomBox = document.querySelector("#random-joke-displayed")
    const randomNumber = Math.floor(Math.random() * (50 - 1) ) + 1;
    let actualRandomJoke = document.querySelector(`#jokeNumber${randomNumber}`)
    randomBox.innerHTML = actualRandomJoke.innerHTML
}

setTimeout(randomizeTheJoke, 1500)
setTimeout(keepRandomizing, 2000)
function keepRandomizing() {
    document.querySelector("#make-it-random").addEventListener("click", randomizeTheJoke)
} 
// document.querySelector("#add-a-joke").addEventListener("click", )
function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }