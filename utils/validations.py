import re 
import filetype


## Validaciones Datos de Contacto 

def validate_username(value):
    minValid = len(value.strip()) >= 3
    maxValid = len(value.strip()) <= 80
    lengthValid = minValid and maxValid
    return value and lengthValid

def validate_email(email):
    if not email:
        return False
    lenghtValid = len(email) > 15
    pattern = r'^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
    formatValid = bool(re.match(pattern, email))
    return lenghtValid and formatValid

def validate_phone_number(value):
    formatValid = bool(re.search(r'^[0-9]+$',value))
    lenghtValid = len(value) >= 8
    return formatValid and lenghtValid
                       
def validate_contact(username, phone_number, email):
    return validate_username(username) and validate_phone_number(phone_number) and validate_email(email)

def validate_tipo(tipo):
    opciones_validas = {
        "pantalla", "notebook", "tablet", "celular", "consola", "mouse", "teclado",
        "impresora", "parlante", "audífonos", "otro"
    }
    return tipo in opciones_validas

def validate_d_years(years):
    year = int(years)
    return 1 <= year <= 99

def validate_estado(estado):
    opciones_validas = {"funciona perfecto", "funciona a medias", "no funciona"}
    return estado in opciones_validas

def validate_don_img(don_img):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}

    # check if a file was submitted
    if don_img is None:
        return False

    # check if the browser submitted an empty file
    if don_img.filename == "":
        return False
    
    # check file extension
    ftype_guess = filetype.guess(don_img)
    if ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        return False
    return True

def validate_disp(dispname,tipo, years, estado):
    return validate_username(dispname) and validate_tipo(tipo) and validate_d_years(years) and validate_estado(estado)  

def validate_coment(name,coment):
    minValid = len(name.strip()) >= 3
    maxValid = len(name.strip()) <= 80
    bodymin = len(coment.strip()) >= 5
    return minValid and maxValid and bodymin