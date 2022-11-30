/*Calculo de notas de un colegio, donde cada alumno contara con 5 notas obligatorias considerando las notas
desde 1 hasta 7.
Se genera una tabla mediante se va añadiendo cada alumno con sus respectivas notas, además se añade
a la tabla automaticamente el promedio obtenido.
Luego se genera la cantidad de alumnos, el promedio del curso y el mejor promedio con su respectivo nombre*/


function LimpiarFormulario() {
    /*limpia el formulario y regresa el focus al nombre del alumno */

    document.getElementById("formulario").reset();
    document.getElementById("Nombre").focus();
};

function Control() {
    /* Control de los input */
    var Nombre = document.getElementById("Nombre");
    var Nota1 = document.getElementById("Nota1");
    var Nota2 = document.getElementById("Nota2");
    var Nota3 = document.getElementById("Nota3");
    var Nota4 = document.getElementById("Nota4");
    var Nota5 = document.getElementById("Nota5");
    
    
    /*Validación de los input*/
    if (Nombre.value.trim() == '') {
        alert("No puedes dejar el nombre vacio ");
        Nombre.focus();
        return 1;
    } else if (Nota1.value.trim() == '' && Nota1.value < 1 || Nota1.value > 7) {
        alert("No puedes dejar el numero vacio y debe estar dentro del rango entre 1 y 7");
        Nota1.focus();
        return 1;
    } else if (Nota2.value.trim() == "" && Nota2.value < 1 || Nota2.value > 7) {
        alert("No puedes dejar el numero vacio y debe estar dentro del rango entre 1 y 7");
        Nota2.focus();
        return 1;
    } else if (Nota3.value.trim() == "" && Nota3.value < 1 || Nota3.value > 7){
        alert("No puedes dejar el numero vacio y debe estar dentro del rango entre 1 y 7");
        Nota3.focus();
        return 1;
    } else if (Nota4.value.trim() == "" && Nota4.value < 1 || Nota4.value > 7){
        alert("No puedes dejar el numero vacio y debe estar dentro del rango entre 1 y 7");
        Nota4.focus();
        return 1;
    } else if (Nota5.value.trim() == "" && Nota5.value < 1 || Nota5.value > 7){
        alert("No puedes dejar el numero vacio y debe estar dentro del rango entre 1 y 7");
        Nota5.focus();
        return 1;    
    
    } else {
        return 0;
    }
};

var acd = [];

function Añadir() {
    /* Añade una persona a la tabla */
    
    var promedio = ((Number(Nota1.value) + Number(Nota2.value) + Number(Nota3.value) + Number(Nota4.value) + Number(Nota5.value))/5);
    var curso =  
        {nam: Nombre.value, not: [Nota1.value, Nota2.value, Nota3.value, Nota4.value, Nota5.value], prom: promedio}
    ;
    
    if (Control()) {
    /*evalua la funcion Control*/   
    } else {
        let nuevatabla = document.createElement("TR");
        nuevatabla.innerHTML = "<tr><td>" + Nombre.value.trim() + "</td><td>" + Nota1.value.trim() + "</td><td>" + Nota2.value.trim() +  "</td><td>" + Nota3.value.trim() + "</td><td>" + Nota4.value.trim()  + "</td><td>" + Nota5.value.trim() + "</td><td>" + promedio + "</td></tr>";
        document.getElementById("tabla").appendChild(nuevatabla);
        LimpiarFormulario();
        acd.push(curso);
        console.log(curso)
        
        
    }
}

function promdelcurso() {
    let user = acd;
    var cantidad = user.length;
    var suma = 0;
    for (var i = 0; i < cantidad; i++) {
        suma += user[i].prom;
    }
    promedio = suma / cantidad;
    
}

function mejorpromedio() {

    let user = acd;
    var cantidad = user.length;
    var mayor = 0;
    var nombre = "";
    for (var i = 0; i < cantidad; i++) {
        if (mayor < user[i].prom){
            mayor = user[i].prom;
            nombre = user[i].nam;
        }
    }
    notamejor = mayor
    alumnomejornota = nombre
    
}

function Resultados() {

   promdelcurso()
   mejorpromedio()

   let promedios = promedio.toFixed(1);
   
   document.getElementById("cantidaddealumnos").innerHTML = "Cantidad de alumnos: "  + acd.length;
   document.getElementById("promediodelcurso").innerHTML = "Promedio del curso: "  + promedios ;
   document.getElementById("Mejor_Promedio").innerHTML= "Mejor Promedio"
   document.getElementById("mejorpromedio").innerHTML = "Alumno: " + alumnomejornota + " Nota: " + notamejor ;
   
   console.log(promedios);
   console.log(notamejor);
   console.log(alumnomejornota);
   console.log(acd);
   
    
}