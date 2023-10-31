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

  <div>
    <p id=paragraph-count></p>
  </div>
  <div>
    <p id=sentence-count></p>
  </div>
  <div>
    <p id=word-count></p>
  </div>
  <div>
    <p id=character-count></p>
  </div>
  <div>
    <p id=line-count></p>
  </div>
  <div>
    <p id=non-empty-line-count></p>
  </div>
  <div>
    <p id=words-per-sentence></p>
  <div>
  <div>
    <p id=sentences-per-paragrah></p>
  </div>
`
customElements.define('my-data-displayer',
  /**
   * Represents a web-component-template element.
   */
  class extends HTMLElement {
    #lineCounter
    #sentenceCounter
    #textAnalyzer
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
      this.#lineCounter = analyzers.lineCounter
      this.#wordCounter = analyzers.wordCounter
      this.#displayData()
    }

    #displayData() {
      this.shadowRoot.querySelector('#paragraph-count').textContent = `Number of paragraphs: ${this.#textAnalyzer.getParagraphsCount()}`
      this.shadowRoot.querySelector('#sentence-count').textContent = `Number of sentences: ${this.#sentenceCounter.getSentenceCount()}`
      this.shadowRoot.querySelector('#word-count').textContent = `Number of words: ${this.#wordCounter.getAllWordsCount()}`
      this.shadowRoot.querySelector('#character-count').textContent = `Number of characters: ${this.#textAnalyzer.getCharacterCount()}`
      this.shadowRoot.querySelector('#line-count').textContent = `Number of lines: ${this.#lineCounter.getAllLinesCount()}`
      this.shadowRoot.querySelector('#non-empty-line-count').textContent = `Number of lines with text (not empty lines): ${this.#lineCounter.getNonEmptyLinesCount()}`
      this.shadowRoot.querySelector('#words-per-sentence').textContent = `Average number of words per sentence: ${this.#textAnalyzer.getAverageNumberOfWordsPerSentence()}`
      this.shadowRoot.querySelector('#sentences-per-paragrah').textContent = `Average number of sentences per paragraph: ${this.#textAnalyzer.getAverageNumberOfSentencesPerParagraph()}`      
    }
  }
)