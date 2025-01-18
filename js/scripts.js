// IIFE 
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
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
        let list = document.querySelector('.list-group'); // Assign the variable to the <ul> element

        let listItem = document.createElement('li'); // Create a list element
        listItem.classList.add('list-group-item'); // Add a class attribute to the li element

        let button = document.createElement('button'); // Create a button element
        button.innerText = item.name; // Add text of the Pokémon's names to the button element
        button.classList.add('btn', 'btn-primary'); // Add a class attribute to the button element
        button.setAttribute('data-toggle', 'modal'); // Add an attribute for event listener (created from Bootstrap)
        button.setAttribute('data-target', '#detailsModal'); // Add an attribute on the button element to refer to the modal

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
            item.weight = details.weight;
            item.types = details.types.map(type => type.type.name).join(', ');
            // added details to the item
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showModal(name, height, weight, types, img) {
        let nameElement = document.querySelector('.modal-title');
        nameElement.innerText = name;
        
        let heightElement =  document.querySelector('.heightElement');
        heightElement.innerText = height;

        let weightElement =  document.querySelector('.weightElement');
        weightElement.innerText = weight;

        let typesElement =  document.querySelector('.typesElement');
        typesElement.innerText = types;
        
        let imageElement = document.querySelector('.imageElement');
       imageElement.setAttribute('src', img);
        
        let modalBody = document.querySelector('.modal-body');
        
        modalBody.appendChild(imageElement);
        modalBody.appendChild(heightElement);
        modalBody.appendChild(weightElement);  
        modalBody.appendChild(typesElement); 
    }

    // Load the Pokémon details from the API
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item.name.toUpperCase(), 'Height: ' + item.height, 'Weight: ' + item.weight, 'Type(s): ' + item.types, item.imageUrl);
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