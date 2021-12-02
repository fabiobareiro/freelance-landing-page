/* Componente Menu */

((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  // rutina que cuando detecta el click en algun enlace dentro del element menu,
  // quite la clase "is-active" que lo cierra y asigna y elimina "none" en botones
  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;
    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* Contact Form */

((d) => {
  /* Variables del DOM a utilizar */
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  /* Evento de envio que nos activara el evento */
  $form.addEventListener("submit", (e) => {
    /* Evitamos que el formulario se envie y asi podremos controlarlo por AJAX */
    e.preventDefault();
    /* Quitamos clase none para que aparezca el loader */
    $loader.classList.remove("none");
    /* Ya podremos enviar la petición hacia el servicio de formsubmit.co */
    fetch("https://formsubmit.co/ajax/arqrossilaura@gmail.com", {
      /* Opciones de la peticion: POST y la información que se va a enviar con la variable FormData que serializara
        los datos y se los mande a la petición del servicio que utilizamos y los datos estan en e.target que origina el evento */
      method: "POST",
      body: new FormData(e.target),
    })
      /* then 1: si la rta se ejecuto correctamente, la transformamos a json la información
        y si existe algun error rechazamos la promesa que devuelve fetch() para que lo manipule hacia 
        el metodo catch() */
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      /* Parte positiva: devolvera un mensaje en formato json de que si envío la información
        y cuando ya la ha enviado ocultamos el loader y 
        1) activamos ventana modal de agradecimiento
        con el id="gracias": location es el objeto que controla todas las partes de la URL del navegador
        2)Finalmente, reseteamos el form */
      .then((json) => {
        console.log(json);
        location.hash = "#gracias";
        $form.reset();
      })
      /* Si falla capturamos el error */
      .catch((err) => {
        console.log(err);
        /* Si el statusText no existe (||) (no nos trae el error) le asignamos a message el mensaje personalizado*/
        let message =
          err.statusText || `Ocurrio un error al enviar, intente nuevamente`;
        /* Buscamos el h3 del contact-form-response y pegamos el error */
        $response.querySelector(
          "h3"
        ).innerHTML = `Error: ${err.status}: ${message}`;
      })
      /* Independientemente de que haya sido exitoso o haya capturado un error,
        se ejecutara el finally y agregar la clase none al loader para que desaparezca
        y setear un time para agregar el id="close" para cerrar la ventana modal despues de 3s
        ya que no tiene boton de cerrar (se cierra automaticamente con esto) */
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = `#close`;
        }, 3000);
      });
  });
})(document);

/* ***Comentarios al pie*** /*

/* Buena practica es anteponer en las variables "$" cuando hacen referencia
un elemento del DOM */
