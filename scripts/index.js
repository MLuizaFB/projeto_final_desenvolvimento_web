fetch('dados/personagens.json')
    .then(response => response.json())
    .then(personagens => {
        let indiceAtual = 0;

        function atualizarPersonagem(indice) {
            const personagem = personagens[indice];
            if (personagem) {
                document.getElementById('personagem_imagem').src = personagem.imagem;
                document.getElementById('personagem_nome').textContent = personagem.nome;
                document.getElementById('personagem_aniversario').textContent = personagem.aniversario;
                document.getElementById('personagem_endereco').textContent = personagem.endereco;

                const presentesContainer = document.getElementById('presentes');
                presentesContainer.innerHTML = ''; 

                personagem.melhores_presentes.forEach(presente => {
                    const abbr = document.createElement('abbr');
                    abbr.classList.add('tooltip'); 

                    const presenteImg = document.createElement('img');
                    presenteImg.src = presente.imagem;
                    presenteImg.alt = presente.descricao;
                    presenteImg.classList.add('imagem_presente');

                    const tooltipText = document.createElement('span');
                    tooltipText.classList.add('tooltiptext');
                    tooltipText.textContent = presente.descricao;

                    abbr.appendChild(presenteImg);
                    abbr.appendChild(tooltipText); 
                    presentesContainer.appendChild(abbr);
                });
            }
        }

        atualizarPersonagem(indiceAtual);

        function mostrarProximoPersonagem() {
            indiceAtual = (indiceAtual + 1) % personagens.length; 
            atualizarPersonagem(indiceAtual);
        }

        function mostrarPersonagemAnterior() {
            indiceAtual = (indiceAtual - 1 + personagens.length) % personagens.length; 
            atualizarPersonagem(indiceAtual);
        }

        document.getElementById('seta_direita').addEventListener('click', mostrarProximoPersonagem);
        document.getElementById('seta_esquerda').addEventListener('click', mostrarPersonagemAnterior);

        document.querySelectorAll('.lista_tela_personagens_icones_imagens').forEach((img, index) => {
            img.addEventListener('click', () => {
                const nomePersonagem = img.getAttribute('data-nome');
                const personagem = personagens.find(p => p.nome === nomePersonagem);
                
                if (personagem) {
                    indiceAtual = personagens.indexOf(personagem); 
                    atualizarPersonagem(indiceAtual);
                }
            });
        });
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));


