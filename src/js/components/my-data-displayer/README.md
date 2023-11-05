# &lt;my-data-displayer&gt;

The `my-data-displayer` web component is a custom HTML element designed to display various statistical information about a given text. This component can be easily integrated into your web applications to analyze and present data related to paragraphs, sentences, words, characters, lines, and more within the provided text.

## Usage

To use the `my-data-displayer` component in your HTML, follow these steps:

1. Clone the repository.
2. Include the JavaScript file that defines the component in your project.
3. Add the `my-data-displayer` element to your HTML where you want to display the text analysis results.

```html
<my-data-displayer text="Your text goes here"></my-data-displayer>
```

Replace `"Your text goes here"` with the text you want to analyze.

4. Ensure that your web component's JavaScript file is loaded before using it, either by including it in your HTML or using an import statement in a modern JavaScript module environment.

## Attributes

The `my-data-displayer` component supports the following attribute:

- `text`: This attribute is used to provide the text that you want to analyze. When the `text` attribute changes, the component will automatically trigger an analysis and display the results.

## Example

Here's an example of how to use the `my-data-displayer` component:

```html
<my-data-displayer text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."></my-data-displayer>
```

## Features

The `my-data-displayer` component provides the following features:

- Counts the number of paragraphs in the provided text.
- Counts the number of sentences in the provided text.
- Counts the number of words in the provided text.
- Counts the number of characters in the provided text.
- Counts the number of lines (line breaks) in the provided text.
- Counts the number of lines with text (non-empty lines) in the provided text.
- Calculates the average number of words per sentence in the provided text.
- Calculates the average number of sentences per paragraph in the provided text.

## Development

If you want to modify or extend the functionality of the `my-data-displayer` component, you can refer to the JavaScript code provided in the `my-data-displayer.js` file. You can customize the appearance of the component by modifying the HTML structure in the shadow DOM.

## License

This `my-data-displayer` web component is open-source and released under the [MIT License](../../../../license.md).

## Credits

This web component was created by Anja Willsund.

Feel free to contribute, report issues, or suggest improvements to make this component even more versatile and useful. Thank you for using `my-data-displayer`!