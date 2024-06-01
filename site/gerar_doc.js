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
                    
                    generateDocument(input.value)

                    
                    autoReply.innerHTML = '<p>Gerando Documentação ...</p>';
                    chatBody.appendChild(autoReply);
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






  async function generateDocument(texto) {

    const theme = texto;
  
    if (theme.trim() === "") return;
  
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "gpt-3.5-turbo-instruct",
        prompt: `Escreva um documento sobre o tema: ${theme}`,
        max_tokens: 1024,
        n: 1,
        stop: null,
        temperature: 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-proj-2dIPMTEMau9GySNcJdMST3BlbkFJpZfeMkBMIkWW06H7yHyK`
        }
      });
  
      const documentText = response.data.choices[0].text;
      displayDocument(documentText);
    } catch (error) {
      console.error('Erro ao gerar documento:', error);
      alert('Erro ao gerar documento: ' + error.message);
    }
  }
  
  
  function displayDocument(text) {
    const documentContainer = document.getElementById('document-container');
    // documentContainer.textContent = text;

    gerarDocx(text);
  }
  

  async function gerarDocx(texto) {
    // Certifique-se de que a biblioteca docx foi carregada
    if (typeof window.docx === 'undefined') {
      alert('Biblioteca docx não foi carregada.');
      return;
    }
  
    const { Document, Packer, Paragraph, TextRun } = window.docx;
  
    // Crie um documento vazio
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun(texto),
              ],
            }),
          ],
        },
      ],
    });
  
    // Converta o documento para um Blob
    const blob = await Packer.toBlob(doc);
  
    // Crie um link de download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "documento.docx";

    colocar_botao(link.href)
  
    // Simule um clique no link para iniciar o download
    // link.click();
  }
  

  function colocar_botao(href){

    var chatBody = document.getElementById('chat-body');
    var autoReply = document.createElement('div');
    autoReply.classList.add('message', 'received');
    autoReply.innerHTML = `<a href="${href}"><button class="dowload">Baixar documento</button></a>`;
    chatBody.appendChild(autoReply);
  }

