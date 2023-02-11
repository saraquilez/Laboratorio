/* SARA QUÍLEZ */ 

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const formatos = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
	clave: /^.{1,8}$/, // 1 a 8 digitos.
    confirmacion: /^.{1,8}$/ // 1 a 8 digitos.
}

const campos = {
	nombre: false,
	email: false,
    clave: false,
    confirmacion: false
}

const validarFormulario = (elemento) => {
	switch (elemento.target.name) {
		case "nombre":
			validarCampo(formatos.nombre, elemento.target, 'nombre');
		break;
        case "email":
			validarCampo(formatos.email, elemento.target, 'email');
		break;
		case "clave":
			validarCampo(formatos.clave, elemento.target, 'clave');
			validarConfirmacion();
		break;
		case "confirmacion":
            validarCampo(formatos.confirmacion, elemento.target, 'confirmacion');
			validarConfirmacion();
		break;	
	}
}

const validarCampo = (formato, input, campo) => {
	if(formato.test(input.value)){
        document.getElementById(`${campo}_incorrecto`).classList.remove('estado_campo-incorrecto');
		document.getElementById(`${campo}_correcto`).classList.remove('estado_campo-incorrecto');
		document.getElementById(`${campo}_correcto`).classList.add('estado_campo-correcto');
        document.getElementById(`${campo}`).classList.remove('estado_campo-incorrecto');
        document.getElementById(`rellene_${campo}`).classList.remove('rellene_campo-activo');
        document.getElementById(`formato_${campo}`).classList.remove('formato_error-activo');
		campos[campo] = true;
	} else {
        document.getElementById(`${campo}_correcto`).classList.remove('estado_campo-correcto');
		document.getElementById(`${campo}_incorrecto`).classList.add('estado_campo-incorrecto');
		document.getElementById(`${campo}_incorrecto`).classList.remove('estado_campo-correcto');
        document.getElementById(`${campo}`).classList.add('estado_campo-incorrecto');
		campos[campo] = false;
        if ((input.value).length == 0){
            document.getElementById(`formato_${campo}`).classList.remove('formato_error-activo');
            document.getElementById(`rellene_${campo}`).classList.add('rellene_campo-activo');
        } else {
            document.getElementById(`rellene_${campo}`).classList.remove('rellene_campo-activo');
            document.getElementById(`formato_${campo}`).classList.add('formato_error-activo');
        }
	}
}

const validarConfirmacion = () => {
	const inputClave = document.getElementById('clave');
	const inputConfirmacion = document.getElementById('confirmacion');

	if ((inputConfirmacion.value).length > 0 && (inputClave.value == inputConfirmacion.value)){
        document.getElementById(`confirmacion_incorrecto`).classList.remove('estado_campo-incorrecto');
		document.getElementById(`confirmacion_correcto`).classList.remove('estado_campo-incorrecto');
		document.getElementById(`confirmacion_correcto`).classList.add('estado_campo-correcto');
        document.getElementById(`confirmacion`).classList.remove('estado_campo-incorrecto');
        campos['confirmacion'] = true;	

	} else {
        document.getElementById(`confirmacion_correcto`).classList.remove('estado_campo-correcto');
		document.getElementById(`confirmacion_incorrecto`).classList.add('estado_campo-incorrecto');
		document.getElementById(`confirmacion_incorrecto`).classList.remove('estado_campo-correcto');
        document.getElementById(`confirmacion`).classList.add('estado_campo-incorrecto');
		campos['confirmacion'] = false;
		if ((inputConfirmacion.value).length == 0){
            document.getElementById(`formato_confirmacion`).classList.remove('formato_error-activo');
            document.getElementById(`rellene_confirmacion`).classList.add('rellene_campo-activo');
        } else {
            document.getElementById(`rellene_confirmacion`).classList.remove('rellene_campo-activo');
            document.getElementById(`formato_confirmacion`).classList.add('formato_error-activo');
        }
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (elemento) => {
	elemento.preventDefault();
	if(campos.nombre && campos.email && campos.clave && campos.confirmacion){
        window.alert("La inscripción se ha realizado correctamente.");
		formulario.reset();
		document.getElementById(`nombre_correcto`).classList.remove('estado_campo-correcto');
		document.getElementById(`email_correcto`).classList.remove('estado_campo-correcto');
		document.getElementById(`clave_correcto`).classList.remove('estado_campo-correcto');
		document.getElementById(`confirmacion_correcto`).classList.remove('estado_campo-correcto');
    }
});