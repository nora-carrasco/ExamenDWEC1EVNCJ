//Obtener la fecha actual en formato DD/MM/AAAA
function obtenerFechaHoy() {
  const hoy = new Date(); //Crear un objeto Date con la fecha y hora actual
  const dia = String(hoy.getDate()).padStart(2, '0'); //Día con 2 dígitos 
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); //Mes con 2 dígitos 
  const año = hoy.getFullYear(); //Año completo 
  return `${dia}/${mes}/${año}`; //Devolver en formato DD/MM/AAAA
}

//Generar un array de objetos usuario con datos aleatorios, por defecrto 6 usuarios, pero puede ser cualquier cantidad que elija el usuario
function generarUsuarios(cantidad = 6) {
  const usuarios = []; //Array que almacena los objetos usuario

  //Datos base para generar usuarios 
  const nombres = ['Ana', 'Luis', 'Carlos', 'María', 'José', 'Sofía', 'Pedro', 'Laura', 'Miguel', 'Elena'];
  const apellidos = ['García', 'Martínez', 'López', 'Rodríguez', 'Pérez', 'Sánchez', 'Romero', 'Díaz', 'Hernández', 'Moreno'];
  const emails = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'example.com'];
  const profesiones = ['Desarrollador', 'Diseñador', 'Profesor', 'Médico', 'Ingeniero', 'Estudiante', 'Abogado', 'Contador'];
  
  const fechaHoy = obtenerFechaHoy(); //Fecha fija (la de hoy) para todos los usuarios generados en esta sesión

  //Bucle para crear 'cantidad' usuarios (elegida por el usuario)
  for (let i = 0; i < cantidad; i++) {
    const nombre = nombres[Math.floor(Math.random() * nombres.length)]; //Selección de nombres aleatoria
    const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
    const edad = Math.floor(Math.random() * 50) + 18; //Edad entre 18 y 67
    const email = `${nombre.toLowerCase()}.${apellido.toLowerCase()}@${emails[Math.floor(Math.random() * emails.length)]}`;
    const activo = Math.random() > 0.5; //50% probabilidad de estar activo 50% inactivo
    const profesion = profesiones[Math.floor(Math.random() * profesiones.length)];

    //Crear un objeto usuario y añadir al array
    usuarios.push({ 
      nombre, 
      apellido, 
      edad, 
      email, 
      activo, 
      profesion,
      fechaCreacion: fechaHoy //Fecha de creación: hoy
    });
  }
  return usuarios; //Devolver el array completo
}

//Crear una tarjeta HTML para un usuario dado
function crearTarjeta(usuario) {
  const tarjeta = document.createElement('div'); //Contenedor principal
  tarjeta.className = 'tarjeta'; //Aplicar estilo de archivo CSS

  //Título: Nombre completo
  const titulo = document.createElement('h2');
  titulo.textContent = `${usuario.nombre} ${usuario.apellido}`;

  //Edad
  const infoEdad = document.createElement('p');
  infoEdad.innerHTML = `<strong>Edad:</strong> ${usuario.edad} años`;

  //Email
  const infoEmail = document.createElement('p');
  infoEmail.innerHTML = `<strong>Email:</strong> ${usuario.email}`;

  //Profesión
  const infoProfesion = document.createElement('p');
  infoProfesion.innerHTML = `<strong>Profesión:</strong> ${usuario.profesion}`;

  //Estado con color dinámico (activo: verde, inactivo: rojo)
  const infoEstado = document.createElement('p');
  infoEstado.innerHTML = `<strong>Estado:</strong> <span style="color: ${usuario.activo ? 'green' : 'red'};">${usuario.activo ? 'Activo' : 'Inactivo'}</span>`;

  //Fecha de creación en formato DD/MM/AAAA
  const infoFecha = document.createElement('p');
  infoFecha.innerHTML = `<strong>Fecha de creación:</strong> ${usuario.fechaCreacion}`;

  //Añadir todos los elementos al contenedor
  tarjeta.appendChild(titulo);
  tarjeta.appendChild(infoEdad);
  tarjeta.appendChild(infoEmail);
  tarjeta.appendChild(infoProfesion);
  tarjeta.appendChild(infoEstado);
  tarjeta.appendChild(infoFecha);

  return tarjeta; //Devolver la tarjeta completa
}

//Función principal para generar y mostrar las tarjetas en el DOM
function generarTarjetas() {
  const contenedor = document.getElementById('contenedor-tarjetas');
  contenedor.innerHTML = ''; //Elimina tarjetas anteriores

  //Solicitar cantidad de tarjetas
  const entrada = prompt('¿Cuántas tarjetas quieres generar?', '6');
  const cantidad = parseInt(entrada); //Convertir a número

  //Si no es un número válido o es menor a 1, crear 6 tarjetas por defecto
  const numTarjetas = (isNaN(cantidad) || cantidad < 1) ? 6 : cantidad;

  //Generar los usuarios y crear las tarjetas
  const usuarios = generarUsuarios(numTarjetas);
  usuarios.forEach(usuario => {
    const tarjeta = crearTarjeta(usuario);
    contenedor.appendChild(tarjeta); //Insertar en el DOM
  });
}

//Evento que al hacer click en el botón de generar, genera las tarjetas
document.getElementById('generar-btn').addEventListener('click', generarTarjetas);