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
      color: rgb(42, 42, 42);
      white-space: pre-wrap;
      overflow: scroll;
      background-color: rgb(255, 255, 255, 0.8);
    }
    p {
      margin: 0;
    }

  </style>

  <div part=text-box id=text-displayer>
  </div>
  <button part="button" id=reset-button>Reset</button>
`

customElements.define('my-text-displayer',
  class extends HTMLElement {
    #textDisplayer

    constructor() {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#textDisplayer = this.shadowRoot.querySelector('#text-displayer')
      
      this.shadowRoot.querySelector('#reset-button').addEventListener('click', event => {
        this.dispatchEvent(new CustomEvent('resetText', { bubbles: true }))
      })
    }

    static get observedAttributes() {
      return ['text']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'text' && oldValue !== newValue && newValue !== '') {
        this.#displayText()
      }
    }

    #displayText() {
      this.#removeTextIfExists()
      const paragraph = document.createElement('p')
      paragraph.textContent = this.getAttribute('text')
      this.#textDisplayer.appendChild(paragraph)
      this.setAttribute('text', '')
    }

    #removeTextIfExists() {
      if (this.#textDisplayer.firstChild) {
        this.#textDisplayer.firstChild.remove()
      }
    }
  }
)
