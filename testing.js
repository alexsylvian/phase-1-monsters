// js/index.js

document.addEventListener("DOMContentLoaded", () => {
    const monsterForm = document.querySelector("#monster-form");
    const monsterList = document.querySelector("#monster-list");
    const loadMoreButton = document.querySelector("#load-more");
    
    let currentPage = 1;
  
    // Function to fetch and display monsters
    function fetchMonsters(page) {
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
          monsters.forEach(monster => {
            const monsterDiv = document.createElement("div");
            monsterDiv.innerHTML = `
              <h2>${monster.name}</h2>
              <p>Age: ${monster.age}</p>
              <p>Description: ${monster.description}</p>
            `;
            monsterList.appendChild(monsterDiv);
          });
        });
    }
  
    // Function to create a new monster
    function createMonster(event) {
      event.preventDefault();
      const name = document.querySelector("#name").value;
      const age = parseFloat(document.querySelector("#age").value);
      const description = document.querySelector("#description").value;
  
      const monsterData = { name, age, description };
  
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(monsterData)
      })
        .then(response => response.json())
        .then(newMonster => {
          const monsterDiv = document.createElement("div");
          monsterDiv.innerHTML = `
            <h2>${newMonster.name}</h2>
            <p>Age: ${newMonster.age}</p>
            <p>Description: ${newMonster.description}</p>
          `;
          monsterList.appendChild(monsterDiv);
          monsterForm.reset();
        });
    }
  
    // Event listeners
    monsterForm.addEventListener("submit", createMonster);
  
    loadMoreButton.addEventListener("click", () => {
      currentPage++;
      fetchMonsters(currentPage);
    });
  
    // Initial fetch
    fetchMonsters(currentPage);
  });
  