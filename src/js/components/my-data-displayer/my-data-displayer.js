/**
 * The my-data-displayer web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

import { createAnalyzers } from 'text-analyzer'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    #display-data p {
      margin: 0.7em 0.5em;
      font-size: 1.2em;
    }
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
        this.#getAnalyzers()
        this.#removeOldData()
        this.#displayData()
      }
    }

    #getAnalyzers() {
      const analyzers = createAnalyzers(this.getAttribute('text'))
      this.#textAnalyzer = analyzers.textAnalyzer
      this.#sentenceCounter = analyzers.sentenceCounter
      this.#lineCounter = analyzers.lineCounter
      this.#wordCounter = analyzers.wordCounter
      this.setAttribute('text', '')
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