document.addEventListener("DOMContentLoaded", carregarNotas);

const botaoAdd = document.getElementById("addNota");
const campoNota = document.getElementById("novaNota");
const listaNota = document.getElementById("listaNotas")

botaoAdd.addEventListener("click", function() {
    let textoNota = campoNota.value.trim();
    
    if (textoNota !== "") {
        let notas = JSON.parse(localStorage.getItem("notas")) || [];
        notas.push(textoNota);
        localStorage.setItem("notas", JSON.stringify(notas));
        campoNota.value = "";
        carregarNotas();
    }
});

function carregarNotas() {
    listaNotas.innerHTML = ""; 

    let notas = JSON.parse(localStorage.getItem("notas")) || [];
    
    notas.forEach((nota, index) => {
        let li = document.createElement("li");
        li.textContent = nota;

        let botaoDeletar = document.createElement("button");
        botaoDeletar.textContent = "Apagar";
        botaoDeletar.classList.add("deletar");
        botaoDeletar.onclick = () => removerNota(index);

        li.appendChild(botaoDeletar);
        listaNotas.appendChild(li);
    });
}

function removerNota(index) {
    let notas = JSON.parse(localStorage.getItem("notas")) || [];
    notas.splice(index, 1);
    localStorage.setItem("notas", JSON.stringify(notas));
    carregarNotas();
}

