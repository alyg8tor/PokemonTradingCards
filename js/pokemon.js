
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
    const theData = getAPIData('https://pokeapi.co/api/v2/pokemon')
    .then(data => {
        for (const pokemon of data.results) {
            getAPIData(pokemon.url)
            .then(pokedata => {
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
        pokeOrder.textContent = data.order
        pokeFront.appendChild(pokeOrder)
    }
    
    function fillCardBack(pokeBack, data) {
        pokeBack.setAttribute('class', 'card__face card__face--back')
        let backDiv = document.createElement('div')
        backDiv.setAttribute('class', 'backDiv')
        let pokeHP = document.createElement('p')
        let pokeHeight = document.createElement('p')
        let name = document.createElement('h3')
        let pic = document.createElement('img')
        pic.setAttribute('class','picDiv')
        let pokeNum = getPokeNumber(data.id)
        name.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`
        pic.src = `pokemon.json/images/${pokeNum}.png`
        pokeHeight.textContent = data.height
        pokeHP.textContent = data.stats[0].base_stat
        pokeBack.appendChild(name)
        backDiv.appendChild(pokeHP)
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