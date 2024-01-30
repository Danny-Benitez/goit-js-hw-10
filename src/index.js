import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');

const loader = document.querySelector('.loader');

const error = document.querySelector('.error');

const catInfo = document.querySelector('.cat-info');

function populateOptions(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function getCatInfo(catData, selectedBreed) {
  catInfo.innerHTML = '';

  const catofSelectedBreed = catData.filter(cat => {
    return cat.breeds.some(breed => breed.id === selectedBreed);
  });

  /* what is the action of the catofSelectedBreed variable? 
    The variable filters through the catData Arr.ofObj. then iterates and returns an array of cat breed id's 
    within the cat object with a value equal to the selectedBreed id in the options selector*/

  catofSelectedBreed.forEach(cat => {
    const catElement = document.createElement('div');

    catElement.innerHTML = `<img src="${cat.url}" alt="${cat.breeds[0].name}">
<div class="cat-details"><p class = "cat-breed"><strong>Breed: </strong>${cat.breeds[0].name}</p>
<p class = "cat-description"><strong>Description: </strong>${cat.breeds[0].description}</p>
<p class = "cat-temperament"><strong>Temperament: </strong>${cat.breeds[0].temperament}</p></div>`;

    catInfo.appendChild(catElement);
  });
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

breedSelect.addEventListener('change', () => {
  const selectedBreed = breedSelect.value;

  if (selectedBreed) {
    showLoader();
    hideError();

    fetchCatByBreed(selectedBreed)
      .then(catData => {
        getCatInfo(catData, selectedBreed);
        hideLoader();
      })
      .catch(() => {
        showError();
        hideLoader();
      });
  } else {
    catInfo.innerHTML = ' ';
  }
});

fetchBreeds()
  .then(breeds => {
    populateOptions(breeds);
    hideLoader();
  })
  .catch(() => {
    showError();
    hideLoader();
  });
