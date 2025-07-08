# Pokedex

## Project description

**Pokedex** is a web app that allows users to find a list of Pokémons, and also to view more details of a particular Pokémon by clicking on that Pokémon. It was built using vanilla JavaScript and PokéAPI for fetching data about Pokémons.

___

##  Features

- Responsive design for different screen sizes using Bootstrap.
- Use PokéAPI to get Pokémon data dynamically.
- Browser support using polyfills for compatibility with older browsers.

___

## How to Use

On the homepage is displayed a list of Pokémon as clickable buttons. Clicking a Pokémon opens a modal container containing more details about selected Pokémon, such as:
- Name
- Height
- Weight
- Type(s).

The modal container can be closed by clicking the `X` button, the `Close` button, or anywhere outside the modal.

___

## Tech Stack

- **HTML** 
- **CSS**
- **Bootstrap** 
- **JavaScript**
- **Polyfills**: <br/> 
    **fetch-polyfill.js** for older browser support of Fetch API, and <br/>
    **promise-polyfill.js** for supporting Promises.
- **PokéAPI** - used the [_PokéAPI_](https://pokeapi.co/) to fetch data of each Pokémon.
- Deployed on **GitHub Pages**.

___

## Geting Started

### Prerequisites

Install dependencies `npm install` or `yarn install`.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tamperic/pokedex.git
   
2. Navigate to the project:
    ```bash
    cd pokedex

3. Open index.html in a browser, or use a simple local server (e.g. with VSCode Live Server).

___

## Screenshots

<div>
    <img src="img/Pokedex - Screenshot(1).png">
    <img src="img/Pokedex - Screenshot(2).png">
</div>

___

## Live Demo

Check out the **Pokedex** app deployed on GitHub Pages: <br/>
[Pokedex Live Demo](https://tamperic.github.io/pokedex/)