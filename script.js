// --- PARTE 1: EXECUTA ASSIM QUE A PÁGINA CARREGA ---
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se existe um protocolo salvo no navegador (vindo do redirecionamento do Formspree)
    const protocoloSalvo = localStorage.getItem('protocoloDenuncia');

    if (protocoloSalvo) {
        // Se existir, mostra a caixinha verde com o código
        document.getElementById('codigo-protocolo').innerText = protocoloSalvo;
        document.getElementById('resultado-denuncia').style.display = 'block';
    }
});

// --- PARTE 2: EXECUTA QUANDO O FORMULÁRIO É ENVIADO ---
document.getElementById('form-denuncia').addEventListener('submit', function(event) {
    // Gerador do código aleatório
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigoAleatorio = '';
    for (let i = 0; i < 5; i++) {
        codigoAleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    
    const anoAtual = new Date().getFullYear();
    const protocoloFinal = `DEN-${anoAtual}-${codigoAleatorio}`;

    // SALVA o código na memória do navegador antes de ir para o Formspree
    localStorage.setItem('protocoloDenuncia', protocoloFinal);
    
    // O formulário vai seguir o envio normal para o Formspree agora...
});

// --- PARTE 3: BOTÃO PARA LIMPAR O PROTOCOLO ---
document.getElementById('btn-fechar-protocolo').addEventListener('click', function() {
    // Apaga o código da memória do navegador
    localStorage.removeItem('protocoloDenuncia');
    // Esconde a caixinha verde
    document.getElementById('resultado-denuncia').style.display = 'none';
});
