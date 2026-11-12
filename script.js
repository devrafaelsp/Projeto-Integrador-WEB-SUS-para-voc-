// 1 - Seleção dos elementos HTML

// Captura o formulário e o elemento responsável.

const formulario = document.getElementById("formulario");

// Apresentar mensagens ao usuário.

const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {

        event.preventDefault();

// 2 - Validação dos dados do formulário

    // Cria uma variavel chamada cep
    const cep = document.getElementById("cep").value.trim().replace("-", "").replace(".", "");
    const numero = document.getElementById("numero").value.trim();

    if (cep === "") {

        mensagem.textContent = "Digite seu CEP";

        // Verifica se o CEP possui oito dígitos.

    } else if (cep.length !== 8) {

        mensagem.textContent = "CEP deve possuir 8 dígitos";

        // Se o número da residência foi informado.
        
    } else if (numero === "") {

        mensagem.textContent = "Digite o número da residência";

    } else {

        mensagem.textContent = "Consultando CEP...";
// 3 - Consulta a API ViaCEP

        // Consulta o serviço do ViaCEP para obter os dados informados.

        const url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)

// 4 - Tratamento da resposta do API

            //Transforma os dados solicitados em objetos para o JavaScript e receb esses dados

            .then(resposta => resposta.json())
            .then(dados => {

                // Verifica se o CEP foi encontrado.

                if (dados.erro) {

                    mensagem.textContent = "CEP não encontrado";

                    // Exibi os dados do endereço na tela.

                } else {

                    mensagem.textContent = `CEP encontrado!
                    CEP: ${dados.cep}
                    Logradouro: ${dados.logradouro}
                    Número: ${numero}
                    Bairro: ${dados.bairro}
                    Cidade: ${dados.localidade}
                    Estado: ${dados.uf}`;
                }
            })

// 5 - Erros

            //Exibe possiveis erros durante consultas do API

            .catch(erro => {

                mensagem.textContent = "Erro ao consultar o CEP";
                console.log(erro);

            });
    }
}); // O evento termina aqui!

// SEGUNDA PARTE: TESTE DO NOMINATIM
const endereco = "Praça da Sé, São Paulo, SP, Brasil";

const enderecoCodificado = encodeURIComponent(endereco);

const url = `https://nominatim.openstreetmap.org/search?q=${enderecoCodificado}&format=jsonv2&limit=1&countrycodes=br`;

fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {

        if (dados.length === 0) {

            console.log("Localização não encontrada");

        } else {

            const latitude = dados[0].lat;
            const longitude = dados[0].lon;

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);
        }
    })
    .catch(erro => {

        console.log("Erro na consulta:", erro);
    });