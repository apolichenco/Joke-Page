let i = 1;

function fetchJokes() {
    fetch("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?type=single&amount=10")
        .then(response =>response.json())
        .then(function (data) {
            breedArray = Object.entries(data.jokes);                
            let allJokes = []
            breedArray.forEach(link => {
                if (allJokes.includes(link[1].joke)) {
                    console.log("a repeat")
                }
                else {
                    allJokes += link[1].joke
                    categorize(link[1])
                    // postJoke(link[1])
                    return "another one"   
                }
            })
        });
    }

function fetchUploadedJokes() {
    fetch("http://localhost:3000/jokes")
    .then(response => response.json())
    .then(data => {
        let allJokes = []
        data.forEach(theJoke => {
            console.log(theJoke.joke)
            if (allJokes.includes(theJoke.joke)) {
                console.log("a repeat")
            }
            else {
            allJokes += theJoke.joke
            categorize(theJoke)
            }
        })
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
function checkForRepeats(theJoke) {
    if (allJokes.includes(theJoke)); 
    else {
        allJokes =+ theJoke
    }
}

// fetchJokes()
// fetchJokes()
// fetchJokes()
// fetchJokes()
// fetchJokes()
// fetchJokes()
// fetchJokes()
// fetchJokes()
// fetchJokes()
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
}
   
function randomizeTheJoke() {
    const randomBox = document.querySelector("#random-joke-displayed")
    const randomNumber = Math.floor(Math.random() * (i - 1) ) + 1;
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
    let newJoke = {
        joke:e.target.joke.value,
        category:e.target.section.value}
    let newCategory = e.target.section.value
    findCorrectCategory(`${newCategory}`, newJoke)
    postJoke(newJoke)
  }

  document.querySelector("#add-a-new-joke").addEventListener("submit", addJokeToPage)
