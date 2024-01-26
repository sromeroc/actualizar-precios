var dropZone = document.getElementById('drop-zone');
var fileUpload = document.getElementById('file-upload');
var fileNameDisplay = document.getElementById('file-name');

dropZone.addEventListener('click', function() {
    fileUpload.click();
});

dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropZone.classList.add('drop-zone--over');
});

['dragleave', 'dragend'].forEach(function(type) {
    dropZone.addEventListener(type, function() {
        dropZone.classList.remove('drop-zone--over');
    });
});

dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    fileUpload.files = e.dataTransfer.files;
    dropZone.classList.remove('drop-zone--over');
    displayFileName();
});

fileUpload.addEventListener('change', function() {
    displayFileName();
});

function displayFileName() {
    try {
        var files = fileUpload.files;
        if (files.length > 0) {
            fileNameDisplay.textContent = 'Archivo seleccionado: ' + files[0].name;
        } else {
            fileNameDisplay.textContent = '';
        }
    } catch (error) {
        console.error('Error en la función displayFileName:', error);
    }
}
