/**
 * The my-text-analyzer web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

// TODO: Kolla inputen, lägg in spärrar

import '../my-text-form/'
import '../my-text-displayer/'
import '../my-data-displayer/'
import '../my-specific-word-counter/'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    h1 {
      font-size: 2em;
      font-family: sans-serif;
      color: white;
      margin-bottom: 0;
      margin-left: 0.5em;
    }
  </style>

  <h1>My Text Analyzer</h1>
`

customElements.define('my-text-analyzer',
  class extends HTMLElement {
    #text

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.#addTextFormElementWithEventListener()
    }

    #addTextFormElementWithEventListener() {
      const textFormElement = document.createElement('my-text-form')
      this.shadowRoot.append(textFormElement)
      textFormElement.addEventListener('submitText', event => {
        this.#text = event.detail.text
        this.shadowRoot.querySelector('my-text-form').remove()
        this.#addTextDisplayerElementWithEventListener()
      })
    }

    #addTextDisplayerElementWithEventListener() {
      const textDisplayerElement = document.createElement('my-text-displayer')
      textDisplayerElement.setAttribute('text', this.#text)
      this.shadowRoot.append(textDisplayerElement)
      textDisplayerElement.addEventListener('resetText', event => {
        this.#text = ''
        this.shadowRoot.querySelector('my-text-displayer').remove()
        this.shadowRoot.querySelector('my-data-displayer').remove()
        this.#addTextFormElementWithEventListener()
      })
      this.#addDataDisplayerElement()
      this.#addSpecificWordCounterElement()
    }

    #addDataDisplayerElement() {
      const dataDisplayerElement = document.createElement('my-data-displayer')
      dataDisplayerElement.setAttribute('text', this.#text)
      this.shadowRoot.append(dataDisplayerElement)
    }

    #addSpecificWordCounterElement() {
      const specificWordCounterElement = document.createElement('my-specific-word-counter')
      specificWordCounterElement.setAttribute('text', this.#text)
      this.shadowRoot.append(specificWordCounterElement)
    }
  }
)
