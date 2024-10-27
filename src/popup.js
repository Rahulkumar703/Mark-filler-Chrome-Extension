const ExcelJS = require("exceljs");


// Event Listener to Fill From Excel Button
document.getElementById("fillFromExcelButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length === 0) {
    alert("Please select an Excel file.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async (event) => {
    const buffer = event.target.result;
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(buffer);
    const worksheet = workbook.worksheets[0]; // Use the first sheet

    const jsonData = [];

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber > 1) { // Assuming first row is header
        const rowData = {
          "Enrollment Number": row.getCell(1).value, // Enrollment No
          "Max Attendance Mark (5)": row.getCell(2).value, // Attendance
          "Max Class Test Mark (5)": row.getCell(3).value, // Test
          "Max ESE Mark (20)": row.getCell(4).value, // ESE
        };
        jsonData.push(rowData);
      }
    });

    fillMarksFromExcel(jsonData); // Call the function to fill marks

    // Send the extracted data to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: fillMarksFromExcel,
          args: [jsonData],
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error("Error in Script Execution:", chrome.runtime.lastError);
          } else {
            console.log("Excel Data Processed and Sent");
          }
        }
      );
    });
  };

  reader.onerror = (error) => {
    console.error("Error reading file:", error); // Error handling
  };

  reader.readAsArrayBuffer(file);
});



// Marks Fill Function
function fillMarksFromExcel(data) {
  try {
    const rows = document.querySelectorAll("#ctl00_mastercontentplaceholder_gvInternalmark tr.rowstyle");

    const ones = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    // Convert Number to Words Function
    function numberToWords(num) {
      if (num === 0) return "";
      const result = numberToWords(Math.floor(num / 10));
      const word = ones[num % 10];
      return result + (result ? " " : "") + word;
    }

    rows.forEach((row, index) => {
      const enrollmentCell = row.querySelector("td:nth-child(2)"); // Enrollment No. is in the 2nd column
      const attendanceMarkCell = row.querySelector("td:nth-child(5) input"); // Max Attendance Mark is in the 5th column
      const classTestMarkCell = row.querySelector("td:nth-child(6) input"); // Max Class Test Mark is in the 6th column
      const eseMarkCell = row.querySelector("td:nth-child(7) input"); // Max ESE Mark is in the 7th column
      const outOfMarkCell = row.querySelector("td:nth-child(8) input"); // Out of Mark is in the 8th column
      const markWordsCell = row.querySelector("td:nth-child(9) input"); // Marks in Words is in the 9th column


      const enrollmentNumber = enrollmentCell ? parseInt(enrollmentCell.innerText.trim()) : "";
      const matchingRow = data.find((item) => {
        return item["Enrollment Number"] === enrollmentNumber
      });

      if (matchingRow) {
        console.log('filling for Registration Number:', enrollmentNumber); // Debugging line
        const totalMarks = (matchingRow["Max Attendance Mark (5)"] + matchingRow["Max Class Test Mark (5)"] + matchingRow["Max ESE Mark (20)"]);
        attendanceMarkCell.value = matchingRow["Max Attendance Mark (5)"] || "";
        classTestMarkCell.value = matchingRow["Max Class Test Mark (5)"] || "";
        eseMarkCell.value = matchingRow["Max ESE Mark (20)"] || "";
        outOfMarkCell.value = totalMarks || "";

        // Convert "Out of Mark" to words and fill it
        const markValue = parseInt(outOfMarkCell.value);
        markWordsCell.value = !isNaN(markValue) ? numberToWords(markValue).trim() : "";
      }
    });
  }
  catch (error) {
    console.error("Error in fillMarksFromExcel:", error);
  }

}
