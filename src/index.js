///////////  VARIABLES /////////////
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyContainer = document.querySelector("#toy-collection");
const toyForm = document.querySelector(".add-toy-form");
let addToy = false;


///////////  FETCH TOY DATA FUNCTIONS /////////////
function fetchToys(){
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toysData => createToyDivs(toysData))
    .catch(err => console.log(err))
}

function createToyDivs(toysData){
  toysData.forEach(toyData => createToyDiv(toyData))
}

function createToyDiv(toyData){
  const div = `
    <div class="card">
      <h2>${toyData.name}</h2>
      <img src=${toyData.image} class="toy-avatar" />
      <p>${toyData.likes} ${likeOrLikes(toyData.likes)}</p>
      <button data-id=${toyData.id} class="like-btn">Like <3</button>
    </div>
  `
  toyContainer.innerHTML += div
}

///////////  SUBMIT NEW TOY FUNCTIONS /////////////
function submitNewToy(){
  event.preventDefault()
  const name = event.target.name.value
  const image = event.target.image.value
  postNewToy(name, image)
  event.target.reset()
}

function postToyObj(name, image){
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  }
}

function postNewToy(name, image){
  fetch("http://localhost:3000/toys", postToyObj(name, image))
    .then(resp => resp.json())
    .then(toyData => createToyDiv(toyData))
    .catch(err => console.log(err))
}


///////////  LIKE TOY FUNCTIONS /////////////
function likeToyHandler(){
  if (event.target.tagName === "BUTTON"){
    renderNewLike()
    likeToy()
  }
}

function renderNewLike(){
  const pTag = event.target.previousElementSibling
  const likeStr = pTag.innerText.split(" ")[0]
  const likes = parseInt(likeStr)
  pTag.innerText = `${likes + 1} ${likeOrLikes(likes + 1)}`
}

function likeOrLikes(likes){
  if (likes === 1 || likes === -1){
    return "Like"
  } else {
    return "Likes"
  }
}

function likeToy(){
  const id = event.target.dataset.id
  fetch(`http://localhost:3000/toys/${id}`, patchObj())
    .then(resp => resp.json())
    .then(toyData => console.log(toyData))
    .catch(err => console.log(err))
}

function patchObj(){
  const likeStr = event.target.previousElementSibling.innerText.slice(0, -6)
  const likes = parseInt(likeStr)
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  }
}


///////////  OTHER FUNCTIONS /////////////
function toggleForm(){
  addToy = !addToy;
  toyFormContainer.style.display = addToy ? "block" : "none"
}


///////////  EVENT LISTENERS /////////////
addBtn.addEventListener("click", toggleForm);
toyForm.addEventListener("submit", submitNewToy)
toyContainer.addEventListener("click", likeToyHandler)


///////////  INVOKED FUNCTIONS /////////////
fetchToys()