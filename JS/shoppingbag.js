const guardadoEnBolsita = JSON.parse(localStorage.getItem("Bolsa"));
const bolsaNumero = document.querySelector("#bolsa-numero");
const bolsitaProductos = document.querySelector(".bolsita-productos");
const bolsitaDetalles = document.querySelector(".bolsita-detalles");
let btnEliminar = document.querySelectorAll(".bolsita-eliminar-producto");
let btnsFinales = document.querySelector(".btns-finales");
let btnComprar = document.querySelector(".btn-comprar");
let btnVaciar = document.querySelector(".btn-vaciar");
const subtotalContainer = document.querySelector(".subtotal");
const subtotal = document.querySelector("#subtotal strong");
const total = document.querySelector("#total strong");
const msjVacio = document.querySelector(".bolsa-vacia");

function mostrarProductosBolsita() {
  if (guardadoEnBolsita && guardadoEnBolsita.length > 0) {
    bolsitaProductos.classList.remove("desactivado");
    subtotalContainer.classList.remove("desactivado");
    btnsFinales.classList.remove("desactivado");
    msjVacio.classList.add("desactivado");

    guardadoEnBolsita.forEach((producto) => {
      const trBolsita = document.createElement("tr");
      trBolsita.classList.add("bolsita-producto");
      trBolsita.innerHTML = `<td class="bolsita-eliminar-producto" id="${
        producto.id
      }">
            <i class="fa-solid fa-circle-xmark"></i><a href="#"></a>
            </td>
            <td><img src="${producto.image}" alt="${producto.titulo}" /></td>
            <td>${producto.titulo}</td>
            <td class="bolsita-producto-precio">$${producto.precio}</td>
            <td class="bolsita-producto-cantidad">
            <input type="number" value="${producto.cantidad}" />
            </td>
            <td class="bolsita-producto-subtotal">$${
              producto.precio * producto.cantidad
            }</td>`;
      bolsitaProductos.appendChild(trBolsita);
    });
  } else {
    bolsitaProductos.classList.add("desactivado");
    subtotalContainer.classList.add("desactivado");
    btnsFinales.classList.add("desactivado");
    msjVacio.classList.remove("desactivado");
  }
  btnsEliminar();
}

mostrarProductosBolsita(guardadoEnBolsita);
cargarLocal();

function cargarLocal() {
  if (guardadoEnBolsita && guardadoEnBolsita.length > 0) {
    shoppingbag = guardadoEnBolsita;
    actualizarBolsita();
  }
}

function actualizarBolsita() {
  const bolsaNumero = document.querySelector("#bolsa-numero");

  let numeroActualizado = shoppingbag.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  bolsaNumero.innerHTML = numeroActualizado;
}

function btnsEliminar() {
  btnEliminar = document.querySelectorAll(".bolsita-eliminar-producto");

  btnEliminar.forEach((btn) => {
    btn.addEventListener("click", eliminarProducto);
  });
}

function eliminarProducto(e) {
  const productoId = e.currentTarget.id;
  const productoEliminadoIndex = guardadoEnBolsita.findIndex(
    (producto) => producto.id === productoId
  );

  Toastify({
    text: "Producto eliminado",
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

  guardadoEnBolsita.splice(productoEliminadoIndex, 1);
  localStorage.setItem("Bolsa", JSON.stringify(guardadoEnBolsita));

  const productoEliminadoElemento = e.currentTarget.parentNode;
  productoEliminadoElemento.remove();

  actualizarBolsita();
}

function vaciarBolsita() {
  guardadoEnBolsita.length = 0;
  localStorage.setItem("Bolsa", JSON.stringify(guardadoEnBolsita));
  mostrarProductosBolsita();
  actualizarBolsita();
}

btnVaciar.addEventListener("click", vaciarBolsita);

function calcularTotal() {
  const sumaProductos = guardadoEnBolsita.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  subtotal.innerText = `$${sumaProductos}`;
  total.innerText = `$${sumaProductos}`;
}

function compra() {
  guardadoEnBolsita.length = 0;
  localStorage.setItem("Bolsa", JSON.stringify(guardadoEnBolsita));

  bolsitaProductos.classList.add("desactivado");
  btnsFinales.classList.add("desactivado");
  const agradecimiento = document.querySelector(".agradecimiento");
  agradecimiento.classList.remove("desactivado");
}

btnComprar.addEventListener("click", compra);
