# Chrome Extension for Filling Marks from Excel

This Chrome extension allows users to fill marks into a web application from an Excel file. The extension processes Excel data and fills it into specified fields based on the enrollment numbers.

## Table of Contents

- [Installation](#installation)
- [Excel File Format](#excel-file-format)
- [Usage Instructions](#usage-instructions)
- [Contributing](#contribution)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Rahulkumar703/Mark-filler-Chrome-Extension.git
   cd Mark-filler-Chrome-Extension
   ```

2. **Install Dependencies: If you are using npm to manage dependencies, run:**

   ```bash
   npm install
   ```

3. **Load the Extension in Chrome:**

- Open Chrome and navigate to chrome://extensions/.
- Enable "Developer mode" by toggling the switch at the top right corner.
- Click on the "Load unpacked" button.
- Select the directory where your extension files are located.

4. **Check for Errors: Ensure there are no errors in the console. If there are, resolve them before proceeding.**

## Excel File Format

To use the extension, your Excel file must be formatted as follows:

- **First Row (Header)**: This row should contain the following headers:
  - Enrollment Number
  - Max Attendance Mark (5)
  - Max Class Test Mark (5)
  - Max ESE Mark (20)
- **Subsequent Rows**: Each row must contain the corresponding values for the headers listed above. Ensure that the enrollment numbers are unique.

## Example:

| Enrollment Number | Max Attendance Mark (5) | Max Class Test Mark (5) | Max ESE Mark (20) |
| ----------------- | ----------------------- | ----------------------- | ----------------- |
| 21105113001       | 4                       | 5                       | 18                |
| 21105113002       | 3                       | 4                       | 15                |
| 21105113005       | 4                       | 5                       | 18                |
| 21105113004       | 3                       | 4                       | 15                |
| 21105113007       | 4                       | 5                       | 18                |
| 211051130018      | 3                       | 4                       | 15                |
| 211051130012      | 5                       | 5                       | 18                |
| 211051130034      | 3                       | 4                       | 15                |

## Usage Instructions

1. Open the Web Application: Open the web application where you want to fill the marks.

2. Select the Excel File:

   - Click on the extension icon in the Chrome toolbar to open the popup.
   - Click on the "Choose Excel File" button and select your Excel file.

3. Fill Marks:

   - Once the file is selected, click on the "Fill From Excel" button.
   - The extension will process the data and fill the corresponding fields in the web application.

4. Check Results:

   - Verify that the marks have been filled correctly in the specified fields.
   - If you encounter any issues, check the console for errors and ensure that your Excel file is formatted correctly.

## Contribution

- Rahul Kumar [Github](https://github.com/Rahulkumar703)
- Department of Computer Science & Engineering
- Motihari College of Engineering, Motihari
