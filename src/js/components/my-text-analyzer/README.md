# &lt;my-text-analyzer&gt;

The `my-text-analyzer` web component is a versatile HTML element designed to analyze and display various aspects of textual data. It allows users to input text, which can then be analyzed and presented in different ways, including text display, data statistics, and specific word counting. This component simplifies the process of working with textual data in web applications. This component needs the web components `my-text-form`, `my-text-displayer`, `my-data-displayer`, `my-specific-word-counter`
and `my-text-updater` to function properly.

## Usage

To use the `my-text-analyzer` component in your HTML, follow these steps:

1. Clone the repository.
2. Include the JavaScript file that defines the component in your project.
3. Add the `my-text-analyzer` element to your HTML where you want to work with textual data.

```html
<my-text-analyzer></my-text-analyzer>
```

4. Ensure that your web component's JavaScript file is loaded before using it, either by including it in your HTML or using an import statement in a modern JavaScript module environment.

## Features

The `my-text-analyzer` component provides the following features:

- **Text Input**: Allows users to input text for analysis.

- **Text Display**: Displays the input text for reference.

- **Data Statistics**: Provides statistics about the input text, including the number of paragraphs, sentences, words, characters, lines, and more.

- **Specific Word Counting**: Counts the occurrences of a specific word within the input text.

- **Text Updating**: Allows users to update the input text or to replace words.

## Development

If you want to modify or extend the functionality of the `my-text-analyzer` component, you can refer to the JavaScript code provided in the `my-text-analyzer.js` file. You can customize the appearance and behavior of the component by modifying the HTML structure in the shadow DOM.

## License

This `my-text-analyzer` web component is open-source and released under the [MIT License](../../../../license.md).

## Credits

This web component was created by Anja Willsund and is designed to simplify working with textual data in web applications.

Feel free to contribute, report issues, or suggest improvements to make this component even more versatile and useful. Thank you for using `my-text-analyzer`!