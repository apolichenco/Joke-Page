let i = 1;
let allJokes = []

function fetchJokes() {
    fetch("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun?blacklistFlags=nsfw,religious,racist,sexist&type=single&amount=10")
        .then(response => response.json())
        .then(function (data) {
            breedArray = Object.entries(data.jokes);                
            breedArray.forEach(link => {
                if (allJokes.includes(link[1].joke)) {
                    console.log(allJokes.includes(link[1].joke))
                    console.log("Don't come here!!!")
                }
                else {
                    allJokes.push(link[1].joke)
                    postJoke(link[1])
                    findCorrectCategory(link[1].category, link[1])                    
                }
            })
        });
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
    .then(data => console.log("HI"))
}

function fetchUploadedJokes() {
    fetch("http://localhost:3000/jokes")
    .then(response => response.json())
    .then(data => {
        data.forEach(theJoke => {
            if (allJokes.includes(theJoke.joke)) {
                const idNumber = theJoke.id
                console.log("Don't come here!!!")
                deleteFromDBJ(idNumber)
            }
            else {
                allJokes.push(theJoke.joke)
                findCorrectCategory(theJoke.category, theJoke)
            }
        })
    })
}

function deleteFromDBJ(idNumber) {
    fetch(`http://localhost:3000/jokes/${idNumber}`, { 
        method: 'DELETE' ,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(elm => console.log(elm))
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
    window.scrollBy(0, -60)
}
  
function randomizeTheJoke() {
    const randomBox = document.querySelector("#random-joke-displayed")
    const randomNumber = Math.floor(Math.random() * (i - 1) ) + 1;
    let actualRandomJoke = document.querySelector(`#jokeNumber${randomNumber}`)
    randomBox.innerHTML = actualRandomJoke.innerHTML
}

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
    if (allJokes.includes(e.target.joke.value)) {
        console.log("a repeat")
    }
    else {
        let newJoke = {
            joke:e.target.joke.value,
            category:e.target.section.value}
        allJokes += newJoke.joke
        findCorrectCategory(newJoke.category, newJoke)
        postJoke(newJoke)
    }
}

fetchUploadedJokes()
setTimeout(randomizeTheJoke, 400)
setTimeout(keepRandomizing, 500)
document.querySelector("#open-it").addEventListener("click", openForm)
document.querySelector("#close-it").addEventListener("click", closeForm)
document.querySelector('#joke-dropdown').addEventListener('change', handleChange)
document.querySelector("#add-a-new-joke").addEventListener("submit", addJokeToPage)
document.querySelector("#fetch-jokes").addEventListener("click", fetchJokes)
