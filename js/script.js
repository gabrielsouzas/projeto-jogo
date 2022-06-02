// PEGA A CLASSE DA IMAGEM DO MARIO
const mario = document.querySelector('.mario')

// PEGA A CLASSE DA IMAGEM DO PIPE
const pipe = document.querySelector('.pipe')

// PEGA O SPAM DE GAME OVER
const gameover = document.querySelector('.gameover')

// PEGA O SPAM DE PONTOS
const pontos = document.querySelector('.pontos')
let contPontos = 0
let podePontuar = true

// TEMPO
const display = document.querySelector('.tempo');
var timer = 0, minutes, seconds;
    const tempo = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        timer++
        // Caso seja de contagem regressiva
        /*if (--timer < 0) {
            timer = duration;
        }*/
    }, 1000);

// FUNÇÃO QUE ADICIONA  E REMOVE A CLASSE JUMP NA IMAGEM DO MARIO PARA ELE PULAR
const jump = () => {
    mario.classList.add('jump')

    //console.log('PODE PONTUAR: ' + podePontuar)
    /*if (podePontuar) {
        contPontos++
        pontos.innerHTML = contPontos
    }
    podePontuar = false*/

    let marioPositionb = +window.getComputedStyle(mario).bottom.replace('px', '')
    if(pipe.offsetLeft <= 120 && pipe.offsetLeft > 0 && marioPositionb >= 148){
        contPontos++
        pontos.innerHTML = contPontos
        
    }

    // FUNÇÃO QUE RECEBE UMA FUNÇÃO ANONIMA E UM TEMPO
    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500);
}

// FUNÇÃO QUE CALCULA SE O MARIO BATEU NO PIPE
const loop = setInterval(() => {
    // PEGA A POSIÇÃO DO PIPE
    const pipePosition = pipe.offsetLeft
    // SÓ DESSE JEITO VAI CONSEGUIR EPEGAR QUALQUER PROPRIEDADE SETADA NO MARIO
    // PEGA O BOTTON DO MARIO
    // REMOVE O PX COM REPLACE E TRANSFORMA EM NUMBER COM O +
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
    
    // TESTA SE A POSIÇÃO DO PIPE FOR MENOR OU IGUAL A 120 ENTÃO ELA BATEU NO MARIO
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 148) {
        // PARA A ANIMAÇÃO DO PIPE
        pipe.style.animation = 'none'
        // SETA A POSIÇÃO QUE BATEU NO MARIO
        pipe.style.left = `${pipePosition}px`

        // PARA A ANIMAÇÃO DO MARIO
        mario.style.animation = 'none'
        // SETA A POSIÇÃO QUE BATEU NO PIPE
        mario.style.bottom = `${marioPosition}px`

        // SETA A IMAGEM DO MARIO MORRENDO, AJUSTA O TAMANHO E A MARGEM
        mario.src = 'imagens/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        gameover.innerHTML = "GAME OVER"
        if (contPontos > 0) {
            contPontos--
            pontos.innerHTML = contPontos
        }

        podePontuar = false

        // PARA O LOOP
        clearInterval(loop)
        clearInterval(tempo)
    } else {
        if(pipePosition <= 120 && pipePosition > 0 && marioPosition >= 148){
            //console.log('PIPE: ' + pipePosition)
            podePontuar = true
            
        }
    }
}, 10);


// TEMPO
/*function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    const tempo = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        timer++
        // Caso seja de contagem regressiva
        /*if (--timer < 0) {
            timer = duration;
        }*//*
    }, 1000);
}
/*window.onload = function () {
    //var duration = 60 * 5; // Caso precise de uma contagem regressiva - Converter para segundos
    display = document.querySelector('.tempo'); // selecionando o timer
    startTimer(0, display); // iniciando o timer
};*/


// LISTENER PARA QUANDO UMA TECLA FOR PRESSIONADA
document.addEventListener('keydown', jump)