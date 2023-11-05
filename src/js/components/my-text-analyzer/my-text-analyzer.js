/**
 * The my-text-analyzer web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import '../my-text-form/'
import '../my-text-displayer/'
import '../my-data-displayer/'
import '../my-specific-word-counter/'
import '../my-text-updater/'
import { template } from './my-text-analyzer-template.js'

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
      this.shadowRoot.querySelector("#upper-container").append(textFormElement)
      textFormElement.addEventListener('submitText', event => {
        this.#text = event.detail.text
        this.shadowRoot.querySelector('my-text-form').remove()
        this.#addTextDisplayerElementWithEventListener()
      })
    }

    #addTextDisplayerElementWithEventListener() {
      this.#addNewElement('my-text-displayer', '#upper-container')
      this.shadowRoot.querySelector('my-text-displayer').addEventListener('resetText', event => {
        this.#text = ''
        this.#removeElements()
        this.#addTextFormElementWithEventListener()
      })
      this.#addNewElement('my-data-displayer', '#data-container')
      this.#addNewElement('my-specific-word-counter', '#specific-word-counter-container')
      this.#addMyTextUpdaterElementWithEventListener()
    }

    #addNewElement(elementType, divId) {
      const newElement = document.createElement(elementType)
      newElement.setAttribute('text', this.#text)
      this.shadowRoot.querySelector(divId).appendChild(newElement)
    }

    #addMyTextUpdaterElementWithEventListener() {
      this.#addNewElement('my-text-updater', '#text-updater-container')
      this.shadowRoot.querySelector('my-text-updater').addEventListener('updateText', event => {
        this.#text = event.detail.text
        this.#updateText()
      })
    }

    #updateText() {
      this.shadowRoot.querySelector('my-text-displayer').setAttribute('text', this.#text)
      this.shadowRoot.querySelector('my-data-displayer').setAttribute('text', this.#text)
      this.shadowRoot.querySelector('my-specific-word-counter').setAttribute('text', this.#text)
    }

    #removeElements() {
      this.shadowRoot.querySelector('my-text-displayer').remove()
      this.shadowRoot.querySelector('my-data-displayer').remove()
      this.shadowRoot.querySelector('my-specific-word-counter').remove()
      this.shadowRoot.querySelector('my-text-updater').remove()
    }
  }
)
