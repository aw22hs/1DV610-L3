/**
 * The text-form web component module.
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
    #text-input-field {
      font-size: 0.8em;
    }
    #submit-button {
      font-size: 0.8em;
    }
  </style>

  <form id="text-input-form">
    <label>Submit text to analyze</label>
    <input type="text" id="text-input-field" placeholder="Your text goes here">
    <input type="submit" value="Submit" id="submit-button">
  </form>
`

customElements.define('text-form',
  class extends HTMLElement {
    #textInputField
    #textInputForm

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#textInputField = this.shadowRoot.querySelector('#text-input-field')
      this.#textInputForm = this.shadowRoot.querySelector('#text-input-form')

      this.#textInputForm.addEventListener('submit', event =>
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
