function getIdFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

var filmId = getIdFromUrl();

if (filmId) {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "http://localhost:5000/read_film?id=" + filmId, true);
    ajax.send();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var response = JSON.parse(ajax.responseText);
            renderForm(response);
        }
    };
} else {
    renderForm();
}

function renderForm(response = {}) {
    var container = document.querySelector('.container');
    var form = document.createElement('form');
    form.setAttribute('action', 'create_film');
    form.setAttribute('method', 'POST');
    form.setAttribute('enctype', 'multipart/form-data');
    

    var fields = [
        { label: 'ID', id: 'id', type: 'text', value: response.id || 'will be generated', readonly: true },
        { label: 'Title', id: 'titolo', type: 'text', value: response.titolo || '', required: true },
        { label: 'Genre', id: 'genere', type: 'text', value: response.genere || '', required: true },
        { label: 'Year', id: 'anno', type: 'number', value: response.anno || '', required: true },
        { label: 'Director', id: 'regista', type: 'text', value: response.regista || '', required: true },
        { label: 'Actors', id: 'attori', type: 'text', value: response.attori || '', required: true },
        { label: 'Plot', id: 'trama', type: 'textarea', value: response.trama || '', required: true },
        { label: 'Trailer', id: 'trailer', type: 'url', value: response.trailer || '', required: true },
        { label: 'Duration (min)', id: 'durata', type: 'number', value: response.durata || '', required: true },
        { label: 'Language', id: 'lingua', type: 'text', value: response.lingua || '', required: true },
        { label: 'Country', id: 'paese', type: 'text', value: response.paese || '', required: true }
    ];

    fields.forEach(function(field) {
        var div = document.createElement('div');
        var label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label + ':';
        div.appendChild(label);

        var input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.textContent = field.value;
        } else {
            input = document.createElement('input');
            input.setAttribute('type', field.type);
            input.setAttribute('value', field.value);
        }
        input.setAttribute('id', field.id);
        input.setAttribute('name', field.id);
        if (field.readonly) input.readOnly = true;
        if (field.disabled) input.disabled = true;
        if (field.required) input.required = true;
        div.appendChild(input);

        form.appendChild(div);
    });

    // Add file input for image
    var imageDiv = document.createElement('div');
    var imageLabel = document.createElement('label');
    imageLabel.setAttribute('for', 'image');
    imageLabel.textContent = 'Image:';
    imageDiv.appendChild(imageLabel);

    var imageInput = document.createElement('input');
    imageInput.setAttribute('type', 'file');
    imageInput.setAttribute('id', 'image');
    imageInput.setAttribute('name', 'image');
    imageDiv.appendChild(imageInput);

    var imagePreview = document.createElement('img');
    imagePreview.setAttribute('id', 'imagePreview');
    imagePreview.setAttribute('style', 'display: none; max-width: 200px; max-height: 200px;');
    imageDiv.appendChild(imagePreview);

    form.appendChild(imageDiv);

    // Show existing image if filmId is provided
    if (filmId) {
        var existingImage = new Image();
        existingImage.src = 'static/images/films/' + filmId + '.jpg';
        existingImage.onload = function() {
            imagePreview.src = existingImage.src;
            imagePreview.style.display = 'block';
        };
    }

    // Preview selected image
    imageInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    var submitDiv = document.createElement('div');
    var submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';
    submitDiv.appendChild(submitButton);
    form.appendChild(submitDiv);

    container.appendChild(form);
}
