function redirigirANotas() {
    // Redirigir a la página "notas.html"
    window.location.href = "notas.html";
}

// Obtener parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);

// Obtener el valor de cada parámetro
const establecimiento = urlParams.get('establecimiento');
const curso = urlParams.get('curso');
const asignatura = urlParams.get('asignatura');
const profesor = urlParams.get('profesor');
//se modifica estilo anterior para asegurar que sea un valor entero
const notas = parseInt(urlParams.get('notas'));


// Mostrar los datos en la página
document.getElementById('establecimientoInfo').textContent = `Establecimiento: ${establecimiento}`;
document.getElementById('cursoInfo').textContent = `Curso: ${curso}`;
document.getElementById('asignaturaInfo').textContent = `Asignatura: ${asignatura}`;
document.getElementById('profesorInfo').textContent = `Profesor(a): ${profesor}`;
document.getElementById('notasInfo').textContent = `Cantidad de notas: ${notas}`;


//abajo se encuentra la logica para crear la tabla en base a la cantidad de notas añadida

// Obtener una referencia a la tabla en el HTML
const table = document.getElementById('notasTable');

// Obtener la cantidad de notas ingresadas desde la URL
//const notas = parseInt(urlParams.get('notas'));

// Crear una fila para el encabezado
const headerRow = document.createElement('tr');

// Agregar la celda de "Nombre"
const nameHeader = document.createElement('th');
nameHeader.textContent = 'Nombre';
headerRow.appendChild(nameHeader);

// Agregar las celdas para las notas (basado en la cantidad ingresada)
for (let i = 1; i <= notas; i++) {
  const noteHeader = document.createElement('th');
  noteHeader.textContent = `Nota ${i}`;
  headerRow.appendChild(noteHeader);
}

// Agregar el encabezado a la tabla
table.appendChild(headerRow);

//PARTE 2 DE LAS TABLAS CREADAS

function generarFormularioDinamico(cantidadNotas) {
    // Obtener referencia al elemento <div> donde se generará el formulario
    const formularioDinamico = document.getElementById('formularioDinamico');

    // Crear un formulario dinámico
    const formHTML = `
        <form>
            <h2>Ingrese las notas:</h2>
            ${generarCamposNotas(cantidadNotas)}
            <button type="button" onclick="agregarNotas()">Agregar Notas</button>
        </form>
    `;

    // Agregar el formulario al <div>
    formularioDinamico.innerHTML = formHTML;
}

function generarCamposNotas(cantidadNotas) {
    let camposHTML = '';
    camposHTML += `
        <input type="text" placeholder="Nombre" id="nombre" required>
    `;
    for (let i = 1; i <= cantidadNotas; i++) {
        camposHTML += `
            <input type="number" placeholder="Nota ${i}" id="Nota${i}" min="1" max="7" step="0.1" required>
        `;
    }
    return camposHTML;
}


function agregarNotas() {
    // Obtener el nombre ingresado
    const nombre = document.getElementById('nombre').value;

    // Obtener la cantidad de notas ingresadas desde la URL
    const cantidadNotas = parseInt(urlParams.get('notas'));

    // Verificar que el campo de nombre no esté vacío
    if (nombre.trim() === '') {
        alert('Por favor, ingrese un nombre antes de continuar.');
        return; // Evita agregar notas si el nombre está vacío
    }

     // Expresión regular para validar una nota con un decimal opcional
     const notaRegex = /^([1-7](\.\d)?|7)$/;

     // Verificar que todos los campos de notas no estén vacíos y cumplan con la expresión regular
     for (let i = 1; i <= cantidadNotas; i++) {
         const notaInput = document.getElementById(`Nota${i}`);
         const nota = notaInput.value.replace(',', '.'); // Permitir coma o punto decimal
 
         // Verificar si el campo de nota está vacío o no cumple con la expresión regular
         if (!notaRegex.test(nota)) {
             alert(`Por favor, ingrese una Nota ${i} válida entre 1 y 7 con un dígito decimal opcional.`);
             return; // Evita agregar notas si la nota no es válida
         }
     }

    // Crear una fila para las notas
    const notasRow = document.createElement('tr');

    // Agregar la celda de nombre
    const nameCell = document.createElement('td');
    nameCell.textContent = nombre;
    notasRow.appendChild(nameCell);

    // Agregar las celdas para las notas
    for (let i = 1; i <= cantidadNotas; i++) {
        const nota = parseFloat(document.getElementById(`Nota${i}`).value);
        const noteCell = document.createElement('td');
        noteCell.textContent = nota;
        notasRow.appendChild(noteCell);
    }

    // Agregar la fila con las notas a la tabla existente
    const tablaNotas = document.getElementById('notasTable');
    tablaNotas.appendChild(notasRow);

    // Limpiar los campos de nombre y notas después de agregar
    document.getElementById('nombre').value = '';
    for (let i = 1; i <= cantidadNotas; i++) {
        document.getElementById(`Nota${i}`).value = '';
    }
}



window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cantidadNotas = parseInt(urlParams.get('notas'));
    generarFormularioDinamico(cantidadNotas);
});

//validar formulario
function validarFormulario() {
    const establecimiento = document.getElementById('establecimiento').value;
    const curso = document.getElementById('curso').value;
    const asignatura = document.getElementById('asignatura').value;
    const profesor = document.getElementById('profesor').value;
    const notas = document.getElementById('notas').value;

    // Verificar si algún campo requerido está vacío
    if (establecimiento.trim() === '' || curso.trim() === '' || asignatura.trim() === '' || profesor.trim() === '' || notas.trim() === '') {
        alert('Por favor, complete todos los campos antes de continuar.');
        return false; // Evita que el formulario se envíe
    }

    // Si todos los campos están completos, el formulario se enviará
    return true;
}
