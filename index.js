let i = 1;

function fetchJokes() {
    fetch("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?type=single&amount=10")
        .then(response =>response.json())
        .then(function (data) {
            breedArray = Object.entries(data.jokes);
            breedArray.forEach(link => {
                categorize(link[1])
                postJoke(link[1])
            })
        });
    }

function fetchUploadedJokes() {
    fetch("http://localhost:3000/jokes")
    .then(response => response.json())
    .then(data => {
        data.forEach(joke => categorize(joke))
    })
}

function categorize(theJoke) {
    let jokeCategories = theJoke.category
    findCorrectCategory(`${jokeCategories}`, theJoke)
}

function findCorrectCategory(whichcategory, theJoke) {
    const jokeCategory = document.querySelector(`#${whichcategory}-jokes`)
    const actualJoke = document.createElement('div')
    actualJoke.className = 'single-joke-box'
    const theJokeItself = theJoke.joke
    if (theJokeItself.length < 360) {
        actualJoke.innerHTML = `<p id="jokeNumber${i}">${theJokeItself}</p>`
        i ++
        jokeCategory.append(actualJoke)
    }
}

function postJoke(theJokeSource) {
    fetch("http://localhost:3000/jokes", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            joke: theJokeSource.joke,
            category: theJokeSource.category
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
}

// fetchJokes()
fetchUploadedJokes()

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
    const randomNumber = Math.floor(Math.random() * (i - 1) ) + 1;
    console.log(randomNumber)
    let actualRandomJoke = document.querySelector(`#jokeNumber${randomNumber}`)
    randomBox.innerHTML = actualRandomJoke.innerHTML
}

setTimeout(randomizeTheJoke, 1000)
setTimeout(keepRandomizing, 1200)
function keepRandomizing() {
    document.querySelector("#make-it-random").addEventListener("click", randomizeTheJoke)
} 
function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  function addJokeToPage(e){
    e.preventDefault()
    let newJoke = {joke:e.target.joke.value}
    let newCategory = e.target.section.value
    findCorrectCategory(`${newCategory}`, newJoke)
    postJoke(newJoke)
  }

  document.querySelector("#add-a-new-joke").addEventListener("submit", addJokeToPage)
