// //Função construtora que retorna o valor do usuário (apenas a numeração)
class EnvioDoCpf {
    constructor(codigo) {
        Object.defineProperty(this, 'codLimpo', {
            enumerable: true,
            value: codigo.replace(/\D+/g, '')
        })
    }

    //Função que vai Validar o CPF do usuário
    AvaliarCpf() {
        if (typeof this.codLimpo === 'undefined') return false
        if (this.codLimpo.length !== 11) return false

        const cpfParcial = this.codLimpo.slice(0, -2)
        const digito1 = this.cpfToArray(cpfParcial)
        const resultado = this.calcPorDuasEtapas(digito1)

        //Validação final do CPF
        if(this.codLimpo !== resultado) return false
        return true
    }

    //Função que retorna o CPF em Array
    cpfToArray(cpfParcial) {
        const cpfArray = Array.from(cpfParcial)
        return cpfArray
    }

    //Função que realiza o calculo de validação e retorna o resultado do mesmo para a validação final
    calcPorDuasEtapas(digito1) {
        //Primeira etapa do calculo
        let calculo1 = [...digito1]
        const res1 = calculo1.reduce((acumulador, valor, indice) => acumulador += (Number(valor) * (10 - indice)), 0)
        let penultimoNum = (11 - (res1 % 11))
        if(penultimoNum > 9) penultimoNum = '0'
        //Segunda etapa do calculo
        let calculo2 = [...digito1, penultimoNum]
        const res2 = calculo2.reduce((acumulador, valor, indice) => acumulador += (Number(valor) * (11 - indice)), 0)
        const ultimoNum = (11 - (res2 % 11))
        if(ultimoNum > 9) ultimoNum = '0'
        //Resultado final do calculo
        const res3 = [...calculo2, ultimoNum]
        const resultadoFinal = res3.reduce(function (ac, val) {
        ac += val
        return ac
        }, [])
        return resultadoFinal
    }

}