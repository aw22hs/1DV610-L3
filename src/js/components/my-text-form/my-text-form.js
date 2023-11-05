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
      width: 100%;
    }
    #submit-button {
      font-size: 1.2em;
      height: 2.5em;
      margin-top: 1em;
    }

    form p {
      color: #F2F2F2;
      font-size: 1.2em;
      margin-top: 1.7em;
      margin-left: 0.5em;
      display: inline-block;
      font-family: 'Open sans', sans-serif;
      text-shadow: 0px 2px 3px #111111;
    }
  </style>

  <form id=text-form>
    <textarea part="text-box text-input-field" id=text-input-field placeholder="Enter text to analyze"></textarea>
    <input part="button" type="button" value="Submit" id="submit-button">
  </form>
`

customElements.define('my-text-form',
  class extends HTMLElement {
    #textInputField

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#textInputField = this.shadowRoot.querySelector('#text-input-field')

      this.shadowRoot.querySelector('#submit-button').addEventListener('click', event => {
        event.preventDefault()
        this.#dispatchSubmitTextEvent()
      })
    }

    connectedCallback () {
      this.#textInputField.focus()
    }

    #dispatchSubmitTextEvent() {
      try {
        this.#isTextInputValid()
        this.dispatchEvent(new window.CustomEvent('submitText',
        { bubbles: true, detail: { text: this.#textInputField.value } }))
      } catch (error) {
        const errorMessage = this.#getErrorMessage(error)
        this.#showMessage(errorMessage)
      }
    }

    #isTextInputValid() {
      // Throws error if the text input is empty
      createAnalyzers(this.#textInputField.value)
    }

    #getErrorMessage(error) {
      if (error.message === 'There are no characters in the string.') {
        return 'There was no text submitted. Please try again.'
      } else if (error.message === 'There are more than 10 000 characters in the string.') {
        return 'The submitted text is too long, maximum 10 000 characters. Please try again with a shorter text.'
      } else {
        return 'Something went wrong. Please try again.'
      }
    }

    #showMessage(text) {
      this.#removeMessageIfExists()
      const paragraph = document.createElement('p')
      paragraph.setAttribute('id', 'submit-text-error-message')
      paragraph.textContent = text
      this.shadowRoot.querySelector('#text-form').appendChild(paragraph)
    }

    #removeMessageIfExists() {
      if (this.shadowRoot.querySelector('#submit-text-error-message')) {
        this.shadowRoot.querySelector('#submit-text-error-message').remove()
      }
    }
  }
)
