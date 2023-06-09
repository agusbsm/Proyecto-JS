let productos = [];
fetch("./JS/ropalinda.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    mostrarProductos(productos);
  });

const contentProductos = document.querySelector(".wrap");
let btnAgregar = document.querySelectorAll(".btn-add-cart");

function mostrarProductos(productosElegidos) {
  contentProductos.innerHTML = "";

  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("contenedor-productos");
    div.innerHTML = `
<div class="contenedor-productos">
<img src= ${producto.image} alt= "${producto.titulo}" class="producto-imagen" />
<div class="producto-detalles">
<h3 class="producto-titulo"> ${producto.titulo} </h3>
<p class="producto-precio"> $${producto.precio} </p>
<button class="btn-add-cart" id="${producto.id}"> Agregar al carrito </button>
        </div>`;
    contentProductos.append(div);
  });
  btnsAgregar();
}

mostrarProductos(productos);

const btnTodos = document.querySelector("#todos");
const btnCategorias = document.querySelectorAll(".btn-categoria");

btnTodos.addEventListener("click", () => {
  btnCategorias.forEach((btn) => btn.classList.remove("activo"));
  mostrarProductos(productos);
});

const categoriaSeleccionada = localStorage.getItem("Categoria Seleccionada");

if (categoriaSeleccionada) {
  btnCategorias.forEach((btn) => {
    if (btn.id === categoriaSeleccionada) {
      btn.classList.add("activo");
    }
  });
}

btnCategorias.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btnCategorias.forEach((btn) => btn.classList.remove("activo"));
    e.currentTarget.classList.add("activo");
    const categoriaId = e.currentTarget.id;
    localStorage.setItem("Categoria Seleccionada", categoriaId);
    if (e.target === btnTodos) {
      mostrarProductos(productos);
    } else {
      const eleccionBotones = productos.filter(
        (producto) => producto.categoria.id === e.target.id
      );
      mostrarProductos(eleccionBotones);
    }
  });
});

function btnsAgregar() {
  btnAgregar = document.querySelectorAll(".btn-add-cart");
  btnAgregar.forEach((btn) => {
    btn.addEventListener("click", agregarProducto);
  });
}

let shoppingbag = [];

function agregarProducto(e) {
  const productoId = e.currentTarget.id;
  const productoEncontrado = productos.find(
    (producto) => producto.id === productoId
  );

  if (productoEncontrado) {
    if (shoppingbag.some((producto) => producto.id === productoId)) {
      const productoIndex = shoppingbag.findIndex(
        (producto) => producto.id === productoId
      );
      shoppingbag[productoIndex].cantidad++;
      mostrarMensaje2();
    } else {
      shoppingbag.push(productoEncontrado);
      mostrarMensaje();
    }
    guardarBolsitaEnLocalStorage();
    actualizarBolsita();
  }
}

function mostrarMensaje() {
  Toastify({
    text: "Producto agregado al carrito",
    duration: 2100,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #000000, #7c063f)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function mostrarMensaje2() {
  Toastify({
    text: "Producto ya agregado al carrito",
    duration: 2100,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #000000, #7c063f)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function actualizarBolsita() {
  const bolsaNumero = document.querySelector("#bolsa-numero");
  let numeroActualizado = shoppingbag.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  bolsaNumero.innerHTML = numeroActualizado;
}

function guardarBolsitaEnLocalStorage() {
  localStorage.setItem("Bolsa", JSON.stringify(shoppingbag));
}

const bolsitaGuardada = JSON.parse(localStorage.getItem("Bolsa"));
if (bolsitaGuardada && bolsitaGuardada.length > 0) {
  shoppingbag = bolsitaGuardada;
  actualizarBolsita();
}
