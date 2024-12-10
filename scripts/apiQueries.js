// Função para lidar com o formulário de consulta da API
export async function handleApiForm(event) {
    event.preventDefault();
    const queryType = document.getElementById('query-type').value;
    const queryValue = document.getElementById('query-value').value.replace(/\D/g, ''); // Remove pontuação do CNPJ
    let apiUrl = '';

    // Montando a URL com base no tipo de consulta
    if (queryType === 'feriados') {
        apiUrl = 'https://brasilapi.com.br/api/feriados/v1/2024';
    } else if (queryType === 'cnpj') {
        if (queryValue.length !== 14) {
            alert('Por favor, insira um CNPJ válido com 14 dígitos.');
            return;
        }
        apiUrl = `https://brasilapi.com.br/api/cnpj/v1/${queryValue}`;
    }

    console.log(`Consultando API com URL: ${apiUrl}`);

    if (apiUrl) {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Erro na consulta: ${response.statusText}`);
            }
            const data = await response.json();

            console.log('Dados recebidos da API:', data);

            displayApiResults(data, queryType);
        } catch (error) {
            console.error('Erro ao consultar a API:', error);
            alert('Não foi possível realizar a consulta. Verifique se o CNPJ está correto e tente novamente.');
        }
    }
}

// Função para exibir os resultados da API formatados
function displayApiResults(data, queryType) {
    const resultsDiv = document.getElementById('api-results');
    if (queryType === 'feriados') {
        resultsDiv.innerHTML = `
            <h3>Feriados Nacionais de 2024</h3>
            <ul>
                ${data.map(feriado => `<li>${feriado.date}: ${feriado.name}</li>`).join('')}
            </ul>
        `;
    } else if (queryType === 'cnpj') {
        //**Destructuring**
        const {
            razao_social,
            nome_fantasia,
            cnpj,
            cnae_fiscal_descricao,
            uf,
            ddd_telefone_1,
            email,
            logradouro,
            numero,
            bairro,
            municipio,
            cep
        } = data;

        // Exibição amigável para CNPJ
        resultsDiv.innerHTML = `
            <h3>Informações do CNPJ</h3>
            <p><strong>Razão Social:</strong> ${razao_social}</p>
            <p><strong>Nome Fantasia:</strong> ${nome_fantasia}</p>
            <p><strong>CNPJ:</strong> ${cnpj}</p>
            <p><strong>Atividade Principal:</strong> ${cnae_fiscal_descricao}</p>
            <p><strong>UF:</strong> ${uf}</p>
            <p><strong>Telefone:</strong> ${ddd_telefone_1}</p>
            <p><strong>Email:</strong> ${email || 'Não disponível'}</p>
            <p><strong>Logradouro:</strong> ${logradouro}, ${numero}</p>
            <p><strong>Bairro:</strong> ${bairro}</p>
            <p><strong>Município:</strong> ${municipio}</p>
            <p><strong>CEP:</strong> ${cep}</p>
        `;
    }
}

// Esconder o campo de entrada do CNPJ
function toggleCnpjField() {
    const queryType = document.getElementById('query-type').value;
    const cnpjField = document.getElementById('cnpj-field');
    if (cnpjField) {
        if (queryType === 'cnpj') {
            cnpjField.style.display = 'block';
        } else {
            cnpjField.style.display = 'none';
        }
    }
}

document.getElementById('query-type').addEventListener('change', toggleCnpjField);

toggleCnpjField();
