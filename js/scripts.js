// IIFE 
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //adds the Pokémon to the pokemonList array and checks if the typeof parameter is an object
    function add(item) {
        if (typeof item === 'object' ) {
            // validates whether all objects have specific keys
            const validKeys = ['name', 'detailsUrl'];
            if (validKeys.every(key => key in item)) {
              pokemonList.push(item);
            } else {
              alert('Your Pokémon must contain name and detailsUrl!');
            }
        }
    }

    // returns a pokemonList array
    function getAll() {
      return pokemonList;
    }

    // DOM manipulation
    function addListItem(item)  {
        let list = document.querySelector('.pokemon-list'); // assigned the variable to the <ul> element

        let listItem = document.createElement('li'); // created a list element
        let button = document.createElement('button'); // created a button element
        button.innerText = item.name; // added text of the Pokémon's names to the button element
        button.classList.add('button-class'); // added class attribute to the button element

        listItem.appendChild(button); // appended the button to the list item as its child
        list.appendChild(listItem); // appended the list item to the <ul> as its child

        button.addEventListener('click', function() {
            showDetails(item);
        }); // added 'click' action to the Pokémon's buttons to show the name of Pokémon in the console
    }

    // fetch function to get data asynchronously from external source (apiUrl) and add each Pokémon to pokemonList
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

    // fetch function, takes a Pokémon item as an argument
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

    // load the Pokémon details from the API
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
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
  
// pokemonRepository.add({ name: 'Ninetales', height: 11, types: ['psychic', 'fire'] });
// console.log(pokemonRepository.getAll()); 
  
// forEach() that iterates over each item in Pokemon's list
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (item) {
        pokemonRepository.addListItem(item);
    }); 
});

/*
//  added filter() function to find specific Pokémon by name
function filterPokemon (name) {
    let result = pokemonRepository.getAll().filter((item) => item.name === item);
    console.log(result);
}; 
filterPokemon('Meowth'); */