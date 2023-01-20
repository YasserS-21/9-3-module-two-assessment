





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 const BASEURL = "https://resource-ghibli-api.onrender.com"
 const titlesSection = document.getElementById("titles")
 const displayBox = document.getElementById("display-info")
 const submitReview = document.getElementById("review-form")
 const userReview = document.getElementById("review-list")
 const peopleList = document.getElementById("people-list")
let currentMovieObject = new Object 
 
 fetch(`${BASEURL}/films`)
 .then(results => results.json())
 .then(films => {
    console.log(films)
    let currentMovie = ""
    films.forEach(film => {
        const newMovie = document.createElement("option")
        newMovie.textContent = film.title
        newMovie.id = film.title
        newMovie.value = film.id
        titlesSection.append(newMovie)
        });

        titlesSection.addEventListener("change", event => { 
            event.preventDefault();     
            displayBox.innerHTML = ""    
            peopleList.innerHTML = "" 
            let title = document.createElement("h3")
            title.classList.add("currentMovie")
            let releaseYear = document.createElement("p")
            let movieDesc = document.createElement("p")
            
            movieId = event.target.value;
            films.forEach(film => {
                if (film.id === movieId) {
                    currentMovieObject = film
                    currentMovie = film.title
                    title.textContent = film.title;
                    releaseYear.textContent = `Released: ${film.release_date} \n`;
                    movieDesc.textContent = film.description;

                }
                })
                console.log(`${BASEURL}${currentMovieObject.people[0]}`)
            displayBox.append(title)
            displayBox.append(releaseYear)
            displayBox.append(movieDesc)
        })

        submitReview.addEventListener("submit", event2 => {

            event2.preventDefault()

            const reviewEntry = document.createElement("li")
            const bold = document.createElement("B")
            const input = document.getElementById("review")

            if (titlesSection.value === ""){
                alert("Please select a movie first")
            } 
            reviewEntry.append(bold)
            reviewEntry.append(input.value)
            if (titlesSection.value === ""){
                alert("Please select a movie first")
            } else {
                bold.append(`${currentMovie}: `)
                userReview.append(reviewEntry)
                input.value = ""
            }

            console.log(reviewEntry)

        })
        const resetReviews = document.getElementById("reset-reviews")
        resetReviews.addEventListener("click", event3 => {
            event3.preventDefault()
            userReview.innerHTML = ""
        })
        const getPeople = document.getElementById("show-people")

        const filmData = films
        getPeople.addEventListener("click", event4 => {
            event4.preventDefault();

            (currentMovieObject.people).forEach(person => {
                return fetch(`${BASEURL}${person}`)
                .then (results => results.json())
                .then (people => {

                    const personName = document.createElement("li")
                    const apiNotWorking = document.createElement("p")
                    if (people.name === undefined) {
                        apiNotWorking.textContent = `No Characters Found At The Moment`
                        peopleList.append(apiNotWorking)
                    } else {
                    personName.textContent = `${people.name}`
                    peopleList.append(personName)
                    }

                    console.log(people);
                    })
                })
                ;
                
            });
        });
    }
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
