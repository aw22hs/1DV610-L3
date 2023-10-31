/**
 * The my-text-form web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

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

  </style>

  <form id="text-input-form">
    <label>Submit text to analyze</label>
    <textarea class="text-box" placeholder="Your text goes here"></textarea>
    <input type="button" value="Submit" id="submit-button">
  </form>
`

customElements.define('my-text-form',
  class extends HTMLElement {
    #submitButton
    #textInputField

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#textInputField = this.shadowRoot.querySelector('.text-box')
      this.#submitButton = this.shadowRoot.querySelector('#submit-button')

      this.#submitButton.addEventListener('click', event =>
        this.#addText(event, this.#textInputField.value))
    }

    connectedCallback () {
      this.#textInputField.focus()
    }

    #addText (event, value) {
      event.preventDefault()
      this.setAttribute('text', value)
      this.#textInputField.value = ''

      this.dispatchEvent(new window.CustomEvent('submitText',
        { bubbles: true, detail: { text: this.getAttribute('text') } }))
    }
  }
)
