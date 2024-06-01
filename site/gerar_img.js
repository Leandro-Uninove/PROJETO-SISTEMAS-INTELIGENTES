
window.addEventListener('load', function() {
    setTimeout(function() {
        const sendButton = document.getElementById('send-button');
        console.log(sendButton); // Verifica se o botão está sendo encontrado
        console.log('menu.js carregado');
        if (sendButton) {
            sendButton.addEventListener('click', function() {
                var input = document.getElementById('message-input');
                var message = input.value.trim();

                if (message) {
                    // Adiciona a mensagem enviada ao chat
                    var chatBody = document.getElementById('chat-body');
                    var newMessage = document.createElement('div');
                    newMessage.classList.add('message', 'sent');
                    newMessage.innerHTML = '<p>' + message + '</p>';
                    chatBody.appendChild(newMessage);

                    // Adiciona a resposta automática
                    var autoReply = document.createElement('div');
                    autoReply.classList.add('message', 'received');
                    autoReply.innerHTML = '<p>Mensagem recebida, gerando a imagem. . .</p>';
                    chatBody.appendChild(autoReply);
                    
                    resposta = generateImage(input.value)
                    // Limpa o input
                    input.value = '';

                    // Rola o chat para a última mensagem
                    chatBody.scrollTop = chatBody.scrollHeight;
                }
            });
        } else {
            console.error('Botão de envio não encontrado!');
        }
    }, 3000); // 3000ms de atraso
});



async function generateImage(texto) {

  
    if (texto.trim() === "") return;
  
    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        model: "dall-e-3",
        prompt: texto,
        n: 1,
        size: "1024x1024"
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-proj-2dIPMTEMau9GySNcJdMST3BlbkFJpZfeMkBMIkWW06H7yHyK`
        }
      });
  
      const imageUrl = response.data.data[0].url;
      displayImage(imageUrl);
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      alert('Erro ao gerar imagem: ' + error.message);
    }
  }
  
  function displayImage(url) {

    var chatBody = document.getElementById('chat-body');
    var autoReply = document.createElement('div');
    autoReply.classList.add('message', 'received');
    autoReply.innerHTML = `<p><br></p><img src="${url}" alt="Imagem gerada" width="30%">`;
    chatBody.appendChild(autoReply);
  }
  



