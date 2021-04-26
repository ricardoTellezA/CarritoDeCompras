const car = document.querySelector("#carrito");
const listCar = document.querySelector("#lista-carrito tbody");
const clearcar = document.querySelector("#vaciar-carrito");
const addCar = document.querySelector("#lista-cursos");
let productosCarrito = [];


eventos();
function eventos(){

    addCar.addEventListener("click", agregarCarrito);
    //ELIMINA CURSO DEL CARRITO
    car.addEventListener('click',eliminarCurso);

    //Vacia el carrito

    clearcar.addEventListener('click',() =>{
        productosCarrito = [];

        limpiarHTML();


    })

    document.addEventListener('DOMContentLoaded', () =>{
        productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];

        agregarHTML();
    })
}


function agregarCarrito(e){
   if(e.target.classList.contains('agregar-carrito')){
       e.preventDefault();

       const producto = e.target.parentElement.parentElement;


       agregarProducto(producto);

    
   }
}


function agregarProducto(producto){
    
    const objeto =  {
        nombre: producto.querySelector('h4').textContent,
        img: producto.querySelector('img').src,
        precio: producto.querySelector('p span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    const existe = productosCarrito.some(curso => curso.id === objeto.id);


    if(existe){
        const cursos = productosCarrito.map(curso => {
            if(curso.id === objeto.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        productosCarrito = [...cursos];
    }else{
        productosCarrito = [...productosCarrito, objeto];

    }

   

    

    agregarHTML(productosCarrito);
    
}
//ELIMINAR CURSO DEL CARRITO

function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        e.preventDefault();
        const cursoId =  e.target.getAttribute("data-id");
        //ELIMINA DEL ARREGLO 
        productosCarrito = productosCarrito.filter(curso => curso.id !== cursoId);
        console.log(productosCarrito);

        agregarHTML();

    }
   

}

function agregarHTML(){
    limpiarHTML();

    productosCarrito.forEach(articulo => {
        const {nombre,img,precio,cantidad, id} = articulo;

        const row = document.createElement("tr");

         row.innerHTML = `
        <td><img src="${img}" width="100" /></td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>`;
        


        listCar.append(row);
    })
    addLocalStorage();

}

function limpiarHTML(){
    while(listCar.firstChild){
        listCar.removeChild(listCar.firstChild);
    }
}

function addLocalStorage() {

    localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
    
}