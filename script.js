document.addEventListener("DOMContentLoaded", () => {

    const dicas = [
        "Dica 1: A marca é predominantemente vermelho.",
        "Dica 2: A marca é uma gigante da tecnologia.",
        "Dica 3: A marca é famosa por seus tênis esportivos.",
        "Dica 4: A marca é conhecida por seus celulares",
        "Dica 5: A marca é muito associada a hambúrgueres"
    ];

    const respostas = [
        "coca-cola",
        "apple",
        "nike",
        "samsung",
        "mcdonalds"
    ];

    const reiniciar = document.getElementById("reiniciar");
    const comecar = document.getElementById("comecar");

    const tips = document.getElementById("tips");
    if (tips) {
        let htmlFinal = "";

        for (let i = 0; i < dicas.length; i++) {
            htmlFinal += `<h3>${dicas[i]}</h3>`;
        };

        tips.innerHTML = htmlFinal;
    }

    const enviar = document.getElementById("enviar");
    const nome = document.getElementById("nome");

    if(enviar){
        enviar.addEventListener('click', () => {
    
            if (nome.value.trim() === "") {
                alert("Digite um nome!");
            } else {
                localStorage.setItem("nome", nome.value);
                alert("nome digitado: "+nome.value)
                window.location.href = "home.html";
            }
    
        })
    }



    if (comecar) {

        comecar.addEventListener("click", () => {
            let acertos = 0;

            const tempoInicio = new Date().getTime();

            for (let i = 0; i < dicas.length; i++) {

                let contador = 0;

                while (contador < 3) {
                    const resposta = prompt(dicas[i] + "\nTentativa " + (contador + 1) + " de 3.\nQual é a palavra?");

                    if (!resposta) break;

                    if (resposta.toLowerCase().trim() === respostas[i]) {
                        acertos++;
                        break;
                    } else {
                        contador++;
                    }
                }
            }


            const tempoFim = new Date().getTime();
            const tempoTotal = Math.floor((tempoFim - tempoInicio) / 1000);

            localStorage.setItem("acertos", acertos);
            localStorage.setItem("tempo", tempoTotal);

            window.location.href = "resultado.html";
        });
    }

    const container = document.getElementById("Resultados");

    if (container) {
        const acertos = localStorage.getItem("acertos");
        const tempo = localStorage.getItem("tempo") || 0;

        const minutos = Math.floor(tempo / 60);
        const segundos = tempo % 60;

        const tempoFormatado =
            String(minutos).padStart(2, '0') + ":" +
            String(segundos).padStart(2, '0');

        const nomeSalvo = localStorage.getItem("nome");

        container.innerHTML = `<h2>Quantidade de acertos: ${acertos}</h2> <br>
                    <h2>Tempo gasto: ${tempoFormatado}</h2><br>
                    <h2>Nome do usuario: ${nomeSalvo}</h2>`;
    }
    if (reiniciar) {
        reiniciar.addEventListener("click", () => {
            localStorage.removeItem("acertos");
            localStorage.removeItem("tempo");
            window.location.href = "index.html";
        });
    }

});