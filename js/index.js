document.addEventListener('DOMContentLoaded', () => {
    const monsterForm = document.getElementById("monster-form")
    const monsterList = document.getElementById("monster-list")
    const backButton = document.getElementById("back")
    const forwardButton = document.getElementById("forward")
    
    listedMonsterData = 0

    displayFiftyMonsters()

    monsterForm.addEventListener('submit', createNewMonster)

    function createNewMonster(e){
        e.preventDefault()
        let newMonsterObject = { //remember, objects go in brackets
            name:e.target.name.value,
            age:e.target.age.value,
            description:e.target.description.value
        }
        console.log(newMonsterObject)
        renderMonster(newMonsterObject)
        addMonsterToList(newMonsterObject)
    }

    function renderMonster(newMonsterObject){
        let listedMonster = document.createElement('div')
        listedMonster.innerHTML = `
        <h2>${newMonsterObject.name}</h2>
        <p>Age: ${newMonsterObject.age}</p>
        Description: ${newMonsterObject.description}
        `
        monsterList.appendChild(listedMonster)
    }

    function displayFiftyMonsters(){
        fetch('http://localhost:3000/monsters')
        .then(res => res.json())
        .then(monsterData => monsterData.slice(listedMonsterData - 50, listedMonsterData).forEach(monster => renderMonster(monster)))
        listedMonsterData += 50
    }

    function addMonsterToList(newMonsterObject){
        console.log(JSON.stringify(newMonsterObject))
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newMonsterObject)
        })
        .then(res => res.json())
        .then(monster => console.log(monster))
    }

    forwardButton.addEventListener('click', () => {
        monsterList.innerText = ""
        displayFiftyMonsters()
    })

    backButton.addEventListener('click', () => {
        if (listedMonsterData >= 100){
            monsterList.innerText = ""
            listedMonsterData -= 100
            displayFiftyMonsters()
        }
    })
})