// IIFE 
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Butterfree', height: 11, types: ['flying', 'poison']},
        {name: 'Rattata', height: 3, types: ['fighting', 'psychic']},
        {name: 'Wigglytuff', height: 10, types: ['ice', 'ghost']},
        {name: 'Meowth', height: 4, types: ['steel', 'electric']}
    ];

    //adds the Pokémon to the pokemonList array
    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    // returns a pokemonList array
    function getAll() {
      return pokemonList;
    }
    
    return {
      add: add,
      getAll: getAll
    };
})();
  
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Ninetales', height: 11, types: ['psychic', 'fire'] });
console.log(pokemonRepository.getAll()); 
  
// forEach() that iterates over each item in Pokemon's list
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(`<p> ${pokemon.name} (height: ${pokemon.height}) </p>`);
    if (pokemon.height > 10) {
        document.write(" - Wow, that’s big!");
    } else {
        document.write(" ");
    } 
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