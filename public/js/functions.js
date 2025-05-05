const detalhar = async function (event) {
    const { data } = await axios.get('/api/count');
    return data;
}

const vouFumar = async function (event) {
    const { data } = await axios.get('/api/count/now');
    const currentSmoke = data.length > 0 ? data[data.length - 1]: null;

    if (!currentSmoke)
        alert("Foco em parar de fumar mano");

    if (currentSmoke) {
        var smokeLastDate = new Date(currentSmoke);
        var nextSmokeDate = new Date(currentSmoke);
        nextSmokeDate.setHours(nextSmokeDate.getHours() + 2);

        if (smokeLastDate < nextSmokeDate)
            alert("mano ainda não deu 2 horas que você fumou, vamos parar né fresco");
    }
}

const fumei = async function (event) {
    const { data } = await axios.post('/api/count');
    vouFumar(event);
    quantidade.innerText = data.length || 0;
}

const init = async function (event) {
    const { data } = await axios.get('/api/count/now');
    quantidade.innerText = data.length || 0;
}