//Autorización por token para acceso a la base de datos
const token = '915|R9cNRDzg5yxJmJU1CryU2h2yzpbe6FmZorjktO6y';
const headers = {
    Authorization: `Bearer ${token}`
}

const urlgtproducts = "https://e-commerce-api-academlo.herokuapp.com/api/products";
const urludtproducts= "https://e-commerce-api-academlo.herokuapp.com/api/products";
const urlupdateproduct= "https://e-commerce-api-academlo.herokuapp.com/api/products/1";

//Función para imprimir el listado de productos disponibles
function printProducts(products) {
    // Identificar el contenedor
    const container = document.getElementById('catalogo');
    // Generar el HTML
    let html = '';
       
    for(let i = 0; i < products.length; i++) {
        
        let priceN=products[i].price;
        let priceC= numeral(priceN);
        let priceCurrency=priceC.format("$0,000.00");

        html += `<div class="col-md-4 col-lg-3 mt-3 card  ">
                    <div class="flex">
                        <div class=" card-body">
                        <img class="cart" src="${products[i].image}" >
                        <h5 class="card-title">${products[i].name}</h5>
                        <p class="card-text">${priceCurrency}</p>
                        <button onclick="editProducts(${products[i].id})">Agregar</button>
                        <button onclick="deletProduct(${products[i].id})">Borrar</button>
                        </div>
                        
                    </div>
                </div>`
    }

    // Imprimir el HTML
    container.innerHTML = html;
}

//funcion para pasar el producto seleccionado al formulario y editarlo
function editProducts(id){

   
    console.log(id);

    document.getElementById("precio").value=id;

    //const products = response.data

    axios.get(urludtproducts, { headers: headers })
    .then(function (response) {
        
        console.log(response);

        const products = response.data;
        console.log(products);

        for(let i=0;i<products.length;i++){

            if(products[i].id==id){
                document.getElementById("nombre").value=products[i].name;
                document.getElementById("precio").value=products[i].price;
                document.getElementById("foto").value=products[i].image;
                document.getElementById("id").value=products[i].id;
            }
            
        }
    })
    .catch(function (error) {
        alert('No se pudo cargar');
        console.log(error);
    })

    
}

//Función para editar el producto seleccionado
function editSelected(id){
    
    id=document.getElementById("id").value;
    console.log(id);

    axios.get(urludtproducts, { headers: headers })
    .then(function (response) {
        
        const products = response.data;
     
        for(let i=0;i<products.length;i++){

            if(products[i].id==id){
                
                const updateProduct = {
                    name: document.getElementById("nombre").value,
                    price: document.getElementById("precio").value,
                    image: document.getElementById("foto").value,
                }

                axios.put(urlupdateproduct, updateProduct)
                    .then(function (response) {
                        alert('Producto dado de alta correctamente');
                        getProducts();
                    })
             
            
            }
            
            
        }
    })
    .catch(function (error) {
        alert('No se pudo cargar');
        console.log(error);
    })


}

//Borrar artículo del  catálogo
function deletProduct(id){
    
    console.log(id);

    let products=[];

    axios.delete(urlgtproducts,products[id])
            .then(function (response) {
                products = response.data;
                printProducts(products);
            })
            .catch(function (error) {
                console.log(error);
            })
    

    
    for(let i=0;i<products.length;i++){

        if(products[i]==id){

           axios.delete(urlgtproducts, products[i])
            .then(function (response) {
                const products = response.data;
                printProducts(products);
            })
            .catch(function (error) {
                console.log(error);
            })
        }

    }

}



//Pasar los productos para su impresión en pantalla
function getProducts() {
    axios.get(urlgtproducts, { headers: headers })
        .then(function (response) {
            const products = response.data;
            printProducts(products);
        })
        .catch(function (error) {
            console.log(error);
        })
}

//Agregar productos al listado disponible
function createProduct() {
    const newProduct = {
        name: document.getElementById("nombre").value,
        price: document.getElementById("precio").value,
        image: document.getElementById("foto").value,
    }

    axios.post(urludtproducts, newProduct, { headers: headers })
        .then(function (response) {
            console.log(response);
            alert('Producto dado de alta correctamente');
            getProducts();
            document.getElementById("nombre").value="";
            document.getElementById("precio").value="";
            document.getElementById("foto").value="";
        })
        .catch(function (error) {
            alert('No se pudo crear el producto');
            console.log(error);
        })

        
}

//Ejecuta la visualización de los productos en el contenedor
getProducts();