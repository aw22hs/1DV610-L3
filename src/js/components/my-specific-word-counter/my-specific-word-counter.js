/**
 * The my-word-searcher web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import { createAnalyzers } from 'text-analyzer'

const template = document.createElement('template')
template.innerHTML = `
  <style>
  </style>

  <form id="word-input-form">
    <label part="label">Count specific word (regardless of formatting):</label>
    <input part="text-input-field input" type="text" id="input-field" placeholder="Your word here">
    <input part="button input" type="submit" value="Count" id="count-word-submit-button">
  </form>
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
        return 'The submitted word is empty. Please try again.'
      } else if (error.message === 'The submitted word does not have the right format.') {
        return 'The submitted word does not have the right format. Please try again.'
      } else if (error.message === 'The submitted word is too long.') {
        return 'The submitted word is too long, maximum 50 characters allowed. Please try again.'
      } else {
        return 'Something went wrong. Please try again.'
      }
    }

    #displayMessage(text) {
      this.#removeMessageIfExists()
      const paragraph = document.createElement('p')
      paragraph.setAttribute('id', 'submit-word-count-message')
      paragraph.setAttribute('part', 'message')
      paragraph.textContent = text
      this.shadowRoot.querySelector('#word-input-form').appendChild(paragraph)
    }

    #removeMessageIfExists() {
      if (this.shadowRoot.querySelector('#submit-word-count-message')) {
        this.shadowRoot.querySelector('#submit-word-count-message').remove()
      }
    }
  }
)