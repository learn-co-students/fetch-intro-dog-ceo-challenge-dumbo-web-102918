// console.log('%c HI', 'color: firebrick')

const imageContainer = document.getElementById('dog-image-container');
const ul = document.getElementById('dog-breeds');
const dropdownFilter = document.getElementById('breed-dropdown');
fetchDogs();
fetchBreeds();
dropdownFilter.addEventListener('change', filter)

function fetchDogs(){
  fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(res => res.json())
    .then(json => loadAllDogs(json))
}

function loadAllDogs(json){
  json.message.forEach(function(dog){
    let dogDiv = document.createElement('div');
    dogDiv.innerHTML = `<img src=${dog}>`
    imageContainer.appendChild(dogDiv);
  })
}

function fetchBreeds(){
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(json => {

      for(let breed in json.message){
        let li = document.createElement('li');
        li.innerText = breed;
        li.addEventListener('click', changeLiColor)
        ul.appendChild(li);
      }
    })
}
function changeLiColor(e){
  // e.target.style.onMouseOver="this.style.cursor='pointer'"
  e.target.style.color = 'green';
}

function filter(e){
  // console.log(dropdownFilter.value);
  while(ul.hasChildNodes()){
    ul.removeChild(ul.firstChild);
  }
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(json => {

  for(let breed in json.message){
    if (breed.startsWith(dropdownFilter.value)){
      let li = document.createElement('li');
      li.innerText = breed;
      li.addEventListener('click', changeLiColor)
      ul.appendChild(li);
    }
  }
  })
}
