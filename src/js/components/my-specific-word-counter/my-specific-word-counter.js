/**
 * The my-word-searcher web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>

<form id="word-input-form">
    <label>Count specific word</label>
    <input type="text" class="text-box" placeholder="Your word here"></textarea>
    <input type="button" value="Count" id="submit-button">
  </form>
`
customElements.define('my-specific-word-counter',
  /**
   * Represents a web-component-template element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }
  }
)