import "./components/pokemon-card.js";
import "./components/pokemon-grid.js";
import "./components/pokemon-table.js";

class PokemonApp extends HTMLElement {
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

  async fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9");
      const data = await response.json();
      this.pokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url).then((res) => res.json());
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
              { name: "Speed", value: res.stats[5].base_stat },
            ],
          };
        })
      );
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  }

  toggleView(view) {
    this.view = view;
    this.render();
  }

  showDetail(pokemon) {
    const modal = document.createElement("pokemon-card");
    modal.data = pokemon;
    document.body.appendChild(modal);
  }

  renderTable(content) {
    const table = document.createElement("pokemon-table");
    table.data = this.pokemons; //setter
    table.addEventListener("detail", (e) => this.showDetail(e.detail));
    content.appendChild(table);
  }

  renderList(content) {
    const grid = document.createElement("pokemon-grid");
    grid.data = this.pokemons; //setter
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
        <button class="${
          this.view === "table" ? "active" : ""
        }" id="btnTable"><img src="images/table-view.png" alt="Table View" width="30" height="40" loading="lazy"></button>
      
        <button class="${
          this.view === "grid" ? "active" : ""
        }" id="btnGrid"><img src="images/grid-view.png" alt="Grid View" width="30" height="30" loading="lazy"></button>
      </div>
    
      <div class="content"></div>
    `;

    this.shadowRoot.querySelector("#btnTable").onclick = () =>
      this.toggleView("table");
    this.shadowRoot.querySelector("#btnGrid").onclick = () =>
      this.toggleView("grid");

    const content = this.shadowRoot.querySelector(".content");
    if (this.view === "table") {
      this.renderTable(content);
    } else if (this.view === "grid") {
      this.renderList(content);
    }
  }
}

customElements.define("pokemon-app", PokemonApp);
