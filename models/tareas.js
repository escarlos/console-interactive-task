const Tarea = require("./tarea");
const colors = require('colors');



class Tareas{    

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( keys => {
            const tarea = this._listado[keys];
            listado.push( tarea );
        })

        return listado;
    }

    constructor() {        
        this._listado = {};
    }

    loadTaskFromArray( tareas = [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    deleteTarea( id = ''){

        if( this._listado[id]){
            delete this._listado[id];
        }
    }
    
    listadoCompleto() {

        console.log();
        this.listadoArr.forEach( ( tarea, i) => { 

            const index = `${i + 1}`.green;
            const {desc, completadaEn} = tarea;
            const estado = (completadaEn == null) ? 'Incompleto'.red : 'Completado'.green ;

            console.log(`${index} ${desc} :: ${estado}`);
        });
        
    }

    listadoPendienteCompletado( completada = true){

        let index = 0;
        console.log();
        this.listadoArr.forEach( ( tarea, i) => { 

            const {desc, completadaEn} = tarea;
            const estado = (completadaEn == null) ? 'Incompleto'.red : 'Completado'.green ;
            
            if(completada){

                if(completadaEn !== null){
                    index += 1;
                    console.log(`${ (index + '.').green } ${desc} :: ${completadaEn}`);
                }
            }else{

                if(completadaEn == null){
                    index += 1;
                    console.log(`${ (index + '.').green } ${desc} :: ${completadaEn}`);
                }
            }
            
        });
    }

}


module.exports = Tareas;
