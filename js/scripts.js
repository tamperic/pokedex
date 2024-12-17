// IIFE 
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Butterfree', height: 11, types: ['flying', 'poison']},
        {name: 'Rattata', height: 3, types: ['fighting', 'psychic']},
        {name: 'Wigglytuff', height: 10, types: ['ice', 'ghost']},
        {name: 'Meowth', height: 4, types: ['steel', 'electric']}
    ];

    //adds the Pokémon to the pokemonList array and checks if the typeof parameter is an object
    function add(pokemon) {
        if (typeof pokemon === 'object' ) {
            // validates whether all Object.keys() of the parameter are equal to the specific keys
            const validKeys = ['name', 'height', 'types'];
            if (validKeys.every(key => key in pokemon)) {
              pokemonList.push(pokemon);
            } else {
              alert('Your Pokémon must contain name, height, and types!');
            }
        }
    }

    // returns a pokemonList array
    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon)  {
        let list = document.querySelector('.pokemon-list'); // assigned the variable to the <ul> element

        let listItem = document.createElement('li'); // created a list element
        let button = document.createElement('button'); // created a button element
        button.innerText = pokemon.name; // added text of the Pokémon's names to the button element
        button.classList.add('button-class'); // added class attribute to the button element

        listItem.appendChild(button); // appended the button to the list item as its child
        list.appendChild(listItem); // appended the list item to the <ul> as its child

        button.addEventListener('click', function() {
            showDetails(pokemon);
        }); // added 'click' action to the Pokémon's buttons to show the name of Pokémon in the console
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }
    
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails
    };
})();
  
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Ninetales', height: 11, types: ['psychic', 'fire'] });
console.log(pokemonRepository.getAll()); 
  
// forEach() that iterates over each item in Pokemon's list
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    /* document.write(`<p> ${pokemon.name} (height: ${pokemon.height}) </p>`);
    if (pokemon.height > 10) {
        document.write(" - Wow, that’s big!");
    } else {
        document.write(" ");
    } */
}); 

/*
let text = '';
// loop that iterates over each item in Pokemon's list
for (let i = 0; i < pokemonList.length; i++)  {
    if (pokemonList[i].height > 10) {
        text = ' - Wow, that’s big!';
    } else {
        text = '';
    }
    document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}) ${text} </p>`);
} */

//  added filter() function to find specific Pokémon by name
function filterPokemon (name) {
    let result = pokemonRepository.getAll().filter((pokemon) => pokemon.name === name);
    console.log(result);
}; 
filterPokemon('Meowth');