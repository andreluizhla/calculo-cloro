var saida = document.getElementById("saida")
var form_volume_agua = document.getElementById("volume_agua")
var form_ppm_cloro = document.getElementById('ppm_cloro')
var form_cloro_ativo = document.getElementById('cloro_ativo')
let volume_agua, ppm_cloro, cloro_ativo, resultado

function proximoItem(tecla){
    if (tecla.key === 'Enter'){
        if (document.activeElement === form_volume_agua){
            form_ppm_cloro.focus()
            form_ppm_cloro.select()
        } else if (document.activeElement === form_ppm_cloro){
            form_cloro_ativo.focus()
            form_cloro_ativo.select()
        } else {
            form_volume_agua.focus()
            validacao_form()
        }
    }
}

function validacao_form(){
    saida.innerHTML = ''
    if (form_volume_agua.value == 0 || form_ppm_cloro.value == 0 || form_cloro_ativo.value == 0){
        saida.innerHTML = '<p id="erro">ERRO: Por favor, complete os campos anteriores</p>'
    } else{
        volume_agua = Number(form_volume_agua.value)
        ppm_cloro = Number(form_ppm_cloro.value)
        cloro_ativo = Number(form_cloro_ativo.value)
        validacao_negativo()
    }
}

function validacao_negativo(){
    if (volume_agua < 0 || ppm_cloro < 0 || cloro_ativo < 0){
        saida.innerHTML = '<p id="erro">ERRO: Por favor digite um valor maior que 0 nos campos anteriores</p>'
    } else{
        calculo()
    }
}
function calculo(){
    resultado = (volume_agua * ppm_cloro) / (cloro_ativo * 10)
    saida_calculo()
}

function saida_calculo(){
    resultado_formatado = resultado.toString().replace('.', ',')
    volume_agua_formatado = volume_agua
    if (volume_agua % 1 !== 0){
        volume_agua_formatado = volume_agua.toString().replace('.', ',')
    }
    saida.innerHTML = `<p>Para <strong>${volume_agua_formatado} Litro(s) de água</strong>, você irá precisar de <strong>${resultado_formatado} ml de cloro</strong> para criar a solução clorada</p>`
    tipo_limpeza()
}

function tipo_limpeza(){
    var possibilidades_limpeza = [
        {
            condicao: ppm_cloro >= 100 && ppm_cloro <= 200, 
            tipo: "Higienização do Hortifruti</il><br><il>Utensílios de Cozinha</il><br><il>Geladeiras e Fogões"
        },
        {
            condicao: ppm_cloro >= 50 && ppm_cloro < 250, 
            tipo: "Limpeza Geral de Superfícies"
        },
        {
            condicao: ppm_cloro == 200, 
            tipo: "Tábuas de Corte"
        },
        {
            condicao: ppm_cloro < 50, 
            tipo: "<p>A solução é muito fraca para fazer a higienização de alguma coisa</p>"
        },
        {
            condicao: ppm_cloro >= 1000, 
            tipo: "Desinfecção porfunda (após manipulação de carnes cruas) A partir de 1000 ppm, <strong>TOME CUIDADO</strong>, a solução poderá ser prejudicial a saúde "
        },
        {
            condicao: ppm_cloro >= 5000, 
            tipo: "<p><strong>CUIDADO: A solução criada poderá corroer e danificar superfícies e materiais, além de ser prejudicial para a saúde do manipulador dessa solução</strong></p>"
        }
    ]
    saida.innerHTML += "<p>Você poderá usar essa solução para realizar a:</p><ol id='limpezas_possiveis'></ol>"
    var lista = document.getElementById('limpezas_possiveis')
    function realizarVerificacoes(){
        possibilidades_limpeza.forEach(function(verificacao){
            var li = document.createElement('li')
            if (verificacao.condicao){
                li.innerHTML = verificacao.tipo
                lista.appendChild(li)
                }
            }
        )
    }
    realizarVerificacoes()
}

function resetar_valores(){
    form_volume_agua.value = null
    form_ppm_cloro.value = null
    form_cloro_ativo.value = null
    saida.innerHTML = '<p>Aqui irá sair o resultado</p>'
}
