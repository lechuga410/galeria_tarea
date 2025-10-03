 document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
      event.preventDefault(); // evita que se recargue la página

      // capturamos los valores
      let usuario = document.getElementById("Usuario").value.trim();
      let contrasena = document.getElementById("Contraseña").value.trim();

      // validamos
      if (usuario === "" || contrasena === "") {
        alert("Por favor completa todos los campos");
      } else {
        // si están completos → redirige
        window.location.href = "galeria.html";
      }
    });
  });
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // evitar que recargue la página

    const usuario = document.getElementById('Usuario').value;
    const contraseña = document.getElementById('Contraseña').value;

    // (Puedes agregar validaciones reales aquí)
    if (usuario && contraseña) {
        localStorage.setItem('usuario', usuario); // Guarda el nombre
        window.location.href = 'galeria.html'; // Redirige a la galería
    } else {
        alert('Por favor completa todos los campos.');
    }
});
