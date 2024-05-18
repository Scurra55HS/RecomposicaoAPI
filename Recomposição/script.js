document.addEventListener("DOMContentLoaded", function() {
    carregarPerfil('Scurra55HS');

    fetch('https://api.github.com/users/Scurra55HS')
        .then(response => response.json())
        .then(data => {
            carregarSeguidores(data.followers_url);
        })
        .catch(error => console.error('Erro ao carregar perfil inicial:', error));
});

async function carregarPerfil(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        atualizarPerfil(data);
        
        atualizarBotaoNavegacao(username);
        
        carregarSeguidores(data.followers_url);
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
    }
}

function atualizarPerfil(data) {
    const UsuarioPerfil = document.getElementById('perfil');
    UsuarioPerfil.innerHTML = `
        <img class="perfil-img" src="${data.avatar_url}" alt="Avatar">
        <div class="perfil-section">
            <h1 class="nome">${data.name}</h1>
            <p class="bio">${data.bio}</p>
            <div class="btn">
                <button>Download Curriculo</button>
                <button class="btn-contato">Contato</button>
            </div>
        </div>
    `;
}
function atualizarBotaoNavegacao(username) {
    const BtnHome = document.getElementById('BtnHome');
    if (username !== 'Scurra55HS') {
        BtnHome.innerText = 'Voltar';
        BtnHome.setAttribute('onclick', 'carregarPerfil("Scurra55HS")');
    } else {
        BtnHome.innerText = 'Home';
        BtnHome.removeAttribute('onclick');
    }
}

async function carregarSeguidores(followersUrl) {
    try {
        const response = await fetch(followersUrl);
        const followersData = await response.json();
        atualizarSeguidores(followersData);
    } catch (error) {
        console.error('Erro ao carregar seguidores:', error);
    }
}

function atualizarSeguidores(followersData) {
    const SeguidoresLista = document.getElementById('listaSeguidores');
    SeguidoresLista.innerHTML = '';
    followersData.forEach(follower => {
        SeguidoresLista.innerHTML += `
            <div class="seguidor" onclick="carregarPerfil('${follower.login}')">
                <img src="${follower.avatar_url}" alt="Avatar">
                <p class="nome-seguidor">${follower.login}</p>
            </div>
        `;
    });
}