const { inquirerMenu,
        pausa,
        readInput,
        listadoTareasBorrar,
        confirm,
        listadoCheckBox } = require('./helpers/inquirer');
const {saveBD,
        readDB
      } = require('./helpers/saveArchive');
const Tareas = require('./models/tareas');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = readDB();

    if( tareasDB ) {
        tareas.loadTaskFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();

        switch(opt){
            //Crear opcion
            case '1': 
                const desc = await readInput('Descripcion: ');
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listadoPendienteCompletado();
                break;
            case '4':
                tareas.listadoPendienteCompletado(false);
                break;
            case '5':
                const ids = await listadoCheckBox(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                console.log(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                // TODO: preguntar si desea borrar
                const ok = await confirm('¿Esta seguro de borrar la tarea?');
                if (ok) tareas.deleteTarea(id);
                console.log(ok);
                break;
        }

        saveBD( tareas.listadoArr);
        await pausa();

    }while ( opt !== '0')

}

main();