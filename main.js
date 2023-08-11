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
        if (camposValidos === true) {
            alert('Formulário enviado!')
            this.formulario.submit()
        }
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

            if (campo.classList.contains('cpf')) {
                if (!this.validarCpf(campo)) valid = false
            }

            if (campo.classList.contains('usuario')) {
                if (!this.validarUsuario(campo)) valid = false
            }

            if (campo.classList.contains('senha')) {
                if (!this.validarSenhas(campo)) valid = false
            }
        }

        return valid
    }

    validarSenhas(campo) {
        let valid = true
        const senha = campo.value
        const repeteSenha = document.querySelector('.repetir-senha')

        if (senha.length < 6 || senha.length > 12) {
            this.criaError(campo, 'A senha deverá ter entre 6 e 12 caracteres.')
            valid = false
        }

        if (senha !== repeteSenha.value) {
            this.criaError(repeteSenha, 'Os campos (senha/Repetir senha) não estão iguais.')
            valid = false
        }

        return valid
    }

    validarUsuario(campo) {
        let valid = true
        const usuario = campo.value
        if (usuario.length < 3 || usuario.length > 12) {
            this.criaError(campo, 'O usuário deverá ter entre 3 e 12 caracteres.')
            valid = false
        }

        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaError(campo, 'O usuário só pode conter letras e/ou números.')
            valid = false
        }

        return valid
    }

    validarCpf(campo) {
        const cpfUsuario = new EnvioDoCpf(campo.value)
        let valid = true
        if (!cpfUsuario.AvaliarCpf()) {
            this.criaError(campo, `CPF inválido`)
            valid = false
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