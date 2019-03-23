const {cursos} = require('./datos');
const fs = require('fs');
const opciones = {
	id:{
		demand:true,
		alias:'i',
		default:false
	},
	nombre:{
		demand:true,
		alias:'n'
	},
	cedula:{
		demand:true,
		alias:'x'
	}
}

const argv = require('yargs')
			.command('inscribir', 'incribe al interesado a un curso', opciones)
			.argv;

let crearArchivo = (curso) => {
	let texto = "El estudiante "+argv.n+" con cedula "+argv.x+'\n'+"Se ha matriculado en el curso llamado "+
			curso.nombre+" que tiene una duracion de "+curso.duracion+" horas y un valor de "+curso.valor+" pesos.";
	fs.writeFile('matricula.txt', texto, (err) => {
		if (err) {
			console.log(err);
		}
		console.log("Se ha creado el archivo");
	});				
};

let mostrar_curso = (curso) => {
	let texto = "[id: "+curso.id+"] "+"El nombre del curso es "+curso.nombre+", tiene una duracion de "+
			curso.duracion+" horas y cuesta "+curso.valor+" pesos."+"\n";
	console.log(texto);
};

if (!argv.i && argv.i !== 0) {
	setTimeout(function() {
		mostrar_curso(cursos[0]);
	}, 2000);
	setTimeout(function() {
		mostrar_curso(cursos[1]);
	}, 4000);
	setTimeout(function() {
		mostrar_curso(cursos[2]);
	}, 6000);
}

if (argv.i == 0) {
	console.log("No se pudo encontrar el id");
}

let buscarPorId = cursos.find(function(obj) {
	return obj.id == argv.i;
});

if (argv.i && argv.i !== 0) {
	if (buscarPorId) {
		crearArchivo(buscarPorId);
		}
	else {
		console.log("No se pudo encontrar el id");
	}	
}