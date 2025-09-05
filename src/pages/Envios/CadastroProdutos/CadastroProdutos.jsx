import React, { useState } from 'react';
import axios from 'axios';
import './CadastroProdutos.css'; 

function CadastroDeProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const novoProduto = {
      nome: nome,
      preco: parseFloat(preco), 
      descricao: descricao,
      imagem: imagem
    };

    try {
      const response = await axios.post('http://localhost:3001/produtos', novoProduto);
      console.log('Produto cadastrado com sucesso:', response.data);
      setMensagem('Produto cadastrado com sucesso!');
    
      setNome('');
      setPreco('');
      setDescricao('');
      setImagem('');
    } catch (error) {
      console.error('Erro ao cadastrar o produto:', error);
      setMensagem('Erro ao cadastrar o produto. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de produto</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-group">
          <label htmlFor="nome">Nome do produto</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="preco">Preço do produto</label>
          <input
            type="number"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            step="0.01"
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="imagem">URL da imagem</label>
          <input
            type="text"
            id="imagem"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group full-width">
          <button type="submit" className="cadastrar-btn">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastroDeProduto;