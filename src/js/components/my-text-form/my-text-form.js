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
    .text-box {
      border-radius: 8px;
      padding: 0.5em;
      font-size: 1em;
      height: 400px;
      width: 100%;
      font-family: 'Open sans', sans-serif;
    }
    #submit-button {
      float: left;
      font-size: 1.2em;
      height: 2.5em;
      width: 6em;
      border-radius: 8px;
      background-color: rgb(34, 54, 44);
      color: white;
      border: none;
      margin-top: 1em;
      box-shadow: 0px 2px 3px #111111;
    }
    #submit-button:hover {
      background-color: rgb(47, 75, 61);
    }
    #submit-button:active {
      transform: translateY(2px);
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
    }
    form textarea, form input {
      float: left;
      clear: both;
    }
    form p {
      color: white;
      font-size: 1.2em;
      margin-top: 1.7em;
      margin-left: 0.5em;
      display: inline-block;
      font-family: 'Open sans', sans-serif;
      text-shadow: 0px 2px 3px #111111;
    }
    #text-input-field:focus {
      outline: none;
    }

  </style>

  <form id=text-form>
    <textarea class="text-box" id=text-input-field placeholder="Enter text to analyze"></textarea>
    <input type="button" value="Submit" id="submit-button">
  </form>
  <div id=submit-text-error-message></div>
`

customElements.define('my-text-form',
  class extends HTMLElement {
    // #submitTextErrorMessage
    #textInputField

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#textInputField = this.shadowRoot.querySelector('#text-input-field')
      // this.#submitTextErrorMessage = this.shadowRoot.querySelector('#submit-text-error-message')

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
      // this.#submitTextErrorMessage.appendChild(paragraph)
    }

    #removeMessageIfExists() {
      if (this.shadowRoot.querySelector('#submit-text-error-message')) {
        this.shadowRoot.querySelector('#submit-text-error-message').remove()
      }
    }
  }
)
