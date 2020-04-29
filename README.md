# API DELILAH RESTO

Este proyecto se basa en la realización de una API para un Restaurant ficticio, el cual permite la administración 
de clientes, los pedidos que realizan y los productos que se piden a este restaurant.

## Cómo comenzar

En las siguientes entradas observaras como es el entorno donde se crea la API y como ejecutarla en tu entorno local

### Estructura del proyecto

Esto te ayudará a entender de antemano como se organizan las carpetas del proyecto

- **DelilahResto**
    - bdd
    - src
        - **app**
        - **config**
        - routes 
        - middlewares
        - controllers
        - models
  
### Instalación
  
Luego de tener la copia de este proyecto, ya sea haciendo un pull a este repositorio, o descargandolo como .zip, procederemos a configurar
 nuestro proyecto en base a nuestro entorno.
  
Primero, entraremos a la siguiente ruta, en donde configuraremos el puerto en donde querramos que se corra nuestro server (PORT)
  
 *DelilahResto/src/config/config.js*
  
Tambien encontraremos la configuración con respecto a la base de datos, donde deberás configurar las propiedades en base a tu sistema.
Por último tenemos el Token, y su PRIVATE_KEY, la cual la configuraremos con la firma secreta que tendra nuestra API

### Creación de Base de Datos

Para crear nuestra base de datos, iremos a la siguiente ruta:

 *DelilahResto/bdd/DelilahRestoBDD.sql*
 
Este contiene el script para crear nuestra base de datos, la cual contiene toda la estructura y datos para poder comenzar con la prueba
de esta API.
Para crearla, necesitaremos un programa como mySqlWorkbench, en donde en una nueva consulta SQL, copiaremos y pegaremos el script, para 
luego ejecutarlo y ver nuestra base de datos creada.

## Inicializar

### **Correr el Servidor**

Deberás seguir los siguientes pasos para la siguiente parte del proyecto:
  
- A traves del siguiente comando, se instalarán los paquetes y dependencias del proyecto para la ejecución del mismo, este comando se debe
ejecutar desde la terminal en la carpeta raíz del proyecto

~~~  
npm i  
~~~

Luego de esto, una carpeta llamada *node_modules* se creará.

- Podemos correr el servidor a través de las siguientes dos opciones:

Ejecutando el comando  
~~~  
npm start  
~~~
O ejecutando el comando, el mismo se deberá ejecutar desde la carpeta **DelilahResto/src/app** 

~~~  
node app.js  
~~~  

Si todo está bien, veremos el siguiente mensaje en  la consola:
~~~
La conexión a la base de datos se estableció exitosamente
El servidor está escuchando en el puerto 3000
~~~

# Funcionalidades de la API

Las funcionalidades principales son la posibilidad de realizar *CRUD* (Create, Read, Update, Delete) de productos y pedidos.
Además de contar con la posibilidad de crear usuarios y permitirles logearse

## Operaciones con usuarios:

### Crear usuario 
- Método HTTP: **POST**
- Endpoint: *http://localhost:3000/api/usuarios*

***request body:***

~~~
{
  "username": "maryexample",
  "fullname": "Mary Example",
  "address": "Calle xx, Barrio. Ciudad, País.",
  "password": "password-123",
  "mail": "mary@example.com",
  "phone": "351-123654",
  "token": "",
  "user_type_id": 1
}
~~~

El user_type_id admite puede ser **1(Usuario común)** o **2(Administrador)**, donde el administrador obtiene la mayoría de los permisos
para realizar diferentes peticiones como creacion y eliminación de elementos.

***response:***

~~~
{
  message: 'Se ha creado un nuevo usuario'
}
~~~

### Obtener información de todos los usuarios 
- Método HTTP: **GET**
- Endpoint: *http://localhost:3000/api/usuarios*

***response:***

~~~
[
    {
        "ID": 1,
        "Nombre de usuario": "johndoe",
        "Nombre Completo": "John Doe",
        "e-mail": "john@doe.com",
        "Telefono": "351-09988776",
        "Direccion": "Av COlon 230",
        "Tipo de usuario": 1,
        "Rol": "Usuario"
    },
    {
        "ID": 2,
        "Nombre de usuario": "delilah123",
        "Nombre Completo": "Delilah Resto",
        "e-mail": "delilah@resto.com",
        "Telefono": "351-2255889",
        "Direccion": "Bv. San Juan 660",
        "Tipo de usuario": 2,
        "Rol": "Administrador"
    }
]
~~~
  
### Obtener información de UN usuario 
- Método HTTP: **GET**
- Endpoint: *http://localhost:3000/api/usuarios/:id*

***response:***

~~~
[
    {
        "ID": 1,
        "Nombre de usuario": "johndoe",
        "Nombre Completo": "John Doe",
        "e-mail": "john@doe.com",
        "Telefono": "351-09988776",
        "Direccion": "Av COlon 230",
        "Tipo de usuario": 1,
        "Rol": "Usuario"
    }
]
~~~  

### Obtener MI información 
- Método HTTP: **GET**
- Endpoint: *http://localhost:3000/api/usuarios/myinfo*

***response:***

~~~
[
    {
        "ID": 2,
        "Nombre de usuario": "delilah123",
        "Nombre Completo": "Delilah Resto",
        "e-mail": "delilah@resto.com",
        "Telefono": "351-2255889",
        "Direccion": "Bv. San Juan 660",
        "Tipo de usuario": 2,
        "Rol": "Administrador"
    }
]
~~~  

En este endpoint, obtenemos la información del usuario ya logueado, ya que solo un usuario con roles de **administrador** puede acceder
a la info mediante el GET ***usuarios/*** y el GET ***usuarios/:id***

### Modificar usuario
- Método HTTP: **PUT**
- Endpoint: *http://localhost:3000/api/usuarios/:id*

***request body:***

~~~
{
  "username": "maryexample",
  "fullname": "Mary Example",
  "address": "Calle xx, Barrio. Ciudad, País.",
  "password": "password-123",
  "mail": "mary@example.com",
  "phone": "351-123654",
  "token": "",
  "user_type_id": 1
}
~~~

***response:***

~~~
{
 'Se actualizó el usuario con id 2'
}
~~~

### Loguearse
- Método HTTP: **POST**
- Endpoint: *http://localhost:3000/api/usuarios/login*

***request body:***

~~~
{
  "username": "maryexample",
  "password" : "examplepass"
}
~~~

***response:***

~~~
{
    "message": "Se ha logueado exitosamente",
    "token": "xxxx.yyyy.zzzz"
}
~~~

El token nos servirá para los diferentes endpoints que piden autenticación y autorización, por lo cual, deberemos copiar el token y agregarlo
como un header de Authorization, **no olvidar agregar la palabra Bearer antes del token**


## Operaciones con Platos o productos:

### Crear producto 
- Método HTTP: **POST**
- Endpoint: *http://localhost:3000/api/platos*

***request body:***

~~~
{
  "product_name": "Hamburguesa Doble",
  "price": 220
}
~~~

***response:***

~~~
{
  message: 'Se ha creado un nuevo plato'
}
~~~

### Obtener información de todos los platos
- Método HTTP: **GET**
- Endpoint: *http://localhost:3000/api/platos*

***response:***

~~~
[
    {
        "ID": 1,
        "Nombre del producto": "Hamburguesa Simple",
        "Precio": 220
    },
    {
        "ID": 2,
        "Nombre del producto": "Coca-Cola 1.5 L",
        "Precio": 100
    },
    {
        "ID": 3,
        "Nombre del producto": "Hook Cola",
        "Precio": 70
    }
]
~~~
  
### Obtener información de UN plato 
- Método HTTP: **GET**
- Endpoint: *http://localhost:3000/api/platos/:id*

***response:***

~~~
[
    {
        "ID": 2,
        "Nombre del producto": "Coca-Cola 1.5 L",
        "Precio": 100
    }
]
~~~  

### Modificar plato
- Método HTTP: **PUT**
- Endpoint: *http://localhost:3000/api/platos/:id*

***request body:***

~~~
{
  "product_name": "Hamburguesa Doble",
  "price": 220
}
~~~

***response:***

~~~
{
 'Se actualizó el plato con id 1'
}
~~~

### Eliminar plato
- Método HTTP: **DELETE**
- Endpoint: *http://localhost:3000/api/platos/:id*  

***response:***

~~~
{
 'Se eliminó el plato con id 1'
}
~~~


## Operaciones con pedidos u ordenes:

### Crear pedido
- Método HTTP: **POST**
- Endpoint: *http://localhost:3000/api/pedidos*

***request body:***

~~~
{
  "payment_id": 1,
  "products_id" : [2,3],
  "quantity" : [1,4]
}
~~~

En payment_id las opciones son **1(efectivo), 2(debito) y 3(credito)**
En products_id irá un array con los id de los productos deseados, y en quantity, la cantidad de cada uno de estos productos

***response:***

~~~
{
  message: 'El pedido se ha creado'
}
~~~

### Obtener información de todos los pedidos
- Método HTTP: **GET**
- Endpoint: *http://localhost:3000/api/pedidos*

***response:***

~~~
{
    "orders": [
        {
            "Estado": "Cancelado",
            "Hora": "11:11:20",
            "Numero": 1,
            "Metodo de pago": "Efectivo",
            "Total": 420,
            "Usuario": "John Doe",
            "Direccion": "Av COlon 230"
        }
    ],
    "details": [
        {
            "Descripcion": "1x Hamburguesa Simple",
            "Numero de orden": 1
        },
        {
            "Descripcion": "2x Coca-Cola 1.5 L",
            "Numero de orden": 1
        }
    ]
}
~~~

Se detallan primero los pedidos y luego los detalles con los productos y sus cantidades, donde también vemos la ID de la orden a la 
cual pertenece este detalle
  
### Obtener información de UN pedido 
- Método HTTP: **GET**
- Endpoint: *http://localhost:3000/api/pedido/:id*

***response:***

~~~
{
    "order": {
        "Estado": "Cancelado",
        "Hora": "11:11:20",
        "Numero": 1,
        "Metodo de pago": "Efectivo",
        "Total": 420,
        "Usuario": "John Doe",
        "Direccion": "Av COlon 230"
    },
    "detail": [
        {
            "Descripcion": "1x Hamburguesa Simple"
        },
        {
            "Descripcion": "2x Coca-Cola 1.5 L"
        }
    ]
}
~~~  

### Obtener todos los detalles de pedidos
- Método HTTP: **GET**
- Endpoint: *http://localhost:3000/api/platos/details*

***response:***

~~~
[
    {
        "Descripcion": "1x Hamburguesa Simple",
        "Numero de orden": 1
    },
    {
        "Descripcion": "2x Coca-Cola 1.5 L",
        "Numero de orden": 1
    }
]

~~~

### Modificar estado de pedido
- Método HTTP: **PUT**
- Endpoint: *http://localhost:3000/api/pedidos/:id/estado*

***request body:***

~~~
{
  "state": 1
}
~~~

Los estados pueden ser los siguientes:
- 1 Nuevo
- 2 Confirmado
- 3 Preparando
- 4 Enviando
- 5 Cancelado 
- 6 Entregado

***response:***

~~~
{
 message: 'Se ha actualizado el estado del pedido con id 2'
}
~~~

### Eliminar pedido
- Método HTTP: **DELETE**
- Endpoint: *http://localhost:3000/api/pedidos/:id*  

***response:***

~~~
{
 'Se eliminó el pedido con id 1'
}
~~~

## Autenticación

Para acceder a los diferentes endpoints es necesario estar logeado, por lo cual, el único endpoint en el cual no es necesario agregar el
token al header es a **/usuarios/login**, al resto de las rutas, es necesario si o si un usuario logeado, sin importar su rol.
Caso contrario, aparecerá este error como response

~~~
{
    "error": "Error al validar usuario, debe loguearse antes"
}
~~~

## Autorización

Solo los siguientes endpoints admiten a usuarios comunes su ingreso:

- POST /usuarios/login
- GET /usuarios/myinfo
- POST /usuarios
- GET /platos
- GET /platos/:id
- POST /pedidos

El resto de los endpoints, se podrán ingresar solo si el usuario logeado es un Administrador, caso contrario, aparecerá el siguiente error:

~~~
{
    "error": "No posee autorización.",
    "message": "Acceso Denegado."
}
~~~
