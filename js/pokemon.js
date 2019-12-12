
class Pokemon {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

const Thoremon = new Pokemon ()

const newButton = document.querySelector('#newPokemon')

newButton.addEventListener('click', function() {
    let pokeID = prompt('Enter Pokemon ID between 0 and 807')
    if (pokeID > 0 && pokeID <= 807) {
        getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
        .then(result => {
            populateDOM(result)
        })
    } else{
        alert('There is no Pokemon with that ID, please try again.')
    }
})

//imortant async function//
async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
    }
    
    //now use returned async data
    const theData = getAPIData('https://pokeapi.co/api/v2/pokemon?limit=27')
    .then(data => {
        for (const pokemon of data.results) {
            getAPIData(pokemon.url).then(pokedata => {
                populateDOM(pokedata)
            })
        }
    })
    
    let mainArea = document.querySelector('main')
    
    function populateDOM(single_pokemon) {
        let title = document.createElement('h1')
        let pokeScene = document.createElement('div')
        let pokeCard = document.createElement('div')
        let pokeFront = document.createElement('div')
        let pokeBack = document.createElement('div')
    
        title.textContent = 'pokemon'
        fillCardFront(pokeFront, single_pokemon)
        fillCardBack(pokeBack, single_pokemon)
    
        mainArea.setAttribute('class','charMain')
        pokeScene.setAttribute('class', 'scene')
        pokeCard.setAttribute('class', 'card')
        pokeCard.appendChild(pokeFront)
        pokeCard.appendChild(pokeBack)
        pokeScene.appendChild(pokeCard)
    
        mainArea.appendChild(pokeScene)
    
        pokeCard.addEventListener( 'click', function() {
            pokeCard.classList.toggle('is-flipped');
          });
    }
    
    function fillCardFront(pokeFront, data) {
        pokeFront.setAttribute('class', 'card__face card__face--front')
        let pokeOrder = document.createElement('h3')
        pokeOrder.textContent = data.id
        pokeFront.appendChild(pokeOrder)
    }
    
    function fillCardBack(pokeBack, data) {
        pokeBack.setAttribute('class', 'card__face card__face--back')
        let backDiv = document.createElement('div')
        backDiv.setAttribute('class', 'backDiv')
        let pokeHeight = document.createElement('p')
        let name = document.createElement('h3')
        let pic = document.createElement('img')
        pic.setAttribute('class','picDiv')
        let pokeNum = getPokeNumber(data.id)
        name.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`
        pic.src = `pokemon.json/images/${pokeNum}.png`
        pokeHeight.textContent = `Height: ${data.height}`
        let pokeType = document. createElement('p')
        pokeType.textContent = `${data.types[0].type.name[0].toUpperCase()}${data.types[0].type.name.slice(1)} Type`
        console.log(data.type)
        pokeBack.appendChild(name)
        backDiv.appendChild(pokeType)
        backDiv.appendChild(pokeHeight)
        pokeBack.appendChild(pic)
        pokeBack.appendChild(backDiv)
    }
    
    //important code//
    function getPokeNumber(id) {
        if(id < 10) return `00${id}`
        if(id > 9 && id < 100) {
            return `0${id}`
        } else return id
    }