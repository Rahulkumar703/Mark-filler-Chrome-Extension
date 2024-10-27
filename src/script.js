
// Event listener for the file input change event
document.getElementById('fileInput').addEventListener('change', function () {
    console.log('first');
    if (this.files.length === 0) return; // If no file is selected, return
    const fileLabel = document.getElementById('fileLabel');
    const fillButton = document.getElementById('fillFromExcelButton');
    const fileName = this.files[0] ? this.files[0].name : 'Choose Excel File'; // Get the selected file name
    fileLabel.childNodes[1].nodeValue = fileName; // Update the label text
    fillButton.disabled = false; // Enable the fill button

});
