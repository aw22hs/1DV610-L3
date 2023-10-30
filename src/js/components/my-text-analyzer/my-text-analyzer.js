/**
 * The my-text-analyzer web component module.
 *
 * @author Anja Willsund <aw22hs@student.lnu.se>
 * @version 1.0.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
    #cover {
      background-size:cover;
      background-image: url(../js/components/my-pwd/images/first_background.jpg);
      position:fixed;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
      z-index: 0;
    }
  </style>

  <div id="cover">
    <p>Hejsan</p>
  </div>
`

customElements.define('my-text-analyzer',
  /**
   * Represents a my-pwd element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  }
)
