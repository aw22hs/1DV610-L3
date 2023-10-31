/**
 * The my-data-displayer web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import { createAnalyzers } from '../../../../../1DV610-L2/src/app.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>

  <div><p id=sentences>Average number of words per sentence: </p></div>
`
customElements.define('my-data-displayer',
  /**
   * Represents a web-component-template element.
   */
  class extends HTMLElement {
    #lineCounter
    #sentenceCounter
    #textAnalyzer
    #updatedTextAnalyzer
    #wordCounter

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }

    static get observedAttributes() {
      return ['text']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'text' && oldValue !== newValue) {
        this.#getAnalyzers(newValue)
      }
    }

    #getAnalyzers(text) {
      const analyzers = createAnalyzers(text)
      this.#textAnalyzer = analyzers.textAnalyzer
      this.#sentenceCounter = analyzers.sentenceCounter
      this.#updatedTextAnalyzer = analyzers.updatedTextAnalyzer
      this.#lineCounter = analyzers.lineCounter
      this.#wordCounter = analyzers.wordCounter
      this.#displayData()
    }

    #displayData() {
      this.shadowRoot.querySelector('#sentences').textContent += this.#textAnalyzer.getAverageNumberOfWordsPerSentence()
    }
  }
)