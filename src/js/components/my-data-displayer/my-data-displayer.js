/**
 * The my-data-displayer web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

// TODO: Importera createAnalyzers från 1DV610-L2 på GitHub

import { createAnalyzers } from '../../../../../1DV610-L2/src/app.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>

  <div id=display-data>
  </div>
`
customElements.define('my-data-displayer',
  class extends HTMLElement {
    #lineCounter
    #sentenceCounter
    #textAnalyzer
    #wordCounter

    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }

    static get observedAttributes() {
      return ['text']
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'text' && oldValue !== newValue && newValue !== '') {
        this.setAttribute('text', '')
        this.#getAnalyzers(newValue)
        this.#removeOldData()
        this.#displayData()
      }
    }

    #getAnalyzers(text) {
      const analyzers = createAnalyzers(text)
      this.#textAnalyzer = analyzers.textAnalyzer
      this.#sentenceCounter = analyzers.sentenceCounter
      this.#lineCounter = analyzers.lineCounter
      this.#wordCounter = analyzers.wordCounter
    }

    #removeOldData() {
      const paragraphs = this.shadowRoot.querySelectorAll('p')
      paragraphs.forEach(paragraph => {
        paragraph.remove()
      })
    }

    #displayData() {
      this.#addParagraph(`Number of paragraphs: ${this.#textAnalyzer.getParagraphsCount()}`)
      this.#addParagraph(`Number of sentences: ${this.#sentenceCounter.getSentenceCount()}`)
      this.#addParagraph(`Number of words: ${this.#wordCounter.getAllWordsCount()}`)
      this.#addParagraph(`Number of characters: ${this.#textAnalyzer.getCharacterCount()}`)
      this.#addParagraph(`Number of lines: ${this.#lineCounter.getAllLinesCount()}`)
      this.#addParagraph(`Number of lines with text (not empty lines): ` +
        `${this.#lineCounter.getNonEmptyLinesCount()}`)
      this.#addParagraph(`Average number of words per sentence: ` +
        `${this.#textAnalyzer.getAverageNumberOfWordsPerSentence()}`)
      this.#addParagraph(`Average number of sentences per paragraph: ` +
        `${this.#textAnalyzer.getAverageNumberOfSentencesPerParagraph()}`)     
    }

    #addParagraph(text) {
      const paragraph = document.createElement('p')
      paragraph.textContent = text
      this.shadowRoot.querySelector('#display-data').appendChild(paragraph)
    }
  }
)