const removerFilhos = function () {
    const filhos = [];
    center_component.childNodes.forEach(a => filhos.push(a));
    for (const filho of filhos) {
        center_component.removeChild(filho);
    }
}

const adicionarLinha = function (data = new Date()) {
    const [
        div1,
        div2,
        div3,
    ] = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
    ]

    div1.classList = ['w-full my-2 flex border-b border-gray-200 p-2'];
    div3.classList = ['ml-4'];
    div2.classList = ['font-bold'];

    div2.innerText = "Data e hora:";
    div3.innerText = data.toLocaleDateString('pt-BR') + " " + data.toTimeString('pt-BR');

    div1.appendChild(div2);
    div1.appendChild(div3);

    center_component.appendChild(div1);
}

const detalheInit = async function() {
    var values = await detalhar(null);
    const data = [];

    for (const value of values) {
        var date = new Date(
            parseInt(value.name.substring(0, 4)), 
            (parseInt(value.name.substring(4, 6)) - 1),
            parseInt(value.name.substring(6, 8))
        );

        data.push({ date, content: value.content.map(a => new Date(a)) });
    }

    removerFilhos();
    for (const _data of data)
        for (const content of _data.content)
            adicionarLinha(content);
} 

window.onload = () => {
    detalheInit()
}