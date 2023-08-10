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
    }

    camposValidos() {
        let valid = true
        
        for (const errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        for (const campo of document.querySelectorAll('.validar')) {
            if (!campo.value) {
                this.criaError(campo, `O campo "${campo.previousElementSibling.innerHTML}" não pode estar vazio.`)
                valid = false
            }

            if(campo.classList.contains('cpf')) {
                const cpfUsuario = new EnvioDoCpf(campo.value)
                if(!cpfUsuario.AvaliarCpf()) {
                    this.criaError(campo, `CPF inválido`)
                    valid = false
                }
            }
        }

        return valid
    }

    criaError(campo, errorText) {
        const div = document.createElement('div')
        div.innerHTML = errorText
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div)
    }

}

const validando = new EnvioDoFormulario()