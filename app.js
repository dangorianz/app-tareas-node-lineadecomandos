require('colors') 

const { inquirerMenu,pausa,leerInput,listadoTareasBorrar,confirmar, mostrarListadoCheckList } = require('./helpers/inquirer')
const { guardarDB,leerDB } = require('./helpers/guardarArchivo')

const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')
// const { mostrarMenu,pause } = require('./helpers/mensajes')
// console.clear();

const main = async () =>{
    

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();


    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }

    // await pausa()



    do {
        // imprimir el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc)
                // console.log(desc)
                break;
            case '2':  
                tareas.listadoCompleto()  
                break;
            case '3':  
                tareas.listarPendientesCompletadas(true)  
                break;
            case '4':  
                tareas.listarPendientesCompletadas(false)  
                break;
            case '5':  
                const ids = await mostrarListadoCheckList(tareas.listadpArr)  
                tareas.toggleCompletadas(ids)
                break;
            case '6':  
                const id = await listadoTareasBorrar(tareas.listadpArr)
                if (id!=='0') {
                    const ok= await confirmar('Esta seguro?') 
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada')
                    }
                    
                }
                break;
        }

        guardarDB(tareas.listadpArr)

        if(opt !== '0') await pausa()

    } while (opt !== '0');

}

main(); 