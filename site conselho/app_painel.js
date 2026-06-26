// 1. Configurações do seu projeto Firebase (Com as suas chaves reais)
const firebaseConfig = {
    apiKey: "AIzaSyCTZmFHNlomb3zurfEN1A2GsBSVCGeGf8",
    authDomain: "site-conselho.firebaseapp.com",
    projectId: "site-conselho",
    storageBucket: "site-conselho.appspot.com",
    messagingSenderId: "181542343066",
    appId: "1:181542343066:web:00c5d6743b9947226b6a23",
    measurementId: "G-0G5V1TCHRM"
};

// 2. Inicializa o Firebase (Utilizando o método compatível com o link do seu HTML)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. Lógica para monitorar o clique do botão do Conselheiro
document.getElementById('btn-atualizar').addEventListener('click', function() {
    const protocolo = document.getElementById('protocolo-input').value.trim().toUpperCase();
    const novoStatus = document.getElementById('status-select').value;
    const msg = document.getElementById('mensagem-sucesso');

    if(protocolo === "") {
        alert("Por favor, digite o número do protocolo!");
        return;
    }

    // Grava ou atualiza a informação na nuvem (Firestore)
    db.collection("denuncias").doc(protocolo).set({
        status: novoStatus,
        dataAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
    .then(() => {
        msg.innerText = "Status atualizado com sucesso na Nuvem!";
        setTimeout(() => msg.innerText = "", 3000);
        
        // Limpa o campo do protocolo após salvar
        document.getElementById('protocolo-input').value = "";
    })
    .catch((error) => {
        console.error("Erro ao salvar: ", error);
        alert("Erro ao conectar com o banco de dados.");
    });
});