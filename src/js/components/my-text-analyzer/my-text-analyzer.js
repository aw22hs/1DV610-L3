/**
 * The my-text-analyzer web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import '../my-text-form/'
import '../my-text-displayer/'
import '../my-data-displayer/'
import '../my-specific-word-counter/'
import '../my-text-updater/'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    #text-analyzer-container {
      width: 90%;
      margin: auto;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto auto;
      min-height: 100vh;
      grid-template-areas:
      "header"
      "upper-container"
      "lower-container"
      "footer";
    }
    h1 {
      font-size: 4em;
      color: #F2F2F2;
      margin-bottom: 0.2em;
    }
    #lower-container {
      font-family: 'Open sans', sans-serif;
      font-size: 1em;
      text-shadow: 0px 2px 3px #111111;
      color: #F2F2F2;
      width: 100%;
      margin-top: 1em;
    }
    #data-container {
      float: left;
      background: linear-gradient(to right, rgb(34, 54, 44, 0.7), rgb(34, 54, 44, 0));
      border-radius: 8px;
    }
    #specific-word-counter-container {
      float: right;
      margin-bottom: 1em;
    }
    #text-updater-container {
      float: right;
    }
    #data-container,
    #specific-word-counter-container,
    #text-updater-container {
      width: 48%;
    }
    my-text-form::part(button),
    my-text-updater::part(button),
    my-specific-word-counter::part(button),
    my-text-displayer::part(button) {
	    background-color: rgb(34, 54, 44);
	    color: #F2F2F2;
	    border: none;
      width: 6em;
      box-shadow: 0px 2px 3px #111111;
      border-radius: 8px;
      font-size: 1.2em;
      height: 2.5em;
      margin-top: 1em;
    }
    my-text-form::part(button):hover,
    my-text-updater::part(button):hover,
    my-specific-word-counter::part(button):hover,
    my-text-displayer::part(button):hover {
	    background-color: rgb(47, 75, 61);
    }
    my-text-form::part(button):active,
    my-text-updater::part(button):active,
    my-specific-word-counter::part(button):active,
    my-text-displayer::part(button):active {
	    transform: translateY(2px);
	    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
    }
    my-text-form::part(text-box),
    my-text-displayer::part(text-box) {
      padding: 0.5em;
      font-size: 1em;
      height: 400px;
      width: 100%;
      font-family: 'Open sans', sans-serif;
      border-radius: 8px;
      outline: none;
    }
    my-text-updater::part(text-input-field),
    my-specific-word-counter::part(text-input-field) {
      height: 1.5em;
      font-size: 1em;
      padding: 0.5em;
      width: 22em;
      outline: none;
    }
    my-text-updater::part(input),
    my-specific-word-counter::part(input) {
      display: block;
      margin-top: 0.8em;
      border-radius: 8px;
    }
    footer {
      font-size: 0.8em;
      color: rgb(255, 255, 255, 0.6);
      text-align: center;
      font-family: 'Open sans', sans-serif;
      margin-bottom: 1em;
      width: 100%;
    }
  </style>

  <div id=text-analyzer-container>
    <div id=header>
    <h1>My Text Analyzer</h1>
    </div>
    <div id=upper-container>
    </div>
    <div id=lower-container>
      <div id=data-container></div>
      <div id=specific-word-counter-container></div>
      <div id=text-updater-container></div>
    </div>
    <footer class=footer>
    <p>Anja Willsund &bull; Laboration 3 &bull; 1DV610 - Introduction to Software Quality &bull; Linnaeus University</p>
    </footer>
  </div>
`

customElements.define('my-text-analyzer',
  class extends HTMLElement {
    #text

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.#addTextFormElementWithEventListener()
    }

    #addTextFormElementWithEventListener() {
      const textFormElement = document.createElement('my-text-form')
      this.shadowRoot.querySelector("#upper-container").append(textFormElement)
      textFormElement.addEventListener('submitText', event => {
        this.#text = event.detail.text
        this.shadowRoot.querySelector('my-text-form').remove()
        this.#addTextDisplayerElementWithEventListener()
      })
    }

    #addTextDisplayerElementWithEventListener() {
      this.#addNewElement('my-text-displayer', '#upper-container')
      this.shadowRoot.querySelector('my-text-displayer').addEventListener('resetText', event => {
        this.#text = ''
        this.#removeElements()
        this.#addTextFormElementWithEventListener()
      })
      this.#addNewElement('my-data-displayer', '#data-container')
      this.#addNewElement('my-specific-word-counter', '#specific-word-counter-container')
      this.#addMyTextUpdaterElementWithEventListener()
    }

    #addNewElement(elementType, divId) {
      const newElement = document.createElement(elementType)
      newElement.setAttribute('text', this.#text)
      this.shadowRoot.querySelector(divId).appendChild(newElement)
    }

    #addMyTextUpdaterElementWithEventListener() {
      this.#addNewElement('my-text-updater', '#text-updater-container')
      this.shadowRoot.querySelector('my-text-updater').addEventListener('updateText', event => {
        this.#text = event.detail.text
        this.#updateText()
      })
    }

    #updateText() {
      this.shadowRoot.querySelector('my-text-displayer').setAttribute('text', this.#text)
      this.shadowRoot.querySelector('my-data-displayer').setAttribute('text', this.#text)
      this.shadowRoot.querySelector('my-specific-word-counter').setAttribute('text', this.#text)
    }

    #removeElements() {
      this.shadowRoot.querySelector('my-text-displayer').remove()
      this.shadowRoot.querySelector('my-data-displayer').remove()
      this.shadowRoot.querySelector('my-specific-word-counter').remove()
      this.shadowRoot.querySelector('my-text-updater').remove()
    }
  }
)
