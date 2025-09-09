class PokemonGrid extends HTMLElement {
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
    pokemons &&
      (this.shadowRoot.innerHTML = `
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
        ${pokemons
          .map(
            (pokemon) => `
          <div class="pokemon-card">
          <h4>#${pokemon.id}</h4>
            <img src="${pokemon.imageIcon}" alt="${
              pokemon.name
            }" loading="lazy">
            <h2>${
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            }</h2>
            <p>Type(s): ${pokemon.types
              .flatMap((t) => t.charAt(0).toUpperCase() + t.slice(1))
              .join(", ")}</p>
            <div class="pokemon-info">
            <p>Height: ${pokemon.height} | Weight: ${pokemon.weight}</p>
            </div>
            <button class="details-info" data-id="${
              pokemon.id
            }">Details</button>
          </div>
        `
          )
          .join("")}
      </div>
    `);

    this.shadowRoot.querySelectorAll(".details-info").forEach((btn) => {
      btn.onclick = () => {
        const poke = this._data.find((p) => p.id == btn.dataset.id);
        this.dispatchEvent(
          new CustomEvent("detail", {
            detail: poke,
            bubbles: true,
            composed: true,
          })
        );
      };
    });
  }
}

customElements.define("pokemon-grid", PokemonGrid);
