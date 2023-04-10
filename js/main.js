const form = document.getElementById("novoItem")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome" : nome.value,
        "quantidade" : quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual, existe.id)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0;
        criaElemento(itemAtual)
        itens.push(itemAtual)

    }

    
    localStorage.setItem("itens", JSON.stringify(itens))
    
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    const lista = document.querySelector(".lista")
    lista.innerHTML+=`
    <li class="item" data-id="${item.id}">
        <strong>${item.quantidade}</strong>${item.nome}
        <button onclick="deletaElemento(${item.id})">X</button>
    </li>
    `
}

function atualizaElemento(item, id){
    const lista = document.querySelector(".lista")
    const elementoExistente = lista.querySelector(`li[data-id="${id}"]`)
    console.log(elementoExistente)
    elementoExistente.innerHTML = `<strong>${item.quantidade}</strong>${item.nome} <button onclick="deletaElemento(${item.id})">X</button>`

    // atualiza o item na lista de itens
    const index = itens.findIndex(i => i.id === item.id);
    if (index !== -1) {
        itens[index] = item;
    }
}


function deletaElemento(id) {
    const elemento = document.querySelector(`li[data-id="${id}"]`);
    elemento.remove();
  
    // remove o item da lista de itens
    const index = itens.findIndex(i => i.id === id);
    if (index !== -1) {
      itens.splice(index, 1);
    }
  
    localStorage.setItem("itens", JSON.stringify(itens));
  }