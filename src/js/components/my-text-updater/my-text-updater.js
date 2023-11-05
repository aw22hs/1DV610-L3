/**
 * The my-text-updater web component module.
 *
 * @author Anja Willsund <mf223wk@student.lnu.se>
 * @version 1.0.0
 */

// TODO: Importera createAnalyzers från 1DV610-L2 på GitHub

import { createAnalyzers } from '../../../../../1DV610-L2/src/app.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    form label {
      font-size: 1.5em;
    }
    form p {
      margin: 1em 0.5em 0em 0em;
      display: inline-block;
    }
    
  </style>

<form id="update-text-form">
    <label>Change specific word in the text (only replaces words that has the exact same formatting 
        as the submitted word):</label>
    <input part="text-input-field input" type="text" id="word-to-replace-input" placeholder="Word to replace">
    <input part="text-input-field input" type="text" id="new-word-input" placeholder="New word">
    <input part="button input" type="submit" value="Update text" id="submit-button">
  </form>
  <div id=text-update-message></div>
`
customElements.define('my-text-updater',
  class extends HTMLElement {
    #newWordInput
    #textUpdateMessage
    #updatedTextAnalyzer
    #wordToReplaceInput

    constructor() {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#wordToReplaceInput = this.shadowRoot.querySelector('#word-to-replace-input')
      this.#newWordInput = this.shadowRoot.querySelector('#new-word-input')

      this.shadowRoot.querySelector('#update-text-form').addEventListener('submit', event => {
        event.preventDefault()
        this.#dispatchUpdateTextEventAndShowMessage()
      })
      this.#textUpdateMessage = this.shadowRoot.querySelector('#text-update-message')
    }

    static get observedAttributes() {
      return ['text']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'text' && oldValue !== newValue && newValue !== '') {
        this.#getUpdatedTextAnalyzer()
      }
    }

    #getUpdatedTextAnalyzer() {
      const analyzers = createAnalyzers(this.getAttribute('text'))
      this.#updatedTextAnalyzer = analyzers.updatedTextAnalyzer
      this.setAttribute('text', '')
    }

    #dispatchUpdateTextEventAndShowMessage() {
      try {
        const updatedText = this.#updatedTextAnalyzer.replaceWordsWithExactFormatting(this.#wordToReplaceInput.value, this.#newWordInput.value)
        this.dispatchEvent(new CustomEvent('updateText', { bubbles: true, detail: { text: updatedText } }))
        const difference = this.#getDifferenceFromOriginalText()
        this.#showMessage(difference)
        this.#resetWords()
      } catch (error) {
        const errorMessage = this.#getErrorMessage(error)
        this.#showMessage(errorMessage)
      }
    }

    #getDifferenceFromOriginalText() {
      const wordsReplaced = "The word(s) has been replaced. "
      if (!this.#updatedTextAnalyzer.textHasBeenUpdated()) {
        return wordsReplaced + 'The original text and the updated text are the same.'
      } else if (this.#updatedTextAnalyzer.textHasBeenUpdated()) {
        const letterDifference = this.#updatedTextAnalyzer.getLetterCountDifferenceBetweenOriginalAndUpdatedText()
        if (this.#updatedTextAnalyzer.originalTextIsLongerThanUpdatedText()) {
          return wordsReplaced + `The updated text is ${letterDifference} character(s) shorter than the original text.`
        } else {
          if (letterDifference === 0) {
            return wordsReplaced + 'The original text and the updated text are the same length.'
          } else {
            return wordsReplaced + `The updated text is ${letterDifference} character(s) longer than the original text.`
          }
        }
      }
    }

    #showMessage(text) {
      this.#removeMessageIfExists()
      const paragraph = document.createElement('p')
      paragraph.setAttribute('id', 'text-update-message')
      paragraph.textContent = text
      this.shadowRoot.querySelector('#update-text-form').appendChild(paragraph)
    }

    #resetWords() {
      this.#wordToReplaceInput.value = ''
      this.#newWordInput.value = ''
    }

    #removeMessageIfExists() {
      if (this.shadowRoot.querySelector('#text-update-message')) {
        this.shadowRoot.querySelector('#text-update-message').remove()
      }
    }

    #getErrorMessage(error) {
      if (error.message === 'The submitted word is empty.') {
        return 'One or both submitted words are empty. Please try again.'
      } else if (error.message === 'The submitted word does not have the right format.') {
        return 'One or both submitted words do not have the right format. Please try again.'
      } else if (error.message === 'The submitted word is too long.') {
        return 'One or both submitted words are too long, maximum 50 characters allowed. Please try again.'
      } else {
        return 'Something went wrong. Please try again.'
      }
    }
  }
)