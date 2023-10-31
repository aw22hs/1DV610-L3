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
import '../my-text-updater/'

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
      this.#addNewElement('my-text-displayer')
      this.shadowRoot.querySelector('my-text-displayer').addEventListener('resetText', event => {
        this.#text = ''
        this.#removeElements()
        this.#addTextFormElementWithEventListener()
      })
      this.#addNewElement('my-data-displayer')
      this.#addNewElement('my-specific-word-counter')
      this.#addMyTextUpdaterElementWithEventListener()
    }

    #addNewElement(elementType) {
      const newElement = document.createElement(elementType)
      newElement.setAttribute('text', this.#text)
      this.shadowRoot.append(newElement)
    }

    #addMyTextUpdaterElementWithEventListener() {
      this.#addNewElement('my-text-updater')
      this.shadowRoot.querySelector('my-text-updater').addEventListener('updateText', event => {
        this.#text = event.detail.text
        this.#updateText()
      })
    }

    #updateText() {
      this.shadowRoot.querySelector('my-text-displayer').setAttribute('text', this.#text)
      this.shadowRoot.querySelector('my-data-displayer').setAttribute('text', this.#text)
    }

    #removeElements() {
      this.shadowRoot.querySelector('my-text-displayer').remove()
      this.shadowRoot.querySelector('my-data-displayer').remove()
      this.shadowRoot.querySelector('my-specific-word-counter').remove()
      this.shadowRoot.querySelector('my-text-updater').remove()
    }
  }
)
