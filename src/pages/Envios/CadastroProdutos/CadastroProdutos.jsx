import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CadastroProdutos.css';

function CadastroDeProduto() {
  const { id } = useParams(); // Hook para obter o ID da URL
  const navigate = useNavigate(); // Hook para navegar programaticamente

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Lógica para a edição: busca os dados se um ID estiver presente na URL
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/produtos/${id}`)
        .then(response => {
          const produto = response.data;
          setNome(produto.nome);
          setPreco(produto.preco);
          setDescricao(produto.descricao);
          setImagem(produto.imagem);
        })
        .catch(error => {
          console.error('Erro ao buscar o produto para edição:', error);
          setMensagem('Produto não encontrado para edição.');
        });
    }
  }, [id]); // O efeito roda quando o ID da URL muda

  const handleSubmit = async (event) => {
    event.preventDefault();

    const produtoData = {
      nome: nome,
      preco: parseFloat(preco),
      descricao: descricao,
      imagem: imagem
    };

    try {
      if (id) {
        // Se há um ID, é uma requisição PUT (edição)
        await axios.put(`http://localhost:3001/produtos/${id}`, produtoData);
        setMensagem('Produto atualizado com sucesso!');
      } else {
        // Se não há ID, é uma requisição POST (cadastro)
        await axios.post('http://localhost:3001/produtos', produtoData);
        setMensagem('Produto cadastrado com sucesso!');
      }

      // Redireciona de volta para a tela de listagem após o sucesso
      setTimeout(() => {
        navigate('/'); 
      }, 1500); 

    } catch (error) {
      console.error('Erro na operação:', error);
      setMensagem('Erro ao salvar o produto. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>{id ? "Editar Produto" : "Cadastro de Produto"}</h2>
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
          <button type="submit" className="cadastrar-btn">
            {id ? "Salvar Alterações" : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroDeProduto;