/**
 * The my-word-searcher web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

// TODO: Importera createAnalyzers från 1DV610-L2 på GitHub

import { createAnalyzers } from '../../../../../1DV610-L2/src/app.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>

  <form id="word-input-form">
    <label>Count specific word (regardless of formatting):</label>
    <input type="text" id="input-field" placeholder="Your word here">
    <input type="submit" value="Count" id="submit-button">
  </form>
  <div id=word-count></div>
`
customElements.define('my-specific-word-counter',
  class extends HTMLElement {
    #inputField
    #wordCounter
    #wordCount

    constructor() {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#inputField = this.shadowRoot.querySelector('#input-field')
      this.#wordCount = this.shadowRoot.querySelector('#word-count')

      this.shadowRoot.querySelector('#word-input-form').addEventListener('submit', event => {
        event.preventDefault()
        this.#displayWordCount()
      })
    }

    static get observedAttributes() {
      return ['text']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'text' && oldValue !== newValue && newValue !== '') {
        this.#removeMessageIfExists()
        this.#getWordCounter()
      }
    }

    #getWordCounter() {
      const analyzers = createAnalyzers(this.getAttribute('text'))
      this.#wordCounter = analyzers.wordCounter
      this.setAttribute('text', '')
    }

    #displayWordCount() {
      try {
        const wordCount = this.#wordCounter.getSpecificWordCount(this.#inputField.value)
        this.#displayMessage(`Number of times "${this.#inputField.value}" appears: ${wordCount}`)
        this.#inputField.value = ''
      } catch (error) {
        const errorMessage = this.#getErrorMessage(error)
        this.#displayMessage(errorMessage)
      }
    }

    #getErrorMessage(error) {
      if (error.message === 'The submitted word is empty.') {
        return 'Invalid input. The submitted word is empty.'
      } else if (error.message === 'The submitted word does not have the right format.') {
        return 'Invalid input. The submitted word does not have the right format.'
      } else {
        return 'Something went wrong. Please try again.'
      }
    }

    #displayMessage(text) {
      this.#removeMessageIfExists()
      const paragraph = document.createElement('p')
      paragraph.textContent = text
      this.#wordCount.appendChild(paragraph)
    }

    #removeMessageIfExists() {
      if (this.#wordCount.firstChild) {
        this.#wordCount.firstChild.remove()
      }
    }
  }
)