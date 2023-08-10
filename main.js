class EnvioDoFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.evento()
    }

    evento() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const camposValidos = this.camposValidos()
        if(!camposValidos) return console.log('falso')
    }

    camposValidos() {
        let valid = true
        
        return valid
    }
}

const validando = new EnvioDoFormulario()