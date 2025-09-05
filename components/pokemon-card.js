class PokemonCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  set data(values) {
    this._data = values;
    this.render();
  }

  render() {
    const pokemon = this._data;
    pokemon &&
      (this.shadowRoot.innerHTML = `
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
          <h2>#${pokemon.id} ${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      }</h2>
          <img src="${pokemon.image}" alt="${
        pokemon.name
      }" width="150" height="150" loading="lazy"/>
      <div class="pokemon-data">
          <p>Height: ${pokemon.height} | Weight: ${pokemon.weight}</p>
          <p>Type(s): ${pokemon.types
            .flatMap((t) => t.charAt(0).toUpperCase() + t.slice(1))
            .join(", ")}</p>
          <p>Abilities: ${pokemon.abilities
            .flatMap((a) => a.charAt(0).toUpperCase() + a.slice(1))
            .join(", ")}</p>
          <h3>Stats</h3>
          ${pokemon.stats
            .map(
              (s) => `
            <div class="pokemon-stats">
              <small>${s.name}: ${s.value}</small>
              <div class="bar"><div class="fill" style="width:${Math.min(
                s.value,
                100
              )}%"></div></div>
            </div>
          `
            )
            .join("")}
          </div>
      </div>
      `);

    this.shadowRoot.querySelector(".closeCard").onclick = () => this.remove();
    this.remove();
  }
}

customElements.define("pokemon-card", PokemonCard);
