/**
 * The my-text-updater web component module.
 *
 * @author Anja Willsund <mf223wk@student.lnu.se>
 * @version 1.0.0
 */

import { createAnalyzers } from '../../../../../1DV610-L2/src/app.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>

<form id="update-text-form">
    <label>Change specific word in the text:</label>
    <input type="text" id="word-to-replace-input" placeholder="Word to replace">
    <input type="text" id="new-word-input" placeholder="New word">
    <input type="submit" value="Update text" id="submit-button">
  </form>
  <div id=text-update-message></div>
`
customElements.define('my-text-updater',
  /**
   * Represents a web-component-template element.
   */
  class extends HTMLElement {
    #textUpdateMessage
    #updatedTextAnalyzer
    #updateTextForm
    /**
     * Creates an instance of the current type.
     */
    constructor() {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#updateTextForm = this.shadowRoot.querySelector('#update-text-form')
      this.#updateTextForm.addEventListener('submit', event => {
        this.#updateText(event, this.#updateTextForm.querySelector('#word-to-replace-input').value, this.#updateTextForm.querySelector('#new-word-input').value)
      })
      this.#textUpdateMessage = this.shadowRoot.querySelector('#text-update-message')
    }

    static get observedAttributes() {
      return ['text']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'text' && oldValue !== newValue) {
        this.#getUpdatedTextAnalyzer(newValue)
      }
    }

    #getUpdatedTextAnalyzer(text) {
      const analyzers = createAnalyzers(text)
      this.#updatedTextAnalyzer = analyzers.updatedTextAnalyzer
    }

    #updateText(event, wordToReplace, newWord) {
      event.preventDefault()
      try {
        const updatedText = this.#updatedTextAnalyzer.replaceWordsWithExactFormatting(wordToReplace, newWord)
        this.dispatchEvent(new CustomEvent('updateText', { bubbles: true, detail: { text: updatedText } }))
        this.#displayDifferenceFromOriginalText()
      } catch (error) {
        if (error.message === 'Invalid input. The submitted word is empty.') {
          this.#textUpdateMessage.textContent = 'Invalid input. One or both submitted words are empty.'
          return
        } else if (error.message === 'The submitted word does not have the right format.') {
          this.#textUpdateMessage.textContent = 'Invalid input. The submitted word does not have the right format.'
          return
        } else {
          this.#textUpdateMessage.textContent = 'Something went wrong. Please try again.'
          return
        }
      }
    }

    #displayDifferenceFromOriginalText() {
      if (!this.#updatedTextAnalyzer.textHasBeenUpdated()) {
        this.#textUpdateMessage.textContent = 'The original text and the updated text are the same.'
      } else if (this.#updatedTextAnalyzer.textHasBeenUpdated()) {
        const letterDifference = this.#updatedTextAnalyzer.getLetterCountDifferenceBetweenOriginalAndUpdatedText()
        if (this.#updatedTextAnalyzer.originalTextIsLongerThanUpdatedText()) {
          this.#textUpdateMessage.textContent = `The updated text is ${letterDifference} character(s) shorter than the original text.`
        } else {
          if (letterDifference === 0) {
            this.#textUpdateMessage.textContent = 'The original text and the updated text are the same length.'
          } else {
            this.#textUpdateMessage.textContent = `The updated text is ${letterDifference} character(s) longer than the original text.`
          }
        }
      }
    }
  }
)