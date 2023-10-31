/**
 * The my-word-searcher web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import { createAnalyzers } from '../../../../../1DV610-L2/src/app.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>

  <form id="word-input-form">
    <label>Count specific word:</label>
    <input type="text" id="input-field" placeholder="Your word here">
    <input type="submit" value="Count" id="submit-button">
  </form>
  <div id=word-count></div>
`
customElements.define('my-specific-word-counter',
  /**
   * Represents a web-component-template element.
   */
  class extends HTMLElement {
    #inputField
    #wordCounter
    #wordInputForm
  
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#wordInputForm = this.shadowRoot.querySelector('#word-input-form')
      this.#inputField = this.shadowRoot.querySelector('#input-field')
      this.#wordInputForm.addEventListener('submit', event => {
        this.#countWord(event, this.#inputField.value)
      })
    }

    static get observedAttributes() {
      return ['text']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'text' && oldValue !== newValue) {
        this.#getWordCounter(newValue)
      }
    }

    #getWordCounter(text) {
      const analyzers = createAnalyzers(text)
      this.#wordCounter = analyzers.wordCounter
    }

    #countWord(event, word) {
      event.preventDefault()
      this.#inputField.value = ''
      const wordCount = this.#wordCounter.getSpecificWordCount(word)
      this.#addVisibleWordCount(word, wordCount)
    }

    #addVisibleWordCount(word, wordCount) {
      if (this.shadowRoot.querySelector('#word-count').firstChild) {
        this.shadowRoot.querySelector('#word-count').firstChild.remove()
      }
      const textNode = document.createTextNode(`Number of times "${word}" appears: ${wordCount}`)
      this.shadowRoot.querySelector('#word-count').appendChild(textNode)
    }
  }
)