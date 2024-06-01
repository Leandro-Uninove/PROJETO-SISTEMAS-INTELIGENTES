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
                    autoReply.innerHTML = '<p>Gerando doc</p>';
                    chatBody.appendChild(autoReply);
                    
                    autoReply.innerHTML = '<p>Processando ...</p>';
                    chatBody.appendChild(autoReply);

                    sendMessage(input.value)
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





async function sendMessage(text) {

    const message = text;

    if (message.trim() === "") return;


    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4-turbo",
            messages: [{role: "user", content: message}],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk-proj-2dIPMTEMau9GySNcJdMST3BlbkFJpZfeMkBMIkWW06H7yHyK`
            }
        });

        const reply = response.data.choices[0].message.content;
        appendMessage(reply);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        appendMessage(`Erro ao enviar mensagem: ${error.message}`, 'error');
    }
}

function appendMessage(message) {
    var chatBody = document.getElementById('chat-body');
    var autoReply = document.createElement('div');
    autoReply.classList.add('message', 'received');
    autoReply.innerHTML = message;
    chatBody.appendChild(autoReply);
}


