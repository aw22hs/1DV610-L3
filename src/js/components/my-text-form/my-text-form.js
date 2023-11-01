/**
 * The my-text-form web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

// TODO: Importera createAnalyzers från 1DV610-L2 på GitHub

import { createAnalyzers } from '../../../../../1DV610-L2/src/app.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    form {
      padding: 1em;
    }
    .text-box {
      padding-top: 1px;
      font-size: 0.8em;
      height: 400px;
      width: 90%;
      vertical-align: top;
    }
    #submit-button {
      font-size: 0.8em;
    }
    form label, form textarea, form input {
      float: left;
      clear: both;
    }
    #submit-text-error-message {
      float: left;
      clear: both;
    }

  </style>

  <form>
    <label>Submit text to analyze</label>
    <textarea class="text-box" id=text-input-field placeholder="Your text goes here"></textarea>
    <input type="button" value="Submit" id="submit-button">
  </form>
  <div id=submit-text-error-message></div>
`

customElements.define('my-text-form',
  class extends HTMLElement {
    #submitTextErrorMessage
    #textInputField

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#textInputField = this.shadowRoot.querySelector('#text-input-field')
      this.#submitTextErrorMessage = this.shadowRoot.querySelector('#submit-text-error-message')

      this.shadowRoot.querySelector('#submit-button').addEventListener('click', event =>
        this.#addText(event, this.#textInputField.value))
    }

    connectedCallback () {
      this.#textInputField.focus()
    }

    #addText (event, value) {
      event.preventDefault()
      try {
        createAnalyzers(value)
        this.dispatchEvent(new window.CustomEvent('submitText',
        { bubbles: true, detail: { text: value } }))
      } catch (error) {
        const errorMessage = this.#getErrorMessage(error)
        this.#showMessage(errorMessage)
      }
    }

    #getErrorMessage(error) {
      if (error.message === 'There are no characters in the string.') {
        return 'There was no text submitted. Please try again.'
      } else {
        return 'Something went wrong. Please try again.'
      }
    }

    #showMessage(text) {
      this.#removeMessageIfExists()
      const paragraph = document.createElement('p')
      paragraph.textContent = text
      this.#submitTextErrorMessage.appendChild(paragraph)
    }

    #removeMessageIfExists() {
      if (this.#submitTextErrorMessage.firstChild) {
        this.#submitTextErrorMessage.firstChild.remove()
      }
    }
  }
)
