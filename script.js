document.getElementById('form-denuncia').addEventListener('submit', function(event) {
    // Garante o bloqueio do comportamento padrão logo no primeiro milissegundo
    event.preventDefault();
    event.stopPropagation(); 

    const formulario = this;
    // Busca o botão de enviar de forma genérica
    const botaoEnviar = formulario.querySelector('[type="submit"]');
    
    if(botaoEnviar) {
        botaoEnviar.disabled = true;
        botaoEnviar.innerText = "Enviando..."; // Dá um feedback visual no celular
    }

    // Gerador do código de protocolo
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigoAleatorio = '';
    for (let i = 0; i < 5; i++) {
        codigoAleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    const anoAtual = new Date().getFullYear();
    const protocoloFinal = `DEN-${anoAtual}-${codigoAleatorio}`;

    // Captura os dados
    const dadosFormulario = new FormData(formulario);

    // Envia para o Formspree
    fetch(formulario.action, {
        method: formulario.method,
        body: dadosFormulario,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Sucesso! Mostra a resposta na tela
            document.getElementById('codigo-protocolo').innerText = protocoloFinal;
            document.getElementById('resultado-denuncia').style.display = 'block';
            
            // Limpa o formulário
            formulario.reset();
            
            // Rola a tela do celular suavemente até o aviso verde para o usuário ver
            document.getElementById('resultado-denuncia').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("Houve um erro ao enviar. Por favor, tente novamente.");
        }
    })
    .catch(error => {
        alert("Erro de conexão. Verifique sua internet.");
    })
    .finally(() => {
        // Devolve o botão ao estado normal
        if(botaoEnviar) {
            botaoEnviar.disabled = false;
            botaoEnviar.innerText = "ENVIAR DENÚNCIA"; 
        }
    });
});

// Tratamento do botão fechar focado em Mobile
const btnFechar = document.getElementById('btn-fechar-protocolo');
if (btnFechar) {
    btnFechar.addEventListener('click', function(e) {
        e.preventDefault(); // Evita qualquer ação fantasma no mobile
        document.getElementById('resultado-denuncia').style.display = 'none';
    });
}
