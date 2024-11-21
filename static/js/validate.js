// Validaciones de Datos de Contacto 

const validateName = (name) => {
    if (!name) return false;  
    let minValid = name.trim().length >= 3;
    let maxValid = name.trim().length <= 80;
    let lengthValid = minValid && maxValid;
    return lengthValid;
};

const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length > 15;

    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);

    return lengthValid && formatValid;
};

const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return false;
    let lengthValid = phoneNumber.length >= 8;

    let re = /^[0-9]+$/;
    let formatValid = re.test(phoneNumber);

    return lengthValid && formatValid;
};

const validateSelect = (select) => {
    if (!select) return false;
    return true;
};

const validateCForm = () => {
    const myForm = document.forms["form"];
    let name = myForm["name"].value;
    let email = myForm["email"].value;
    let phoneNumber = myForm["phone_number"].value;
    let region = myForm["select-region"].value;
    let comuna = myForm["select-comuna"].value;

    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid = false;
    };

    if (!validateName(name)) {
        setInvalidInput("Nombre");
    }
    if (!validateEmail(email)) {
        setInvalidInput("Email");
    }
    if (!validatePhoneNumber(phoneNumber)) {
        setInvalidInput("Número");
    }
    if (!validateSelect(region)) {
        setInvalidInput("Región");
    }
    if (!validateSelect(comuna)) {
        setInvalidInput("Comuna");
    }

    let validationBox = document.getElementById("val-box-contact");
    let validationMessageElem = document.getElementById("val-msg-contact");
    let validationListElem = document.getElementById("val-list-contact");

    validationListElem.textContent = ""; 

    if (!isValid) {
        invalidInputs.forEach(input => {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        });

        validationMessageElem.innerText = "Los siguientes campos son inválidos:";
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";
        validationBox.hidden = false;
    } else {
        validationBox.hidden = true; 
    }

    return isValid; 
};

// Validaciones de Datos de Dispositivo 

const validateDName = (name) => {
    if (!name) return false;  
    let minValid = name.trim().length >= 3;
    let maxValid = name.trim().length <= 80;
    let lengthValid = minValid && maxValid;
    return lengthValid;
};

const validateDSelect = (select) => {
    if (!select) return false;
    return true;
};

const validateDYears = (years) => {
    let year = parseInt(years);
    return year >= 1 && year <= 99;
};

const validateDFiles = (files) => {
    if (!files) return false;

    let lengthValid = 1 <= files.length && files.length <= 3;
    let typeValid = true;

    for (const file of files) {
        let fileFamily = file.type.split("/")[0];
        typeValid &&= fileFamily == "image" || file.type == "application/pdf";
    }

    return lengthValid && typeValid;
};

const validateDForm = (idDispositivo) => {
    let nombreDispositivo = document.getElementById("disp_name" + idDispositivo).value;
    let tipoDispositivo = document.getElementById("tipo" + idDispositivo).value;
    let usoDipositivo = document.getElementById("years_use" + idDispositivo).value;
    let estadoDipositivo = document.getElementById("estado" + idDispositivo).value;
    let fotosDipositivo = document.getElementById("fotos" + idDispositivo).files;

    let invalidInputs = [];
    let isValid = true;

    const setInvalidInput = (inputName) => {
        invalidInputs.push(inputName);
        isValid = false;
    };

    if (!validateDName(nombreDispositivo)) {
        setInvalidInput("Nombre Dispositivo");
    }
    if (!validateDSelect(tipoDispositivo)) {
        setInvalidInput("Tipo Dispositivo");
    }
    if (!validateDYears(usoDipositivo)) {
        setInvalidInput("Años de Uso");
    }
    if (!validateDSelect(estadoDipositivo)) {
        setInvalidInput("Estado Funcionamiento");
    }
    if (!validateDFiles(fotosDipositivo)) {
        setInvalidInput("Fotos");
    }

    let validationBox = document.getElementById("val-box-device");
    let validationMessageElem = document.getElementById("val-msg-device");
    let validationListElem = document.getElementById("val-list-device");

    validationListElem.textContent = ""; 

    if (!isValid) {
        invalidInputs.forEach(input => {
            let listElement = document.createElement("li");
            listElement.innerText = input;
            validationListElem.append(listElement);
        });

        validationMessageElem.innerText = "Los siguientes campos son inválidos en dispositivo " + idDispositivo + ":";
        validationBox.style.backgroundColor = "#ffdddd";
        validationBox.style.borderLeftColor = "#f44336";
        validationBox.hidden = false;
    } else {
        validationBox.hidden = true; 
    }

    return isValid; 
};

let contadorDispositivo = 1;

document.getElementById('add-device-btn').addEventListener('click', () => {
    contadorDispositivo++;
    
    let devicesContainer = document.getElementById('devices-container');
    let newDeviceSection = document.createElement('div');
    newDeviceSection.classList.add('device-section');
    newDeviceSection.id = `device-section-${contadorDispositivo}`;
    
    newDeviceSection.innerHTML = `
        <h2>Información de dispositivo ${contadorDispositivo}</h2>
        <label>Nombre dispositivo:</label>
        <input type="text" id="disp_name${contadorDispositivo}" name="disp_name${contadorDispositivo}" minlength="3" maxlength="80" required>
        <label>Descripción:</label>
        <textarea id="description${contadorDispositivo}" name="description${contadorDispositivo}" rows="4" cols="50" placeholder="Escriba la descripción de su dispositivo aquí"></textarea>
        <label>Tipo:</label>
        <select name="tipo${contadorDispositivo}" id="tipo${contadorDispositivo}" required>
            <option value="pantalla">Pantalla</option>
            <option value="notebook">Notebook</option>
            <option value="tablet">Tablet</option>
            <option value="celular">Celular</option>
            <option value="consola">Consola</option>
            <option value="mouse">Mouse</option>
            <option value="teclado">Teclado</option>
            <option value="impresora">Impresora</option>
            <option value="parlante">Parlante</option>
            <option value="audífonos">Audífonos</option>
            <option value="otro">Otro</option>
        </select>
        <label>Años de uso:</label>
        <input type="number" id="years_use${contadorDispositivo}" name="years_use${contadorDispositivo}" maxlength="3" required>
        <label>Estado funcionamiento:</label>
        <select name="estado${contadorDispositivo}" id="estado${contadorDispositivo}" required>
            <option value="funciona perfecto">Funciona perfecto</option>
            <option value="con detalles">Con detalles</option>
            <option value="averiado">Averiado</option>
            <option value="no funciona">No funciona</option>
        </select>
        <label>Sube tus fotos (1-3, JPG/PNG/PDF):</label>
        <input type="file" id="fotos${contadorDispositivo}" name="fotos${contadorDispositivo}" accept=".jpg, .png, .pdf" multiple>
    `;
    
    devicesContainer.appendChild(newDeviceSection);
});

const validateAll = () => {
    let isValid = true;

    for (let i = 1; i <= contadorDispositivo; i++) {
        let currentDeviceValid = validateDForm(i);
        if (!currentDeviceValid) {
            isValid = false;
        }
    }
    
    return isValid;
};

document.getElementById('submit-btn').addEventListener('click', (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Validar el formulario de contacto
    let contactValid = validateCForm();
    let allDevicesValid = validateAll();

    // Solo muestra el popup si todos los formularios son válidos
    if (contactValid && allDevicesValid) {
        let modal = document.getElementById("confirm-box");
        modal.style.display = "flex";

        document.getElementById("confirm-btn").addEventListener("click", () => {
            modal.style.display = "none";  // Oculta el modal
            alert("Hemos recibido la información de su donación. Muchas gracias.");
            document.forms["form"].submit(); // Envía el formulario programáticamente
        });

        document.getElementById("cancel-btn").addEventListener("click", () => {
            modal.style.display = "none"; // Oculta el modal si se cancela
        });
    }
});