let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.getElementById("toy-collection");

function main() {
  fetchToys();
}

// FETCH TOYS FUNCTIONS
function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((toysData) => addToys(toysData))
    .catch((error) => console.log(error.message));
}

function addToys(toysData) {
  for (let toy of toysData) {
    addToyElement(toy);
  }
}

function addToyElement(toy) {
  toyCollection.innerHTML += `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} width=200px, height=200px/>
    <p>${toy.likes}</p>
    <button data-id=${toy.id} class="like-btn">Like <3</button>
  </div>
  `;
}

// NEW TOY FUNCTIONS
function submitData(name, image) {
  let formData = {
    name: name,
    image: image,
    likes: 0,
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  };

  fetch("http://localhost:3000/toys", configObj)
    .then((resp) => resp.json())
    .then((toy) => addToyElement(toy))
    .catch((error) => console.log(error.message));
}

// UPDATE LIKES FUNCTIONS
function updateLikes(likes, id) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes }),
  };

  fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then((resp) => resp.json())
    .then((toy) => console.log(toy))
    .catch((error) => console.log(error.message));
}

// LISTENERS
toyCollection.addEventListener("click", () => {
  if (event.target.nodeName == "BUTTON") {
    let likes = event.target.parentNode.children[2];
    likes.innerText = parseInt(likes.innerText) + 1;
    updateLikes(likes.innerText, event.target.dataset.id);
  }
});

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

toyFormContainer.addEventListener("submit", () => {
  event.preventDefault();
  const name = event.target["name"].value;
  const image = event.target["image"].value;
  submitData(name, image);
});

// INVOKED FUNCTION
main();
