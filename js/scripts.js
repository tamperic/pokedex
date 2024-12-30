// IIFE 
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

    function showModal(name, height, img) {
        modalContainer.innerHTML = ''; // Clear all modal content
        
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal); // Close the modal by clicking the "X" button
        
        let nameElement = document.createElement('h1');
        nameElement.innerText = name;
        
        let heightElement = document.createElement('p');
        heightElement.innerText = height;
        
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', img);
        imageElement.setAttribute('alt', 'The Pokémon icon');
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(heightElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');
    }
    
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }
    
    // Close the modal by pressing the ESC key
    window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
    })
    
    // Close the modal by clicking outside of the modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
    })
  

    // Add the Pokémon to the pokemonList array and checks if the typeof parameter is an object
    function add(item) {
        if (typeof item === 'object' ) {
            // Validate whether all objects have specific keys
            const validKeys = ['name', 'detailsUrl'];
            if (validKeys.every(key => key in item)) {
              pokemonList.push(item);
            } else {
              alert('Your Pokémon must contain name and detailsUrl!');
            }
        }
    }

    // Return a pokemonList array
    function getAll() {
      return pokemonList;
    }

    // DOM manipulation; add a list of buttons to the array
    function addListItem(item)  {
        let list = document.querySelector('.pokemon-list'); // Assign the variable to the <ul> element

        let listItem = document.createElement('li'); // Create a list element
        let button = document.createElement('button'); // Create a button element
        button.innerText = item.name; // Add text of the Pokémon's names to the button element
        button.classList.add('button-class'); // Add class attribute to the button element

        listItem.appendChild(button); // Append the button to the list item as its child
        list.appendChild(listItem); // Append the list item to the <ul> as its child

        button.addEventListener('click', function() {
            showDetails(item);
        }); // Add 'click' action to the Pokémon's buttons to show the name of Pokémon in the console
    }

    // Fetch function to get data asynchronously from external source (apiUrl) and add each Pokémon to pokemonList
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // Fetch function, takes a Pokémon item as an argument
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            // added details to the item
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Load the Pokémon details from the API
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item.name.toUpperCase(), 'Height: ' + item.height, item.imageUrl);
        });
    }
    
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
})();
  
// forEach() that iterates over each item in Pokemon's list
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (item) {
        pokemonRepository.addListItem(item);
    }); 
});

/*
//  Add filter() function to find specific Pokémon by name
function filterPokemon (name) {
    let result = pokemonRepository.getAll().filter((item) => item.name === item);
    console.log(result);
}; 
filterPokemon('Meowth'); */