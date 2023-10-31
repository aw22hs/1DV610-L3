/**
 * The my-text-displayer web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
    #text-displayer {
      color: black;
      white-space: pre-wrap;
    }
    .text-box {
      padding-top: 1px;
      font-size: 0.8em;
      height: 400px;
      width: 90%;
      vertical-align: top;
      background-color: white;
    }
  </style>

  <div class="text-box" id=text-displayer>
  </div>
  <button id=reset-button>Reset</button>
`

customElements.define('my-text-displayer',
  class extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      
      this.shadowRoot.querySelector('#reset-button').addEventListener('click', event => {
        this.dispatchEvent(new CustomEvent('resetText', { bubbles: true }))
      })
    }

    static get observedAttributes() {
      return ['text']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'text' && oldValue !== newValue) {
        const textDisplayer = this.shadowRoot.querySelector('#text-displayer')
        textDisplayer.textContent = newValue
      }
    }
  }
)
