document.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario');
    const usuarioSpan = document.getElementById('usuarioNombre');
    if (usuario) {
        usuarioSpan.textContent = `👤 ${usuario}`;
    } else {
        usuarioSpan.textContent = '👤 Invitado';
    }
});

const galeria = document.getElementById('galeria');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('imgGrande');
const caption = document.getElementById('caption');
const cerrar = document.querySelector('.cerrar');
const buscador = document.getElementById('buscador');
const modoToggle = document.getElementById('modoToggle');

let cantidad = 16; // Número de imágenes a cargar inicialmente

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

// Cargar imágenes al iniciar
cargarImagenes(cantidad);

// Modal cerrar
cerrar.onclick = () => modal.style.display = 'none';
modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

// Buscar imágenes
buscador.addEventListener('input', function () {
  const texto = this.value.toLowerCase();
  document.querySelectorAll('.galeria img').forEach(img => {
    const visible = img.dataset.caption.toLowerCase().includes(texto);
    img.style.display = visible ? 'block' : 'none';
  });
});

// Botón modo oscuro/claro
modoToggle.addEventListener('click', () => {
  document.body.classList.toggle('oscuro');
  modoToggle.textContent = document.body.classList.contains('oscuro') ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
});

// Función para cargar más imágenes
function cargarMas() {
  cantidad += 8;
  cargarImagenes(cantidad);
}

document.getElementById('subirImagen').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = document.createElement('img');
      img.src = event.target.result;
      img.alt = "Imagen subida";
      galeria.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

function cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = "login.html";
}
