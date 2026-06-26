// 1. Mesmas configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCTZmFHNlomb3zurfEN1A2GsBSVCGeGf8",
    authDomain: "site-conselho.firebaseapp.com",
    projectId: "site-conselho",
    storageBucket: "site-conselho.appspot.com",
    messagingSenderId: "181542343066",
    appId: "1:181542343066:web:00c5d6743b9947226b6a23",
    measurementId: "G-0G5V1TCHRM"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Escuta o clique do botão de busca
document.getElementById('btn-buscar-protocolo').addEventListener('click', function(e) {
    e.preventDefault();
    const protocolo = document.getElementById('numero-protocolo').value.trim().toUpperCase();

    if(protocolo === "") {
        alert("Por favor, digite um protocolo.");
        return;
    }

    // Busca o documento correspondente ao protocolo na Nuvem
    db.collection("denuncias").doc(protocolo).get().then((doc) => {
        if (doc.exists) {
            const dados = doc.data();
            atualizarInterfaceLinhaDoTempo(dados.status, protocolo);
        } else {
            alert("Protocolo não encontrado no banco de dados.");
        }
    }).catch((error) => {
        console.error("Erro ao buscar:", error);
    });
});

// 🌟 FUNÇÃO QUE ATUALIZA A LINHA DO TEMPO NA TELA (Faltava este miolo!)
function atualizarInterfaceLinhaDoTempo(status, codigo) {
    const badge = document.querySelector('.badge-status');
    const h3Span = document.querySelector('.resultado-header h3 span');
    
    // Atualiza o texto do código exibido na tela
    if (h3Span) h3Span.innerText = codigo;

    // Captura as três etapas da linha do tempo
    const passos = document.querySelectorAll('.passo');
    if (passos.length < 3) return; // Evita erros caso as tags não existam

    // Reseta todas as etapas para o estado cinza padrão antes de aplicar o novo status
    passos.forEach(p => p.className = "passo");

    // Aplica as classes CSS dinamicamente dependendo do que veio do Firebase
    if (status === "recebida") {
        if (badge) {
            badge.innerText = "Recebida";
            badge.className = "badge-status em-andamento";
        }
        passos[0].className = "passo atual";
    } 
    else if (status === "em-andamento") {
        if (badge) {
            badge.innerText = "Em Andamento";
            badge.className = "badge-status em-andamento";
        }
        passos[0].className = "passo check";
        passos[1].className = "passo atual";
    } 
    else if (status === "concluido") {
        if (badge) {
            badge.innerText = "Concluído";
            badge.className = "badge-status";
            badge.style.backgroundColor = "#d1fae5";
            badge.style.color = "#065f46";
        }
        passos[0].className = "passo check";
        passos[1].className = "passo check";
        passos[2].className = "passo check";
    }
}