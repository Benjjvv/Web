import pymysql
import json

DB_NAME = "tarea2"
DB_USERNAME = "cc5002" 
DB_PASSWORD = "programacionweb" 
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('database/querys.json', 'r') as querys:
	QUERY_DICT = json.load(querys)

# -- conn ---

def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn


# **************************************
# *************  QUERYS  ***************
# **************************************

# --------------- CREATES ---------------

def create_contact(nombre, email, celular, comuna_id, fecha_creacion):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["create_contact"], (nombre, email, celular, comuna_id, fecha_creacion))
    conn.commit()

def create_disp(contacto_id, nombre, descripcion, tipo, anos_uso, estado):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["create_disp"], (contacto_id, nombre, descripcion, tipo, anos_uso, estado))
    conn.commit()
    device_id = cursor.lastrowid  
    cursor.close()
    conn.close()
    return device_id  

def create_arch(ruta_archivo, nombre_archivo, dispositivo_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["create_arch"], (ruta_archivo, nombre_archivo, dispositivo_id))
    conn.commit()

def add_comentario(dispositivo_id, nombre, texto, fecha):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["add_comentario"], (dispositivo_id, nombre, texto, fecha))
    conn.commit()

# --------------- GET --------------- 

def get_contact_by_order():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_contact_by_order"])
    contacts = cursor.fetchall()
    return contacts

def get_dips_by_contact(contacto_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_dips_by_contact"], (contacto_id,))
    dispositivos = cursor.fetchall()
    return dispositivos

def get_arch(dispositivo_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_arch"], (dispositivo_id,))
    archivos = cursor.fetchall()
    return archivos

def get_contact_comuna(contacto_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_comuna_id"], (contacto_id,))
    comuna_id = cursor.fetchone()
    return comuna_id[0] if comuna_id else None

def get_comuna_name(comuna_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_comuna_name"], (comuna_id,))
    comuna_name = cursor.fetchone()
    return comuna_name[0] if comuna_name else None

def get_tipo_disp(dispositivo_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_tipo"], (dispositivo_id,))
    tipo = cursor.fetchone()
    return tipo[0] if tipo else None

def get_archivo_ruta(dispositivo_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_ruta_arch"], (dispositivo_id,))
    result = cursor.fetchone()
    return result[0] if result else None

def get_disp_with_comentarios(dispositivo_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_infoDisp"], (dispositivo_id,)) 
    dispositivo = cursor.fetchone()
    if dispositivo:
        cursor.execute(QUERY_DICT["get_coment_disp"], (dispositivo_id,))
        comentarios = cursor.fetchall()

        dispositivo_info = {
            "id": dispositivo[0],
            "nombre": dispositivo[1],
            "descripcion": dispositivo[2],
            "tipo": dispositivo[3],
            "anos_uso": dispositivo[4],
            "estado": dispositivo[5],
            "contacto": {
                "nombre": dispositivo[6],  # contacto_nombre
                "email": dispositivo[7],   # contacto_email
                "telefono": dispositivo[8]  # contacto_telefono
            },
            "comuna": dispositivo[9],      # comuna_nombre
            "foto": dispositivo[10],       # ruta_archivo
            "comentarios": [{"fecha": coment[3], "nombre": coment[1], "texto": coment[2]} for coment in comentarios]
        }
        return dispositivo_info  
    return None

def list_five_disp():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["list_five_disp"])
    dispositivos = cursor.fetchall()
    return dispositivos

def next_five():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["next_five"])
    dispositivos = cursor.fetchall()
    return dispositivos

def next_five_C():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["next_five_C"])
    dispositivos = cursor.fetchall()
    return dispositivos
	

# --------------- db-related functions ---------------

def count_contacto():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM contacto")
    count = cursor.fetchone()
    return count[0] if count else 0

def count_dispositivos():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM dispositivo")
    count = cursor.fetchone()
    return count[0] if count else 0





