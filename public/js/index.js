
const fumei = async function (event) {
    const { data } = await axios.post('/api/count');
    quantidade.innerText = data.length || 0;
}

const init = async function (event) {
    const { data } = await axios.get('/api/count/now');
    quantidade.innerText = data.length || 0;
}

window.onload = () => init();