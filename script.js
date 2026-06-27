document.getElementById('form-denuncia').addEventListener('submit', function(event) {
    // 1. Impede a página de recarregar e limpar os campos imediatamente
    event.preventDefault();

    // 2. Função para gerar um código aleatório (Ex: DEN-2026-X8B3)
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigoAleatorio = '';
    for (let i = 0; i < 5; i++) {
        codigoAleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    
    // Formato final do protocolo: ANO atual + código gerado
    const anoAtual = new Date().getFullYear();
    const protocoloFinal = `DEN-${anoAtual}-${codigoAleatorio}`;

    // 3. Injeta o protocolo no HTML e exibe a caixinha de sucesso
    document.getElementById('codigo-protocolo').innerText = protocoloFinal;
    
    const areaResultado = document.getElementById('resultado-denuncia');
    areaResultado.style.display = 'block';

    // 4. (Opcional) Limpa os campos do formulário após o envio
    this.reset();
});
