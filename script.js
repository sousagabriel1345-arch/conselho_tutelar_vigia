document.getElementById('form-denuncia').addEventListener('submit', function(event) {
    // 1. Bloqueia o recarregamento da página (crucial para o fetch)
    event.preventDefault();

    const formulario = this;
    const botaoEnviar = formulario.querySelector('button[type="submit"]');
    
    // Desabilita o botão temporariamente para evitar cliques duplos
    if(botaoEnviar) botaoEnviar.disabled = true;

    // 2. Gerador do código de protocolo
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigoAleatorio = '';
    for (let i = 0; i < 5; i++) {
        codigoAleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    const anoAtual = new Date().getFullYear();
    const protocoloFinal = `DEN-${anoAtual}-${codigoAleatorio}`;

    // 3. Captura os dados do formulário para enviar via API
    const dadosFormulario = new FormData(formulario);

    // 4. Envia para o Formspree em segundo plano (AJAX)
    fetch(formulario.action, {
        method: formulario.method,
        body: dadosFormulario,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // SE O ENVIO DEU CERTO:
            // Mostra o protocolo gerado na caixinha verde
            document.getElementById('codigo-protocolo').innerText = protocoloFinal;
            document.getElementById('resultado-denuncia').style.display = 'block';
            
            // Limpa os campos do formulário para uma próxima denúncia
            formulario.reset();
        } else {
            // Se o Formspree retornar algum erro
            alert("Houve um erro ao enviar a denúncia. Por favor, tente novamente.");
        }
    })
    .catch(error => {
        // Se houver erro de conexão/internet
        alert("Erro de rede. Verifique sua conexão.");
    })
    .finally(() => {
        // Reativa o botão de envio
        if(botaoEnviar) botaoEnviar.disabled = false;
    });
});

// Botão para fechar o aviso verde (caso tenha colocado no passo anterior)
const btnFechar = document.getElementById('btn-fechar-protocolo');
if (btnFechar) {
    btnFechar.addEventListener('click', function() {
        document.getElementById('resultado-denuncia').style.display = 'none';
    });
}
