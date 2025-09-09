(() => {
  // components/pokemon-card.js
  var PokemonCard = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({
        mode: "open"
      });
    }
    set data(values) {
      this._data = values;
      this.render();
    }
    render() {
      const pokemon = this._data;
      pokemon && (this.shadowRoot.innerHTML = `
      <style>
        .pokemon-overlay {
          position: fixed; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%;
          background:rgba(68, 68, 68, 0.21);
          backdrop-filter: blur(15px);
          display: flex; 
          justify-content: center; 
          align-items: center;
          z-index: 1000;
        }
        
        .closeCard { 
          position: relative; 
          float: right;
          top: 15%;
          right: 1%;
          cursor: pointer; 
          font-weight: bold; 
          color: #f4dfbdff;
        }

        .pokemon-card {
          position: relative;
          z-index: 1;
          width: 600px;
          padding: 1rem;
          text-align: center;
          border-radius: 12px;
          background-color: #f4dfbd77;
          box-shadow: 0 2px 8px rgba(76, 58, 4, 0.94);
        }

        .pokemon-card img {
          max-width: 100%;
          height: auto;
          filter: drop-shadow(0px 0px 12px rgba(244, 156, 78, 0.86)) drop-shadow(0px 0px 8px rgba(250, 231, 123, 0.86));
        }
          
        .bar { 
          height: 10px; 
          background: #fceab6ff; 
          margin: .2rem 0; 
          border-radius: 5px; 
          overflow: hidden; 
        }

        .fill { 
          height: 100%; 
          background: #db9243;
        }
        
        h4, h2, h3 {
          font-weight: bold;
          color: #503207ff;
        }
        h4 {
          float: right;
          margin: 0;
        } 
        h3 {
          margin-top: 2rem;
          margin-bottom: 0.5rem;
        }
        p {
          color: #6b4607ff;
          font-weight: bold;
        }
        .pokemon-data {
          margin: .5rem 0;
          grid-template-columns: 2fr 1fr;
          gap: .5rem;
          color: #503207ff;
          font-size: 1.15rem;
        }
        .pokemon-stats {
          grid-template-columns: 2fr 1fr;
          gap: .5rem;
          margin: .5rem 1rem;
          padding-bottom: .5rem;
          text-align: left;
          color: ##513402;
        }

      </style>
      <div class="pokemon-overlay">
          <div class="pokemon-card">
          <span class="closeCard">x</span>
          <h2>#${pokemon.id} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <img src="${pokemon.image}" alt="${pokemon.name}" width="150" height="150" loading="lazy"/>
      <div class="pokemon-data">
          <p>Height: ${pokemon.height} | Weight: ${pokemon.weight}</p>
          <p>Type(s): ${pokemon.types.flatMap((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(", ")}</p>
          <p>Abilities: ${pokemon.abilities.flatMap((a) => a.charAt(0).toUpperCase() + a.slice(1)).join(", ")}</p>
          <h3>Stats</h3>
          ${pokemon.stats.map(
        (s) => `
            <div class="pokemon-stats">
              <small>${s.name}: ${s.value}</small>
              <div class="bar"><div class="fill" style="width:${Math.min(
          s.value,
          100
        )}%"></div></div>
            </div>
          `
      ).join("")}
          </div>
      </div>
      `);
      this.shadowRoot.querySelector(".closeCard").onclick = () => this.remove();
      this.remove();
    }
  };
  customElements.define("pokemon-card", PokemonCard);

  // components/pokemon-grid.js
  var PokemonGrid = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    // set data(values) {
    //   this._data = values;
    //   this.render();
    // }
    static get observedAttributes() {
      return ["data"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "data") {
        this._data = JSON.parse(newValue);
        this.render();
      }
    }
    render() {
      const pokemons = this._data;
      pokemons && (this.shadowRoot.innerHTML = `
      <style>
        .pokemon-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .pokemon-card {
          padding: 1rem;
          text-align: center;
          backdrop-filter: blur(42px);
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(83, 24, 10, 1);
          cursor: pointer;
        }

        .pokemon-card img {
          height: auto;
          max-height: 80px;
        }
        
        .pokemon-info {
          display: flex;
          justify-content: space-evenly;
        }
        
        h4, h2 {
          font-weight: bold;
          color: #e2c289ff;
          text-shadow: 0px 0px 4px rgba(16, 2, 2, 0.6);
        }

        h4 {
          float: right;
          margin: 0;
        } 

        p {
          color: #c29355ff;
          font-weight: bold;
        }
        
        .details-info {
          border: 1px solid transparent;
          background-color: #fcb45d49;
          color: #c88c54ff;
          cursor: pointer;
          font-weight: bold;
          padding: .5rem;
          border-radius: 8px;
          margin-top: 1rem;
          width: 65%;
        }  
        .details-info:hover {
          border: 1px solid #86632eff;
          background: none;
          color: #f9e496ff;
        }

      </style>
      <div class="pokemon-grid">
        ${pokemons.map(
        (pokemon) => `
          <div class="pokemon-card">
          <h4>#${pokemon.id}</h4>
            <img src="${pokemon.imageIcon}" alt="${pokemon.name}" loading="lazy">
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <p>Type(s): ${pokemon.types.flatMap((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(", ")}</p>
            <div class="pokemon-info">
            <p>Height: ${pokemon.height} | Weight: ${pokemon.weight}</p>
            </div>
            <button class="details-info" data-id="${pokemon.id}">Details</button>
          </div>
        `
      ).join("")}
      </div>
    `);
      this.shadowRoot.querySelectorAll(".details-info").forEach((btn) => {
        btn.onclick = () => {
          const poke = this._data.find((p) => p.id == btn.dataset.id);
          this.dispatchEvent(
            new CustomEvent("detail", {
              detail: poke,
              bubbles: true,
              composed: true
            })
          );
        };
      });
    }
  };
  customElements.define("pokemon-grid", PokemonGrid);

  // components/pokemon-table.js
  var PokemonTable = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    // set data(values) {
    //   this._data = values;
    //   this.render();
    // }
    static get observedAttributes() {
      return ["data"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "data") {
        this._data = JSON.parse(newValue);
        this.render();
      }
    }
    render() {
      const pokemons = this._data;
      pokemons && (this.shadowRoot.innerHTML = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          backdrop-filter: blur(20px);
          box-shadow: 0 2px 8px rgba(56, 37, 26, 1);
        }
        th, td {
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #391b0394;
          color: #f4dfbdff;
          padding-left: 1rem;
        }
        th:first-child {
          border-top-left-radius: 14px;
        }
        tr:last-child td:first-child {
          border-bottom-left-radius: 14px;
        }
        th:last-child {
          border-top-right-radius: 14px;
        }
        tr:last-child td:last-child {
          border-bottom-right-radius: 14px;
        }
        tr {
          color: rgba(231, 211, 170, 1);
          font-weight: bold;
          padding-left: 1rem;
        }
        tr:nth-child(even) {
          background-color: #fbae6141;
        }
        tr:hover {
          background-color: #c182426c;
          cursor: pointer;
        }
          td:first-child {
          padding-left: 1rem;
        }
        .see-detail {
          border: none;
          background: none;
          cursor: pointer;
          align-self: center;
          color: #075030ff;
          font-weight: bold;
          overflow: hidden;
        }
        .see-detail img {
          filter: drop-shadow(0px -100px 0px rgba(215, 194, 152, 1));
          transform: translateY(100px);
        }
      </style>
      <table>
        <thead>
          <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type(s)</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Image</th>
          <th>Details</th>
          </tr>
        </thead>
        <tbody>
          ${pokemons.map(
        (p) => `
            <tr data-name="${p.name}">
            <td>${p.id}</td>
            <td>${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</td>
            <td>${p.types.flatMap((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" | ")}</td>
            <td>${p.height}</td>
            <td>${p.weight}</td>
            <td><img src="${p.imageIcon}" alt="${p.name}" width="40" height="40" loading="lazy"></td> 
            <td><button class="see-detail" data-id="${p.id}"><img src="images/see-detail.png" width="25" height="25" alt="Pokedex" loading="lazy"></button></td> 
            </tr>
          `
      ).join("")}
        </tbody>
      </table>
    `);
      this.shadowRoot.querySelectorAll(".see-detail").forEach((btn) => {
        btn.onclick = () => {
          const poke = this._data.find((p) => p.id == btn.dataset.id);
          this.dispatchEvent(
            new CustomEvent("detail", {
              detail: poke,
              bubbles: true,
              composed: true
            })
          );
        };
      });
    }
  };
  customElements.define("pokemon-table", PokemonTable);

  // pokemon-app.js
  var PokemonApp = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.view = "table";
      this.pokemons = [];
    }
    async connectedCallback() {
      await this.fetchPokemons();
      this.render();
    }
    static get observedAttributes() {
      return ["view"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "view" && oldValue !== newValue) {
        this.view = newValue;
        this.render();
      }
    }
    async fetchPokemons() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9");
        const data = await response.json();
        this.pokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url).then((res2) => res2.json());
            return {
              id: res.id,
              name: res.name,
              height: res.height,
              weight: res.weight,
              image: res.sprites.other["official-artwork"].front_default,
              imageIcon: res.sprites.other.showdown.front_default,
              types: res.types.map((type) => type.type.name),
              abilities: res.abilities.map((a) => a.ability.name),
              stats: [
                { name: "Hp", value: res.stats[0].base_stat },
                { name: "Attack", value: res.stats[1].base_stat },
                { name: "Defense", value: res.stats[2].base_stat },
                { name: "Special-Attack", value: res.stats[3].base_stat },
                { name: "Special-Defense", value: res.stats[4].base_stat },
                { name: "Speed", value: res.stats[5].base_stat }
              ]
            };
          })
        );
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    }
    // toggleView(view) {
    //   this.view = view;
    //   this.render();
    // }
    showDetail(pokemon) {
      const modal = document.createElement("pokemon-card");
      modal.data = pokemon;
      document.body.appendChild(modal);
    }
    renderTable(content) {
      const table = document.createElement("pokemon-table");
      table.setAttribute("data", JSON.stringify(this.pokemons));
      table.addEventListener("detail", (e) => this.showDetail(e.detail));
      content.appendChild(table);
    }
    renderList(content) {
      const grid = document.createElement("pokemon-grid");
      grid.setAttribute("data", JSON.stringify(this.pokemons));
      grid.addEventListener("detail", (e) => this.showDetail(e.detail));
      content.appendChild(grid);
    }
    render() {
      this.shadowRoot.innerHTML = `
      <style>
        .actions {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;
          gap: .5rem;
        }

        button {
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 8px;
          align-items: center;
          display: flex;
          overflow: hidden;
        }

        button.active {
          background-color: #804327a8;
        }
              
        button img {
          filter: drop-shadow(0px -100px 0px rgba(238, 217, 176, 1));
          transform: translateY(100px);
        }

      </style>
      <div class="actions">
        <button class="${this.view === "table" && "active"}" id="btnTable"><img src="images/table-view.png" alt="Table View" width="30" height="40" loading="lazy"></button>
      
        <button class="${this.view === "grid" && "active"}" id="btnGrid"><img src="images/grid-view.png" alt="Grid View" width="30" height="30" loading="lazy"></button>
      </div>
    
      <div class="content"></div>
    `;
      this.shadowRoot.querySelector("#btnTable").onclick = () => this.setAttribute("view", "table");
      this.shadowRoot.querySelector("#btnGrid").onclick = () => this.setAttribute("view", "grid");
      const content = this.shadowRoot.querySelector(".content");
      if (this.view === "table") {
        this.renderTable(content);
      } else if (this.view === "grid") {
        this.renderList(content);
      }
    }
  };
  customElements.define("pokemon-app", PokemonApp);
})();
