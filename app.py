from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from flask_cors import cross_origin
from utils.validations import *
from database import db
from werkzeug.utils import secure_filename
import hashlib
import random
import filetype
from datetime import datetime, timedelta
import os

# tuve problemas con la carpeta uploads, asi que dejo esto
upload_folder = os.path.join('static', 'uploads')  
os.makedirs(upload_folder, exist_ok=True)  


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/agregar-donacion", methods=("GET", "POST"))
def agregar_donacion():
    error = None
    if request.method == "POST":
        # datos de contacto del formulario
        username = request.form["name"]
        email = request.form["email"]
        phone_number = request.form["phone_number"]
        comuna_id = request.form["select-comuna"] 
        fecha_creacion = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # validar datos
        if validate_contact(username, phone_number, email):
            # crear contacto
            db.create_contact(username, email, phone_number, comuna_id, fecha_creacion)
            # id para los dispositivos
            contact_id = db.get_contact_by_order()[0][0]  
            device_count = 1
            while True:
                device_name = request.form.get(f"disp_name{device_count}")
                if not device_name:
                    break  

                device_description = request.form.get(f"description{device_count}")
                device_type = request.form.get(f"tipo{device_count}")
                device_years = request.form.get(f"years_use{device_count}")
                device_state = request.form.get(f"estado{device_count}")

                # validar dispositivos
                if validate_disp(device_name,device_type,device_years,device_state):
                    # crear dispositivos
                    device_id = db.create_disp(contact_id, device_name, device_description, device_type, device_years, device_state)
                    # archivos
                    files = request.files.getlist(f"fotos{device_count}")
                    for file in files:
                        if file and validate_don_img(file):

                            filename = secure_filename(file.filename)
                            file_path = os.path.join(upload_folder, filename).replace('\\', '/')
                            file.save(file_path)
                            # subir archivo a bd 
                            db.create_arch(file_path, filename, device_id)

                device_count += 1

            return redirect(url_for("index"))
        else:
            error = "Los datos de contacto no son válidos."

    return render_template("agregar-donacion.html", error=error)

@app.route("/ver-dispositivos", methods=("GET", "POST"))
def ver_dispositivos():
    page = request.args.get('page', 1, type=int)  # Obtiene la página actual de los parámetros de la solicitud
    limit = 5  # Número de dispositivos por página
    offset = (page - 1) * limit  # Cálculo del desplazamiento para la consulta

    # Obtiene los dispositivos según la página actual
    dispositivos = db.list_five_disp() if page == 1 else db.next_five()

    dispositivos_con_comuna_y_imagen = []
    for dispositivo in dispositivos:
        contacto_id = dispositivo[1]  
        comuna_id = db.get_contact_comuna(contacto_id)  
        comuna_name = db.get_comuna_name(comuna_id)  
        imagen_ruta = db.get_archivo_ruta(dispositivo[0])  
        
        if imagen_ruta:
            imagen_ruta = imagen_ruta.replace("static/", "", 1)  # quita /static, las imagenes se me subian como /static/static, por eso lo quito
        
        # añade a la tabla de dispositivas las comunas e imagenes
        dispositivos_con_comuna_y_imagen.append((*dispositivo, comuna_name, imagen_ruta))

    total_dispositivos = db.count_dispositivos()  
    total_paginas = (total_dispositivos + limit - 1) // limit  

    return render_template(
        "ver-dispositivos.html",
        dispositivos=dispositivos_con_comuna_y_imagen,
        total_paginas=total_paginas,
        current_page=page
    )

@app.route('/informacion-dispositivo/<int:dispositivo_id>', methods=['GET', 'POST'])
def informacion_dispositivo(dispositivo_id):

    dispositivo = db.get_disp_with_comentarios(dispositivo_id) 
    dispositivo['foto'] = dispositivo['foto'].replace('static/', '')

    return render_template('informacion-dispositivo.html', dispositivo=dispositivo)

@app.route("/agregar-comentario/<int:dispositivo_id>", methods=["POST"])
def agregar_comentario(dispositivo_id):
    nombre = request.form.get("nombre")
    texto = request.form.get("comentario")
    fecha = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # validar comentario
    if validate_coment(nombre,texto):
        # validado, guardarlo en base de datos
        db.add_comentario(dispositivo_id,nombre, texto, fecha)

    return redirect(url_for("informacion_dispositivo", dispositivo_id=dispositivo_id))


@app.route("/stats", methods=["GET"])
def stats():
    return render_template('stats.html')

@app.route("/get-stats-data", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def get_stats_data():
        
    count_contacto = db.count_contacto()
    count_dispositivo = db.count_dispositivos()

    contac_data = [{
        "comunas": db.get_comuna_name(db.get_contact_comuna(id))
    } for id in range(1, count_contacto + 1)]

    disp_data = [{
        "tipos" : db.get_tipo_disp(id)
    } for id in range(1, count_dispositivo)]

    data = contac_data + disp_data
    
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
