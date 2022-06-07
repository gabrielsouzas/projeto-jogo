// PEGA A CLASSE DA IMAGEM DO MARIO
const mario = document.querySelector('.mario')

// PEGA A CLASSE DA IMAGEM DO PIPE
const pipe = document.querySelector('.pipe')

// PEGA O SPAM DE GAME OVER
const gameover = document.querySelector('.gameover')

// PEGA A IMAGEM DO CHÃO
const floor = document.querySelector('.floor')

// PEGA AS NUVENS
const clouds = document.querySelector('.clouds')

// PEGA AS INFORMAÇÕES DO DESENVOLVEDOR BASE
const info = document.querySelector('.info')

// PEGA O SPAM DE PONTOS
const pontos = document.querySelector('.pontos')
let contPontos
let podePontuar
let dia = true

// TEMPO
const display = document.querySelector('.tempo');

const gameboard = document.querySelector('.game-board')

var larguraJanela = window.innerWidth;

var jump
var loop
var pontuou
var tempo
var fundo

let pipeDistanceLeft = 120
let marioJumpHeight = 148
let marioDeathImageSize = '75px'
let marioDeathMarginLeft = '50px'
let classJump = 'jump'
let heightObjects = '68px'

// FUNÇÃO QUE INICIA O JOGO
function start() {
    contPontos = 0
    podePontuar = false

    pipe.classList.add('pipeanimation')

    // VERIFICA A LARGURA DA TELA E ALTERA A VELOCIDADE DO PIPE PARA DAR MAIS JOGABILIDADE
    if (larguraJanela <= 950) {
        pipe.style.animation = `pipe-animation 1.0s infinite linear`
    }

    console.log(larguraJanela)
    if (larguraJanela <= 400) {
        pipe.style.width = '30px';
        pipe.style.height = '30px';
        pipe.style.bottom = '24px'

        mario.style.width = '60px';
        marioDeathImageSize = '30px';
        marioDeathMarginLeft = '22px'
        mario.style.bottom = '24px'

        pipeDistanceLeft = 50
        marioJumpHeight = 54

        classJump = 'jumpphone'

        floor.style.width = '600px'

        heightObjects = '20px'

        info.style.fontSize = '0.5em'

        clouds.style.width = '300px'

    }

    var timer = 0, minutes, seconds;
        tempo = setInterval(() => {
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
    jump = () => {
        mario.classList.add(classJump)

        // FUNÇÃO QUE RECEBE UMA FUNÇÃO ANONIMA E UM TEMPO
        setTimeout(() => {
            mario.classList.remove(classJump)
        }, 500);
    }

    // FUNÇÃO QUE CALCULA SE O MARIO BATEU NO PIPE
    loop = setInterval(() => {
        // PEGA A POSIÇÃO DO PIPE
        const pipePosition = pipe.offsetLeft
        // SÓ DESSE JEITO VAI CONSEGUIR EPEGAR QUALQUER PROPRIEDADE SETADA NO MARIO
        // PEGA O BOTTON DO MARIO
        // REMOVE O PX COM REPLACE E TRANSFORMA EM NUMBER COM O +
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
        
        // TESTA SE A POSIÇÃO DO PIPE FOR MENOR OU IGUAL A 120 ENTÃO ELA BATEU NO MARIO
        if (pipePosition <= pipeDistanceLeft && pipePosition > 0 && marioPosition < marioJumpHeight) {
            // PARA A ANIMAÇÃO DO PIPE
            //pipe.style.animation = 'none'
            pipe.classList.remove('pipeanimation')
            // SETA A POSIÇÃO QUE BATEU NO MARIO
            pipe.style.left = `${pipePosition}px`

            // PARA A ANIMAÇÃO DO MARIO
            mario.style.animation = 'none'
            // SETA A POSIÇÃO QUE BATEU NO PIPE
            mario.style.bottom = `${marioPosition}px`

            // SETA A IMAGEM DO MARIO MORRENDO, AJUSTA O TAMANHO E A MARGEM
            mario.src = 'imagens/game-over.png'
            mario.style.width = marioDeathImageSize
            mario.style.marginLeft = marioDeathMarginLeft

            gameover.innerHTML = "GAME OVER"
            

            // PARA O LOOP
            clearInterval(loop)
            clearInterval(tempo)
            clearInterval(pontuou)
        } else {
            if(pipePosition <= pipeDistanceLeft && pipePosition > 0 && marioPosition >= marioJumpHeight){
                podePontuar = true
            }
        }
    }, 10);

    // CALCULA A PONTUAÇÃO DO MARIO
    pontuou = setInterval(() => {
        if (podePontuar) {
            contPontos++
            pontos.innerHTML = contPontos
            podePontuar = false
        }
    }, 1500);

    // TROCA O FUNDO COM AS CORES DO DIA PARA A NOITE E O INVERSO CONFORME PASSA O TEMPO
    fundo = setInterval(() => {
        if (dia) {
            gameboard.style.background = 'linear-gradient(#082029, #56656b)'
            pontos.style.color = 'white'
            pontos.style.textShadow = '#082029 2px 3px 2px'
            display.style.color = 'white'
            gameover.style.color = 'white'
            dia = false
        } else {
            gameboard.style.background = 'linear-gradient(#87CEEB, #E0F6FF)'
            pontos.style.color = '#000000bb'
            pontos.style.textShadow = '#87CEEB 2px 3px 2px'
            display.style.color = '#000000bb'
            gameover.style.color = '#000000bb'
            dia = true
        }
    }, 15000);

}
// FUNÇÃO QUE RESETA O JOGO PARA O INICIO
const restart = () => {
    console.log('clicou')
    
    pipe.style.left = '100%'

    
    mario.style.marginLeft = '0px'
    mario.style.width = '150px'
    mario.style.bottom = heightObjects
    mario.src = 'imagens/mario.gif'
    mario.style.animation = ''

    gameover.innerHTML = ""
    pontos.innerHTML = "0"
    

    // FUNÇÃO QUE RECEBE UMA FUNÇÃO ANONIMA E UM TEMPO
    setTimeout(() => {
        start()
    }, 500);
    
}

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

start()

// LISTENER PARA QUANDO UMA TECLA FOR PRESSIONADA
document.addEventListener('keydown', jump)

// LISTENER PARA QUANDO O MOUSE FOR PRESSIONADO
document.addEventListener('mousedown', jump)