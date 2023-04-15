const Usuarios = [{
    nombre: 'Guillermo',
    mail: 'Guillermodiaz@gmail.com',
    pass: 'Willyrex123'

},
{
    nombre: 'Samuel',
    mail: 'SamuelDeluque@gmail.com',
    pass: 'Vegettagamer123'

},
{
    nombre: 'Ruben',
    mail: 'DoblasRuben@gmail.com',
    pass: 'RubenOMG123'

},
{
    nombre: 'Ivan',
    mail: 'IvanRaul@gmail.com',
    pass: 'Speed123'

}
]

const mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    recordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    btnLogout = document.getElementById('btnLogout'),
    modalEl = document.getElementById('modalLogin'),
    nombreUsuario = document.getElementById('nombreUsuario'),
    modal = new bootstrap.Modal(modalEl),
    toggles = document.querySelectorAll('.toggles'),
    catalogo = document.getElementById('catalogo'),
    btnVerCatalogo = document.getElementById('verCatalogo'),
    btnCompra = document.getElementById('btnComprar')




function validarUsuario(baseUsuarios, user, pass) {
    let encontrado = baseUsuarios.find((baseUsuarios) => baseUsuarios.mail == user);

    if (typeof encontrado === 'undefined') {
        return false;

    } else {
        if (encontrado.pass != pass) {
            return false;

        } else {
            return encontrado;
        }
    }
}


function guardarDatos(baseUsuario, storage) {
    const usuario = {
        'name': baseUsuario.nombre,
        'user': baseUsuario.mail,
        'pass': baseUsuario.pass
    }

    storage.setItem('usuario', JSON.stringify(usuario));

}

function recuperarDatos(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}


function MostrarUsuario(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <div class="badge bg-primary text-wrap" style="width: 6rem;">
    ${usuario.name}
  </div>`
}

function hudLogeado(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);

    });
}

function crearTarjetas(arrayElementos, contenedorHTML) {
    contenedorHTML.innerHTML = '';

    for (const elemento of arrayElementos) {

        let divColTarjeta = document.createElement('div');

        divColTarjeta.className = 'col';

        divColTarjeta.innerHTML = `
        <div class="card h-100 bg-light">
            <h4 class="card-header">${elemento.titulo}</h4>
            <img " class="coverLibro" alt="imagen de juego ${elemento.img}">
            <div class="card-body">
            <h6 class="card-text fst-italic">Autor</h6>
                <p class="card-text">${elemento.Categoria}</p>
                <h6 class="card-text fst-italic">Resumen</h6>
                <p class="card-text">${elemento.precio}</p>
            </div>
            <div class="card-footer">
            <span>Precio: ${elemento.precio} puntos</span>
            </div>
        </div>`;

        contenedorHTML.append(divColTarjeta);
    }

}

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    if (!mailLogin.value  || !passLogin.value) {
        alert('debe completar todos los campos');
    } else {
        let datos = validarUsuario(Usuarios, mailLogin.value, passLogin.value);

        if (!datos) {
            alert('Usuario y/o contraseña incorrecto')
        } else {
            if (recordar.checked) {
                guardarDatos(datos, localStorage);
                nombreUsuario(recuperarDatos(sessionStorage));
            }else {
                guardarDatos(datos, sessionStorage);
                MostrarUsuario(recuperarDatos(sessionStorage));
            }
            modal.hide()

            hudLogeado(toggles, 'd-none');

        }
    }

})

btnLogout.addEventListener('click', () => {
    borrarDatos();
    hudLogueado(toggles, 'd-none');
});



function crearHTML(array) {
    array.forEach((juego) => {
        const tarjeta = `
            <div class="col">
                <div class="card h-100" style="width: 18rem;">
                    <img src="${juego.img}" class="card-img-top" alt="${juego.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${juego.titulo}</h5>
                        <p class="card-text">precio: ${juego.precio}</p>
                        <p class="card-text">categoria: ${juego.Categoria}</p>
                        <button class="btn btn-outline-primary me-2" id="btnComprar">Comprar.</button>
                        
                
                    </div>
                </div>
            </div>`;
        catalogo.innerHTML += tarjeta;
    })
}

btnVerCatalogo.addEventListener('click', () => {
    fetch('./script/data.json') 
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            crearHTML(data);
        })
})



















