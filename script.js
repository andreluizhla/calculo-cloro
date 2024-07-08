document.addEventListener('DOMContentLoaded', () => {
    const volumeAgua = document.getElementById("volume_agua");
    const ppmCloro = document.getElementById("ppm_cloro");
    const cloroAtivo = document.getElementById("cloro_ativo");
    const saida = document.getElementById("saida");
    const limpPp = document.getElementById("limpezas_possiveis");

    function proximoItem(event) {
        if (event.key === "Enter") {
            const inputs = document.querySelectorAll('input');
            const index = Array.from(inputs).indexOf(event.target);
            inputs[index + 1]?.focus();
        }
    }

    function validarNumero(numero) {
        return !isNaN(numero) && numero >= 0;
    }

    function calculadoraCloro(volume, ppm, porcentagem) {
        return (volume * ppm) / (1000 * (porcentagem / 100));
    }

    function validacaoForm() {
        const volume = parseFloat(volumeAgua.value);
        const ppm = parseFloat(ppmCloro.value);
        const porcentagem = parseFloat(cloroAtivo.value);

        if (!validarNumero(volume) || !validarNumero(ppm) || !validarNumero(porcentagem)) {
            saida.innerHTML = "Por favor, insira valores válidos para todos os campos.";
            return;
        }

        const mlCloro = calculadoraCloro(volume, ppm, porcentagem).toFixed(2);
        saida.innerHTML = `Você precisará de ${mlCloro} ml de cloro.`;

        gerarSugestoesLimp(mlCloro);
    }

    function gerarSugestoesLimp(mlCloro) {
        limpPp.innerHTML = "";

        const sugestoes = [
            { superficie: "Bancadas e mesas", uso: "Higienização geral após preparo de alimentos", concentracao: "100 - 200 ppm" },
            { superficie: "Pia", uso: "Higienização geral e após manipulação de alimentos", concentracao: "100 - 200 ppm" },
            { superficie: "Tábuas de corte", uso: "Higienização após cortar alimentos", concentracao: "200 ppm" },
            { superficie: "Utensílios de cozinha", uso: "Higienização geral e após cortar alimentos", concentracao: "100 - 200 ppm" },
            { superficie: "Geladeiras", uso: "Higienização de prateleiras e superfícies internas", concentracao: "100 - 200 ppm" },
            { superficie: "Fogões", uso: "Higienização de superfícies externas", concentracao: "100 - 200 ppm" },
            { superficie: "Micro-ondas e outros eletrodomésticos", uso: "Higienização de superfícies internas e externas", concentracao: "100 - 200 ppm" },
            { superficie: "Desinfecção profunda", uso: "Higienização de todas as superfícies que entraram em contato com carne crua", concentracao: "1000 ppm" },
        ];

        sugestoes.forEach(sugestao => {
            const li = document.createElement("li");
            li.textContent = `${sugestao.superficie}: ${sugestao.uso} - ${sugestao.concentracao}`;
            limpPp.appendChild(li);
        });
    }

    function resetarValores() {
        volumeAgua.value = "";
        ppmCloro.value = "";
        cloroAtivo.value = "";
        saida.innerHTML = "Aqui irá sair o resultado";
        limpPp.innerHTML = "";
    }

    volumeAgua.addEventListener("keydown", proximoItem);
    ppmCloro.addEventListener("keydown", proximoItem);
    cloroAtivo.addEventListener("keydown", proximoItem);

    document.getElementById("submit").addEventListener("click", validacaoForm);
    document.getElementById("reset").addEventListener("click", resetarValores);
});
