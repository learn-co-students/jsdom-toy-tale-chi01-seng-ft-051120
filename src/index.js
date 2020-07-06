/// variables ///
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyContainer = document.querySelector('#toy-collection');
const toyForm = document.querySelector('.add-toy-form');
let addToy = false;

/// fetch toy data functions ///
function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then( resp => resp.json())
  .then(toysData => createToyDivs(toysData))
  .catch(err => console.log(err))
}

function createToyDivs(toysData){
  toysData.forEach(toyData => createToyDiv(toyData))
}

function createToyDiv(toyData){
  // const div = document.createElement("div")
  // div.className = 'card'
  // const h2 = document.createElement('h2')
  // h2.innerText = toyData.name
  // div.append(h2)
  // const img = document.createElement('img')
  // img.className = 'toy-avatar'
  // img.src = toyData.image
  // const p = document.createElement('p')
  // p.innerText = `${toyData.likes} Likes`
  // const button = document.createElement('button')
  // button.className = 'like-btn'
  // button.innerText = 'Like <3'
  // div.append(img, p, button)
  // toyContainer.appendChild(div)
  const div = `
    <div class="card">

      <h2>${toyData.name}</h2>
      <img src=${toyData.image} class="toy-avatar" />
      <p>${toyData.likes} Likes </p>
      <button data-id=${toyData.id} class="like-btn">Like <3</button>
    </div>
  `
  toyContainer.innerHTML += div

}

/// submit new toy functions //
function submitNewToy(){
  event.preventDefault()
  const name = event.target.name.value
  const image = event.target.image.value
  postNewToy(name, image)
  event.target.reset()
}

function postToyObj(name, image){
    return {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
    })
  }
}

function postNewToy(name, image){
  fetch('http://localhost:3000/toys', postToyObj(name, image))
    .then(resp => resp.json())
    .then(toyData => createToyDiv(toyData))
    .catch(err => console.log(err))
}
/// like toy functions ///

function likeToyHandler(){
  if (event.target.tagName === 'BUTTON') {
    renderNewLike()
    likeToy()
  }
}

function renderNewLike(){
  const pTag = event.target.previousElementSibling
  const likeString = pTag.innerText.slice(0, -6)
  const likes = parseInt(likeString)
  pTag.innerText = `${likes + 1} Likes`

}

function likeToy(){
  const id = event.target.dataset.id
  fetch(`http://localhost:3000/toys/${id}`, patchObj())
    .then(resp => resp.json())
    .then(toyData => console.log(toyData))
    .catch(err => console.log(err))
}

function patchObj(){
  const likeString = event.target.previousElementSibling.innerText.slice(0, -6)
  const likes = parseInt(likeString)
  return {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: likes
    })
  }
}

/// other functions ///
function toggleForm(){
  addToy = !addToy;
  toyFormContainer.style.display = addToy ? 'block' : 'none'
}

/// event listeners ///
addBtn.addEventListener("click", toggleForm);
toyForm.addEventListener('submit', submitNewToy);
toyContainer.addEventListener('click', likeToyHandler);

/// invoked functions ////
fetchToys()
