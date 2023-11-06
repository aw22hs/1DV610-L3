# 1DV610-L3

This project consists of a set of custom web components designed to enhance your web applications by providing various text-related functionalities. Each component is reusable and can easily be integrated into your projects to streamline tasks related to text input, analysis, display, and modification. However, the main focus in this project is to provide the SPA application "My Text Analyzer". To read more about "My Text Analyzer", please read the project [wiki](https://github.com/aw22hs/1DV610-L3/wiki).

## Table of Contents

- [Components](#components)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Development](#development)
- [License](#license)
- [Credits](#credits)

## Components

### 1. `my-text-form`

The `my-text-form` component provides a text input area with input validation and error handling. Users can submit text, and the component ensures that the submitted text meets specified criteria.

### 2. `my-text-displayer`

The `my-text-displayer` component allows you to display text content within your web application. It includes an option to reset the displayed text and provides a straightforward way to present text to users.

### 3. `my-data-displayer`

The `my-data-displayer` component analyzes and displays various statistics related to text content, such as paragraph count, sentence count, word count, character count, line count, and more. It simplifies the presentation of textual data statistics.

### 4. `my-specific-word-counter`

The `my-specific-word-counter` component counts the occurrences of a specific word within a given text. It enables users to input a word for counting and provides error handling for invalid inputs.

### 5. `my-text-updater`

The `my-text-updater` component facilitates the modification of text content within your web application. It offers the ability to replace specific words with new words, tracks text modifications, and provides error handling for invalid inputs.

### 6. `my-text-analyzer`

The `my-text-analyzer` component combines the capabilities of the above components into a cohesive package (which is the main point of this application). It allows users to input text, analyze it, display statistics, count specific words, and update the text as needed. This component simplifies working with textual data in web applications.

## Features

The project's web components provide the following features:

- Text input fields with validation and error handling.
- Text display capabilities.
- Statistical analysis of text content.
- Specific word counting within text.
- Text modification and tracking.
- Reusable and customizable components.

## Getting Started

To get started with this project, follow these steps:

1. Clone or download the project repository to your local machine.

2. Include the JavaScript files for the desired web components in your project's HTML file using `<script>` tags.

3. Add the corresponding custom elements (`my-text-form`, `my-text-displayer`, `my-data-displayer`, `my-specific-word-counter`, `my-text-analyzer`, and `my-text-updater`) within your HTML where you want to incorporate their functionality.

4. Customize your application's event listeners and handling code to respond to events triggered by these components (e.g., `submitText`, `updateText`).

5. Customize the appearance and behavior of the components by modifying the HTML structure in the shadow DOM or extending the component classes as needed.

6. Test your application to ensure that the components are functioning as expected.

## Usage

You can use these web components individually or combine them to create comprehensive text-related features in your web application. Each component is designed to simplify common text-related tasks, such as input validation, data display, and text modification.

For detailed instructions on using each component, please see the individual component README files within this project.

## Development

If you wish to extend or modify the functionality of any of these components, you can refer to the JavaScript code provided in each component's respective `.js` file. Customize the appearance and behavior of the components by modifying the HTML structure in the shadow DOM.

Feel free to contribute, report issues, or suggest improvements to enhance the project's functionality and usability.

## License

This project's web components are open-source and released under the [MIT License](license.md).

## Credits

This project was created to simplify common text-related tasks in web applications and is maintained by Anja Willsund. I welcome your contributions and suggestions to make these components even more versatile and useful. Thank you for using these web components!