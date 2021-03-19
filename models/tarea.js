
const { v4: uuidv4 } = require('uuid');

class Tarea {
    
    id = ''
    desc = ''
    completado = null

    constructor( desc ) {

        this.id = uuidv4();
        this.desc = desc
    
    }
}

module.exports = Tarea;