document.addEventListener("DOMContentLoaded", carregarNotas);

const botaoAdd = document.getElementById("addNota");
const campoNota = document.getElementById("novaNota");
const listaNotas = document.getElementById("listaNotas");

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

        let spanTexto = document.createElement("span");
        spanTexto.textContent = nota;

        let botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.classList.add("editar");
        botaoEditar.onclick = () => editarNota(index, spanTexto);

        let botaoDeletar = document.createElement("button");
        botaoDeletar.textContent = "Apagar";
        botaoDeletar.classList.add("deletar");
        botaoDeletar.onclick = () => removerNota(index);

        li.appendChild(spanTexto);
        li.appendChild(botaoEditar);
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

function editarNota(index, spanTexto) {
    let notas = JSON.parse(localStorage.getItem("notas")) || [];
    
    let input = document.createElement("input");
    input.type = "text";
    input.value = notas[index];
    input.classList.add("input-edicao");

    let botaoSalvar = document.createElement("button");
    botaoSalvar.textContent = "Salvar";
    botaoSalvar.classList.add("salvar");
    botaoSalvar.onclick = () => {
        let novoTexto = input.value.trim();
        if (novoTexto !== "") {
            notas[index] = novoTexto;
            localStorage.setItem("notas", JSON.stringify(notas));
            carregarNotas();
        }
    };

    spanTexto.replaceWith(input);
    let li = input.parentElement;
    li.replaceChild(botaoSalvar, li.children[1]); 
}
