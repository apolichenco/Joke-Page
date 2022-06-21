fetch("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?type=single&amount=10")
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        // breeBree = Object.keys(data.message);
        // breedArray = Object.entries(data);
        // breedTypes = Object.entries(breedArray[0][1])
        // breedTypes.forEach(link => addBreedToImage(link))
    });