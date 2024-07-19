var ul = document.getElementById('limpezas_possiveis');
var saidap = document.getElementById("saidap")
var form_volume_agua = document.getElementById("volume_agua")
var form_ppm_cloro = document.getElementById('ppm_cloro')
var form_cloro_ativo = document.getElementById('cloro_ativo')
let volume_agua, ppm_cloro, cloro_ativo, resultado
var errop = document.getElementById('erro')

function erro(valor) {
    if (valor) {
        errop.style.backgroundColor = '#ec2e2e93'
        errop.style.padding = '10px'
        saidap.innerHTML = ''
    } else {
        errop.style.backgroundColor = null
        errop.style.padding = '0px'
        errop.innerHTML = ''
    }
}

function proximoItem(tecla) {
    if (tecla.key === 'Enter') {
        if (document.activeElement === form_volume_agua) {
            form_ppm_cloro.focus()
            form_ppm_cloro.select()
        } else if (document.activeElement === form_ppm_cloro) {
            form_cloro_ativo.focus()
            form_cloro_ativo.select()
        } else {
            form_volume_agua.focus()
            validacao_form()
        }
    }
}

function validacao_form() {
    saidap.innerHTML = ''
    if (form_volume_agua.value == 0 || form_ppm_cloro.value == 0 || form_cloro_ativo.value == 0) {
        erro(true)
        errop.innerHTML = 'ERRO: Por favor, complete os campos anteriores'
    } else {
        volume_agua = Number(form_volume_agua.value)
        ppm_cloro = Number(form_ppm_cloro.value)
        cloro_ativo = Number(form_cloro_ativo.value)
        validacao_negativo()
    }
}

function validacao_negativo() {
    if (volume_agua < 0 || ppm_cloro < 0 || cloro_ativo < 0){
        erro(true)
        errop.innerHTML = 'ERRO: Por favor digite um valor maior que 0 nos campos anteriores'
    } else {
        calculo()
    }
}
function calculo(){
    resultado = (volume_agua * ppm_cloro) / (cloro_ativo * 10)
    saida_calculo()
}

function saida_calculo(){
    erro(false)
    resultado_formatado = resultado.toString().replace('.', ',')
    volume_agua_formatado = volume_agua
    if (volume_agua % 1 !== 0){
        volume_agua_formatado = volume_agua.toString().replace('.', ',')
    }
    saidap.innerHTML = `Para <strong>${volume_agua_formatado} Litro(s) de água</strong>, você irá precisar de <strong>${resultado_formatado} ml de cloro</strong> para criar a solução clorada`
    tipo_limpeza()
}

function tipo_limpeza() {
    var possibilidades_limpeza = [
        {
            condicao: ppm_cloro < 50, 
            tipo: "<li>A solução é muito fraca para fazer a higienização de algum alimento ou superfície</li>"
        },
        {
            condicao: ppm_cloro >= 50 && ppm_cloro < 250, 
            tipo: "<li>Superfícies (Limpeza Geral)</li>"
        },
        {
            condicao: ppm_cloro >= 100 && ppm_cloro <= 200, 
            tipo: "<li>Hortifruti</li><li>Utensílios de Cozinha</li><li>Geladeiras e Fogões</li>"
        },
        {
            condicao: ppm_cloro == 200, 
            tipo: "<li>Tábuas de Corte</li>"
        },
        {
            condicao: ppm_cloro >= 250 && ppm < 1000,
            tipo: "<li>Superfícies que podem ser uma fonte de contaminação</li>"
        },
        {
            condicao: ppm_cloro >= 1000, 
            tipo: "<li>Desinfecção porfunda (após manipulação de carnes cruas)</li>A partir de 1000 ppm, <strong>TOME CUIDADO</strong>, a solução poderá ser prejudicial a saúde"
        },
        {
            condicao: ppm_cloro >= 5000, 
            tipo: "<p id='cuidado'><strong>CUIDADO: A solução criada poderá corroer e danificar superfícies e materiais, além de ser prejudicial para a saúde do manipulador dessa solução</strong>"
        }
    ]
    saidap.innerHTML += "<p>Você poderá usar essa solução para realizar a higienização do(s)(as):</p>"
        function realizarVerificacoes() {
            possibilidades_limpeza.forEach(function(verificacao) {
                if (verificacao.condicao) {
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = verificacao.tipo;
                    while (tempDiv.firstChild) {
                        ul.appendChild(tempDiv.firstChild);
                    }
                }
            });
        }
    realizarVerificacoes()
}

function resetar_valores() {
    form_volume_agua.value = null
    form_ppm_cloro.value = null
    form_cloro_ativo.value = null
    erro(false)
    saidap.innerHTML = 'Aqui irá sair o resultado'
    ul.innerHTML = ''
}
