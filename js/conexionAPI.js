async function listarProductos() {
    const conexion = await fetch("http://localhost:3001/productos");
    return conexion.json();
}

async function enviarProducto(nombre,precio,imagen)  {
    const conexion = await fetch("http://localhost:3001/productos",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
            nombre:nombre,
            precio:`$ ${precio}`,
            imagen:imagen
        })
    });
    return conexion.json();
}

async function borrarProducto(id){
    const conexion=await fetch(`http://localhost:3001/productos/${id}`,{
        method: "DELETE"
    })
    return conexion.ok
}

export const conexionAPI = {
    listarProductos,
    enviarProducto,
    borrarProducto

}
