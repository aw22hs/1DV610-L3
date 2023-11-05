# &lt;my-text-form&gt;

The `my-text-form` web component is a custom HTML element that provides a text input area within your web application. It allows users to input text and submit it for further processing or analysis. This component includes input validation and error handling to ensure that the submitted text meets the required criteria.

## Usage

To use the `my-text-form` component in your HTML, follow these steps:

1. Clone the repository.
2. Include the JavaScript file that defines the component in your project.
3. Add the `my-text-form` element to your HTML where you want to include a text input area.

```html
<my-text-form></my-text-form>
```

4. Customize your application to handle the `submitText` event, which is triggered when the user submits text from the input area.

```javascript
document.querySelector('my-text-form').addEventListener('submitText', event => {
  const submittedText = event.detail.text;
  // Handle the submitted text here
});
```

5. Ensure that your web component's JavaScript file is loaded before using it, either by including it in your HTML or using an import statement in a modern JavaScript module environment.

## Features

The `my-text-form` component provides the following features:

- **Text Input**: Offers a text input field where users can enter text.

- **Input Validation**: Validates the input text to ensure it meets certain criteria, such as non-empty and within a character limit.

- **Error Handling**: Displays error messages when the input text does not meet the required criteria.

- **Submission**: Triggers a `submitText` event when the user submits valid text by clicking the "Submit" button.

## Development

If you want to modify or extend the functionality of the `my-text-form` component, you can refer to the JavaScript code provided in the `my-text-form.js` file. Customize the appearance of the component by modifying the HTML structure in the shadow DOM.

## License

This `my-text-form` web component is open-source and released under the [MIT License](../../../../license.md).

## Credits

This web component was created by Anja Willsund to simplify the process of collecting and validating user-generated text input.

Feel free to contribute, report issues, or suggest improvements to make this component even more versatile and useful. Thank you for using `my-text-form`!