
//Esta função setup(configurar) é chamada uma vez quando o programa começa. Aqui está o que cada linha faz:

//canvas = createCanvas(350, 350); Cria um canvas (área de desenho) com uma largura e altura de 350 pixels.
//canvas.center();: Centraliza o canvas na página.
//background("white"); Define a cor de fundo do canvas como branco.
//canvas.mouseReleased(classifyCanvas);: Define um evento de clique do mouse no canvas para chamar a função classifyCanvas() quando o mouse é liberado.
//synth = window.speechSynthesis;: Inicializa a síntese de voz no navegador.

function setup() {
  canvas = createCanvas(350, 350);
  canvas.center();
  background("white");
  canvas.mouseReleased(classifyCanvas);
  synth = window.speechSynthesis;
}

//A função preload() é usada pelo p5.js para carregar recursos antes do programa começar. Aqui, ela carrega o modelo DoodleNet do ml5.js, 
//que é um modelo de classificação de imagem treinado para reconhecer desenhos simples.

function preload() {


  classifier = ml5.imageClassifier('DoodleNet');
}


//Esta função clearCanvas() é chamada quando o usuário deseja limpar o canvas. Ela simplesmente redefine a cor de fundo do canvas para branco, 
//apagando qualquer desenho anterior.

function clearCanvas() {

  background("white");
}

//A função draw() é chamada continuamente pelo p5.js e é onde o desenho acontece. Aqui está o que cada linha faz:

//strokeWeight(5); Define a largura do traço do desenho como 5 pixels.
//stroke(0); Define a cor do traço do desenho como preto.
//if (mouseIsPressed) { ... }: Verifica se o botão do mouse está pressionado. Se estiver, desenha uma linha do ponto anterior do mouse
//para o ponto atual do mouse.

function draw() {

  // Set stroke weight to 13
  strokeWeight(5);
  // Set stroke color to black
  stroke(0);
  // If mouse is pressed, draw line between previous and current mouse positions
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

//A função classifyCanvas() é chamada quando o mouse é liberado no canvas. Ela classifica o conteúdo do canvas usando o modelo 
//DoodleNet e chama a função gotResult() com os resultados.

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

//A função gotResult() é chamada após a classificação do conteúdo do canvas. Ela recebe os resultados da classificação e atualiza a página HTML 
//com a etiqueta (label) e a confiança (confidence) do objeto identificado. Além disso, ela usa a síntese de voz para falar a etiqueta identificada.

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  document.getElementById('label').innerHTML = 'Label: ' + results[0].label;

  document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

  utterThis = new SpeechSynthesisUtterance(results[0].label);
  synth.speak(utterThis);
}


