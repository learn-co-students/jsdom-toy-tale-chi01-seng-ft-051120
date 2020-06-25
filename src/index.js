let addToy = false;
const toyUrl = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addToyInfo();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function addToyInfo() {
  fetch(toyUrl)
  .then (response => response.json())
  .then (json => renderToys(json))
}

function renderToys(json) {
  json.forEach(toy => {
    renderToy(toy)
  })
}

let form = document.getElementsByClassName('add-toy-form')[0]

form.addEventListener("submit", addNewToy)

function addNewToy() {
  event.preventDefault;
  toyData = {
    name: event.target['name'].value,
    image: event.target['image'].value,
    likes: 0
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)   
  };

  fetch(toyUrl, configObj)
  .then(response => response.json())
  .then(toy => renderToy(toy))
}

function renderToy(toy) {
  const toyCollection = document.getElementById("toy-collection") 
  const card = document.createElement('div');
  card.className = "card";
  card.id = toy.id
  toyCollection.appendChild(card);
  const h2 = document.createElement('h2');
  h2.textContent = toy.name;
  card.appendChild(h2);
  const pic = document.createElement('img');
  pic.src = toy.image;
  pic.className = "toy-avatar";
  card.appendChild(pic);
  const p = document.createElement('p');
  if (toy.likes === 1) {
    p.textContent = "1 like";
  } else {
    p.textContent = `${toy.likes} likes`;
  }
  card.appendChild(p)
  const like = document.createElement('button');
  like.className = "like-btn";
  like.name = `${toy.id}`
  like.textContent = "Like <3";
  like.addEventListener("click", addLike);
  card.appendChild(like)
} 

function addLike() {
  const id = this.name 
  console.log(id)

  let thisToyUrl = toyUrl + "/" + id ;

  let thisCard = document.getElementById(`${id}`);
  let theseLikes = thisCard.querySelector('p');
  let likeAmount = parseInt(theseLikes.textContent.split(" ")[0]) + 1;
  console.log(typeof likeAmount)

  console.log(thisToyUrl)
  
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likeAmount
    })
  }

  fetch(thisToyUrl, configObj)
  .then(response => response.json())
  .then(json => renderLike(json, id))
}

function renderLike(json, id) {
  let thisCard = document.getElementById(`${id}`);
  let theseLikes = thisCard.querySelector('p');
  if (json.likes === 1) {
    theseLikes.textContent = "1 like";
  } else {
    theseLikes.textContent = `${json.likes} likes`;
  }
}
