const inquirer = require('inquirer');
require('colors');

//envio de informacion automatica
const preguntas=[
    {
        type:'list',
        name: 'opcion', 
        message:'¿Qué desea hacer?',
        choices:[
            {
                value:1,
                name:`${'1.'.green} Crear tarea`
            },
            {
                value:2,
                name:`${'2.'.green} Listar tareas`
            },
           
            {
                value:0,
                name:`${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu=async()=>{
        console.clear();
        console.log("=======================".green);
        console.log("Seleccione un Opcion".white);
        console.log("=======================\n".green);
        const {opcion} = await inquirer.prompt(preguntas);
        return opcion; 

}

const pausa = async()=>{
    const question =[
        {
            type:'input',
            name:'enter',
            message:`Presione ${'enter'.green} para continuar`
        }
    ];
    console.log("\n");
    await inquirer.prompt(question);
}

const leerInput = async(message)=>{
    const question=[
        {
            type:'input',//valor de entreda
            name:'desc',
            message, //mensaje
            validate(value){
                if(value.length===0)
                    return "por favor ingrese un valor"
                return true;
            }
        }
    ];
    //aplicamos la desestructuracion
    const {desc}=await inquirer.prompt(question);
    return desc;
}
const listadoLugares=async(lugares=[])=>{
    //con este pedazo de codigo manipularemos la informacion que
    //nos esta proporcionando el sistema
    const choices=lugares.map((lugar, i)=>{
        const idx=`${i+1}.`.green;
        return{
            value:lugar.id,
            name:`${idx} ${lugar.nombre}`
        }
    });
    //ahora recibiremos las preguntas
    choices.unshift({
        value:'0',
        name:'0.'.green+'Cancelar'
    });
    const preguntas=[
        {
            type:'list',
            name:'id',
            message:'Seleccionar Lugar: ',
            choices
        }
    ]
    const {id}=await inquirer.prompt(preguntas);
    return id;
}

const mostrarListadoChecklist=async(tareas=[])=>{
    //copiamos el codigo de : listadoTareasBorrar y lo modificamos
    
    const choices=tareas.map((tarea, i)=>{
        const idx=`${i+1}.`.green;
        return{
            value:tarea.id,
            name:`${idx} ${tarea.desc}`,
            cheked: (tarea.completadoEn)?true:false
        }
    });
    //ahora recibiremos las preguntas
    /*choices.unshift({
        value:'0',
        name:'0.'.green+'Cancelar'
    });
    */
    const pregunta=[
        {
            type:'Checkbox',
            name:'ids',
            message:'Selecciones',
            choices
        }
    ]
    const {id}=await inquirer.prompt(preguntas);
    return id;
}




module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listadoLugares
}