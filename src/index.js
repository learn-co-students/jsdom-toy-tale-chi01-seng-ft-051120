let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection")
  const toyFields = document.getElementsByClassName("input-text")
  const submitToy = document.getElementsByClassName("submit")[0]
  const likeBttns = document.getElementsByClassName("like-btn")
  addBtn.addEventListener("click", (event) => {
    event.preventDefault()

    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function loadToys() {
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toyData => {
      toyCollection.innerHTML = ""
      toyData.forEach(toy => toyCollection.innerHTML += 
        `<div class ='card' id='${toy.id}'>
            <h2>${toy.name}</h2>
            <img src= '${toy.image}' width='60' height ='60' class='toy-avatar'>  
            <p class= 'false' id='likes-${toy.id}'>Likes: ${toy.likes}</p>
            <button class='like-btn' onclick='likedToy(${toy.id}, ${toy.likes})'>Like ❤️ </button>
          </div>`
        )
    })
  }
  loadToys()


  function newToy(){
    submitToy.addEventListener("click", (event) => {
      event.preventDefault()
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": `${toyFields[0].value}`,
          "image": `${toyFields[1].value}`,
          "likes": 0
        })
      })
      toyFields[0].value = ""
      toyFields[1].value = ""
      setTimeout(() => loadToys(), 3)
    })
    
  }

 

  newToy()

});

function likedToy(id, likes) {

  let selectedToy = document.getElementById(`likes-${id}`)

  if (selectedToy.classList.contains("false")) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likes +=1
      })
    })
    selectedToy.innerHTML = `Likes: ${likes}`
    selectedToy.className = "true"
  }

}
