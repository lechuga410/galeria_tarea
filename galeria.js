document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem('usuario');
  const usuarioSpan = document.getElementById('usuarioNombre');
  const galeria = document.getElementById('galeria');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('imgGrande');
  const caption = document.getElementById('caption');
  const cerrar = document.querySelector('.cerrar');
  const buscador = document.getElementById('buscador');
  const subirImagen = document.getElementById('subirImagen');

  let cantidad = 16;

  // Mostrar nombre de usuario
  if (usuarioSpan) {
    usuarioSpan.textContent = usuario ? `👤 ${usuario}` : '👤 Invitado';
  }

  // Cargar imágenes
  function cargarImagenes(cantidadInicial) {
    galeria.innerHTML = '';
    for (let i = 1; i <= cantidadInicial; i++) {
      const img = document.createElement('img');
      img.src = `https://picsum.photos/600/400?random=${i}`;
      img.alt = `Imagen aleatoria ${i}`;
      img.dataset.caption = `Imagen #${i}`;
      img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        caption.textContent = img.dataset.caption;
      });
      galeria.appendChild(img);
    }
  }

  // Inicializar galería
  cargarImagenes(cantidad);

  // Cerrar modal
  if (cerrar && modal) {
    cerrar.onclick = () => modal.style.display = 'none';
    modal.onclick = (e) => {
      if (e.target === modal) modal.style.display = 'none';
    };
  }

  // Buscar imágenes
  if (buscador) {
    buscador.addEventListener('input', function () {
      const texto = this.value.toLowerCase();
      document.querySelectorAll('.galeria img').forEach(img => {
        const visible = img.dataset.caption?.toLowerCase().includes(texto);
        img.style.display = visible ? 'block' : 'none';
      });
    });
  }

  // Subir imagen
  if (subirImagen) {
    subirImagen.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = document.createElement('img');
          img.src = event.target.result;
          img.alt = "Imagen subida";
          img.dataset.caption = "Imagen subida";
          galeria?.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Función global para cerrar sesión
  function cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = "index.html";
  }
  window.cerrarSesion = cerrarSesion;

  // Hacer que cargarMas también esté disponible globalmente si se llama desde HTML
  window.cargarMas = function () {
    cantidad += 8;
    cargarImagenes(cantidad);
  };
});
