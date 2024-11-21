# Reciclaje Electronico T2

Proyecto aplicación web, curso Desarrollo de Aplicaciones Web CC5002.

## Acerca de Reciclaje Electronico

El proyecto "Reciclaje Electronico" tiene como objetivo principal crear una aplicación web que facilite el reciclaje de dispositivos electronicos, se inpira en la pelicula de Disney Wall-E, las imagenes utilizadas en `index.html` fueron creadas por ChatGPT por lo que no hay problemas de autor.

## Decisiones de diseño

Hice un archivo html "base.html" junto a su css "nav.css" para la navbar para en un futuro poder extender ese html a los demas con el framework Flask, por ahora, ese codigo lo copio y pego en los distintos html.
Se que en el enunciado dice "Todos los archivos HTML de su tarea, excepto el “index.html” deben incluir un botón o enlace
que permita volver a la portada de la aplicación (index.html).", mi navbar esta en todos los html, creo que hace más bonita y util toda la web, por lo que a pesar de que se este en index.html igual esta la navbar que apretando el logo se puede ir a index de nuevo.

Para las validaciones en `agregar-donacion.html`, decidi separarlas en dos archivos JavaScript `validacionC.js` y `validacionD.js`, validacionC se encarga de validar los inputs de la Información de Contacto y validacionD valida la informacion de la Información del Dispositivo. Cada validación en caso de ser rechazada tiene su val-box que se desplegará en el html si es necesario. 
Esta idea me llevo a muchos problemas al parecer porque los archivos tienen dependencias, por temas de tiempo decidi dejarlo todo en un solo archivo grande `validate.js` esperando en un futuro con esta correción o preguntando a los profesores como solucionar mi problema con los dos archivos de validación.

Deje los 5 ejemplos que se piden en `ver-dispositivos.html`, cada una de ellas si se click mandan a su correspondiente `informacion-dispositivos.html` con datos en el código `poblarInfo.js`.

Para el popup de la imagen vi un tutorial en youtube que mandaron al telegram, https://www.youtube.com/watch?si=Z6gIHBBtq6FhDwx9&v=QghhoJBdw7A&feature=youtu.be.


## Actualizaciones Tarea 2

Para esta Tarea 2 sinceramnte no le dedique el tiempo necesario, anotare los cambios.

### Extensiones y urls con Flask 

Como mencione en la primera tarea, procure en hacer un archivo base.html con la navbar, asi que lo primero que hice fue actulializar todos los htmls extendiendo de este base y cambiando la forma de referenciar usando Flask como por ejemplo 
`{{ url_for('static', filename='css/infoDisp.css') }}`.

Una vez actualizados todos los html y con la aplicación web funcionando igual que antes solo que ahora con las facilidades de Flask, me dedique a la base de datos.

En el archivo `validate.py` deje las validaciones que se hacen en el servidor y además cree la base de datos juntos a sus querys en sql y en python, además de con la ayuda de **BeeKeeper Studio** cree el usuario pedido con la query:

`CREATE USER 'cc5002'@'localhost' IDENTIFIED BY 'programacionweb';`

Intente avanzar algo más en codigo en validate.py, db.py y app.py, pero me costo y no le dedique suficiente tiempo, igualmente presento estos avances :s


## Actualizaciones Tarea 3

Primero para la Tarea 3, termine con todo lo que pedian en la tarea 2 pues la entregue incompleta. Esto quiere decir que las oantallas de `agregar-donacion` y `ver-dispositivos` estan conectados con la base de datos.

Durante mi tarea tuve problemas con la conexión con la base de datos, no es que no funcione, porque si lo hace. Sino que no se si es mi pc que tendra algo que despues de cierto tiempo si entraba al BeeKeeper me tiraba `error: connect ECONNREFUSED 127.0.0.1:3306`, esto lo solucionaba abriendo el programa `MySQL- Installer - Comunity` y dandole a Reconfigure chequeadno que todo este bien instalado, haciendo ese proceso y abriendo de nuevo el BeeKeeper mi base de datos funciono bien, no sabria decir porque ocurre esto pero lo comento por si acaso ocurre en la corrección.  
Creo que es porque tengo desactivada la opción de que empiece a funcionar MySQL cada vez que se prende mi pc.

Entrego la tarea 3 sin la carpeta `venv` pues es el ambiente virtual. 

### Comentarios en dispositivos 

Los comentarios de cada dispositivo ahora se guardan en la base de datos, con una respectiva validación cumpliendo lo espeficiado. De la misma forma, si entro a un dispositivo, sus comentarios serán buscados en la base de datos y se mostraran en pantalla.


### AJAX y Gráficos

Para los gráficos me base en el código del auxiliar 8, tome el código, lo copie aqui y fui cambiando las cosas para que funcionara con mis datos.