class PokemonTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.pokemons = [];
  }
  set data(values) {
    this._data = values;
    this.render();
  }
  render() {
    const pokemons = this._data;
    pokemons &&
      (this.shadowRoot.innerHTML = `
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
          ${pokemons
            .map(
              (p) => `
            <tr data-name="${p.name}">
            <td>${p.id}</td>
            <td>${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</td>
            <td>${p.types
              .flatMap((t) => t.charAt(0).toUpperCase() + t.slice(1))
              .join(" | ")}</td>
            <td>${p.height}</td>
            <td>${p.weight}</td>
            <td><img src="${p.imageIcon}" alt="${
                p.name
              }" width="40" height="40" loading="lazy"></td> 
            <td><button class="see-detail" data-id="${
              p.id
            }"><img src="images/see-detail.png" width="25" height="25" alt="Pokedex" loading="lazy"></button></td> 
            </tr>
          `
            )
            .join("")}
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
            composed: true,
          })
        );
      };
    });
  }
}

customElements.define("pokemon-table", PokemonTable);
