class Curso {
    constructor (id, nombre, precio, descripcion, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.img = img;
        this.cantidad =1;

    }
}

const CursoAmor = new Curso (1, "--- El amor en la filosofía ---", 8000, "¿Qué dicen los filósofos sobre el amor?", "imagenes/amor.png");
const CursoFelicidad = new Curso (2, "--- La felicidad en la filosofía ---", 8000, "¿Qué dicen los filosofos sobre la felicidad?", "imagenes/felicidad.png");
const CursoHistoria = new Curso (4, "--- Filosofía de la historia ---", 8000, "Introducción a la filosofía de la hisotria", "imagenes/historia.png");
const CursoNietzsche = new Curso (3, "--- La filosofía de Nietzsche ---", 10000, "Introducción a la filosofía de Friedriz Nietzsche", "imagenes/Nietzsche.png");
const CursoSpinoza = new Curso (5, "--- La filosofía de Spinoza ---", 10000, "Introducción a la filosofía de Baruch de Spinoza", "imagenes/spinoza.png");
const CursoIntroduccion = new Curso (6, "--- La filosofía antigua ---", 8000, "Introducción a la filosofía antigua", "imagenes/introduccion.png");
const CursoSuperheroes = new Curso (7, "--- Superhéroes y filosofía ---", 10000, "Los superhéroes, la verdad y la justicia", "imagenes/superheroes.png");
const CursoPolitica = new Curso (8, "--- Introducción a la filosofía política ---", 8000, "Introducción a la filosofía política", "imagenes/politica.png");

const cursos = [CursoAmor, CursoFelicidad, CursoNietzsche, CursoHistoria, CursoSpinoza, CursoIntroduccion, CursoSuperheroes, CursoPolitica];

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


const contenedorCursos = document.getElementById("contenedorCursos");

const mostrarCursos = () => {
    cursos.forEach( Curso => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-2", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${Curso.img}" class="card-img-top imgCursos" alt="${Curso.nombre}">
                <div class= "card-body">
                    <h5>${Curso.nombre}</h5>
                    <p>$${Curso.precio}</p>
                    <p>${Curso.descripcion}</p>
                    <button class="btn colorBtn" id="boton ${Curso.id}"> Agregar al carrito </button>
                </div>
            </div>
                    `

    contenedorCursos.appendChild(card);

    const boton = document.getElementById(`boton ${Curso.id}`);
    boton.addEventListener("click", () => {
        agregarAlCarrito(Curso.id);
    })
            
    })
}


mostrarCursos();

const agregarAlCarrito = (id) => {
    const CursoenCarrito = carrito.find(Curso => Curso.id === id);
    if(CursoenCarrito) {
        CursoenCarrito.cantidad++;
        
    } else {
        const Curso = cursos.find(Curso => Curso.id === id);
        carrito.push(Curso);

    }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        calcularTotal();
    
    mostrarCarrito()

}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "",

    carrito.forEach(Curso => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-2", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                     <img src="${Curso.img}" class="card-img-top imgCursos" alt="${Curso.nombre}">
                    <div class= "card-body">
                        <h5>${Curso.nombre}</h5>
                        <p>${Curso.precio}</p>
                        <p>${Curso.cantidad}</p>
                        <button class="btn colorBtn" id="disminuir${Curso.id}"> - </button>
                        <button class="btn colorBtn" id="eliminar${Curso.id}"> Eliminar curso </button>
                        <button class="btn colorBtn" id="aumentar${Curso.id}"> + </button>

                        

                    </div>
                </div>
                    `

        contenedorCarrito.appendChild(card);
       

        const boton = document.getElementById(`eliminar${Curso.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(Curso.id)

        })
        
        const botonDisminuir = document.getElementById(`disminuir${Curso.id}`);
        botonDisminuir.addEventListener("click", () => {
            disminuirCantidad(Curso.id)
        })

        const botonAumentar = document.getElementById(`aumentar${Curso.id}`);
        botonAumentar.addEventListener("click", () => {
            aumentarCantidad(Curso.id)
        })

       

    })
    calcularTotal();
}




const eliminarDelCarrito = (id) => {
    const Curso = carrito.find(Curso => Curso.id === id);
    const indice = carrito.indexOf(Curso);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const disminuirCantidad = (id) => {
    const CursoenCarrito = carrito.find(Curso => Curso.id === id);
    if(CursoenCarrito.cantidad > 1){
        CursoenCarrito.cantidad--;
    }else {
        eliminarDelCarrito(CursoenCarrito.id)
    }
    mostrarCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const aumentarCantidad = (id) => {
    const CursoenCarrito = carrito.find(Curso => Curso.id === id);
    if (CursoenCarrito) {
        CursoenCarrito.cantidad++;
    }
    mostrarCarrito()

    localStorage.setItem("carrito", JSON.stringify(carrito))
}


const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener ("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const total = document.getElementById("total"); 

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(Curso => {
        totalCompra += Curso.precio * Curso.cantidad;
    })
    total.innerHTML = ` $${totalCompra}`;
}




