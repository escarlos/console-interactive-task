const inquirer = require('inquirer');
require('colors');

const questions = [{
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tarea completada`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tarea pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completas tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea(s)`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const pausa = async() => {
    
    const question = [{
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'Enter'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
    
}

const readInput = async( message) => {

    const question = [{
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor escribir una tarea'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const inquirerMenu = async() => {

    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opcion   '.green);
    console.log('============================\n'.green);

    const {opcion} = await inquirer.prompt(questions);

    return opcion;
}

const listadoTareasBorrar = async( tareas = []) =>{
    
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green ;
        return{
            value: tarea.id,
            name: `${idx} ${ tarea.desc } `
        }
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }
    ]
    const { id } = await inquirer.prompt(preguntas);

    return id;
}

module.exports = {
    inquirerMenu,
    pausa,
    readInput,
    listadoTareasBorrar
}