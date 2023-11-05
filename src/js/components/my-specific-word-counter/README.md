# &lt;my-specific-word-counter&gt;

The `my-specific-word-counter` web component is a custom HTML element that allows you to count the occurrences of a specific word in a given text. The component displays a form that contains an input field and a "Count" button. This component is designed to be easily integrated into your web applications, providing a convenient way to analyze and display the count of a particular word within the provided text.

## Usage

To use the `my-specific-word-counter` component in your HTML, follow these steps:

1. Clone the repository.
2. Include the JavaScript file that defines the component in your project.
3. Add the `my-specific-word-counter` element to your HTML where you want to count a specific word.

```html
<my-specific-word-counter text="Your text goes here"></my-specific-word-counter>
```

Replace `"Your text goes here"` with the text in which you want to count a specific word.
4. Ensure that your web component's JavaScript file is loaded before using it, either by including it in your HTML or using an import statement in a modern JavaScript module environment.

## Attributes

The `my-specific-word-counter` component supports the following attribute:

- `text`: This attribute is used to provide the text in which you want to count a specific word. When the user submits a word in the input field and clicks on the "Count" button, the component will trigger the counting process and count the number of occurrences of the word in the `text`.

## Example

Here's an example of how to use the `my-specific-word-counter` component:

```html
<my-specific-word-counter text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."></my-specific-word-counter>
```

## Features

The `my-specific-word-counter` component provides the following features:

- Counts the occurrences of a specific word within the provided text.
- Allows users to input a specific word for counting.
- Provides error messages for invalid inputs, such as empty words or words exceeding 50 characters.

## Development

If you want to modify or extend the functionality of the `my-specific-word-counter` component, you can refer to the JavaScript code provided in the `my-specific-word-counter.js` file. You can customize the appearance of the component by modifying the HTML structure in the shadow DOM.

## License

This `my-specific-word-counter` web component is open-source and released under the [MIT License](../../../../license.md).

## Credits

This web component was created by Anja Willsund.

Feel free to contribute, report issues, or suggest improvements to make this component even more versatile and useful. Thank you for using `my-specific-word-counter`!