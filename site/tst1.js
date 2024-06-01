// Criar um documento Word a partir de um modelo
function criarDocumentoWord(texto) {
    var content = texto; // O texto que você deseja incluir no documento

    var doc = new docxtemplater();
    doc.loadZip(new JSZip(content));

    // Preencher o documento com dados
    var data = {
        texto: "Texto dinâmico que você deseja incluir no documento."
    };

    doc.setData(data);

    // Renderizar o documento (substituindo as tags do modelo pelos dados)
    doc.render();

    // Gerar um Blob (objeto binário) do documento
    var out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });

    // Salvar o Blob como um arquivo .docx
    saveAs(out, "documento_word.docx");
}

// Exemplo de uso
var texto = "Este é um exemplo de texto que você deseja incluir no documento Word.";
criarDocumentoWord(texto);
