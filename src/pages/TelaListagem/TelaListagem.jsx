import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './TelaListagem.css';

function ProdutosCadastrados() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [termoDeBusca, setTermoDeBusca] = useState(''); // Novo estado para o termo de busca

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/produtos');
      setProdutos(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Erro ao carregar os produtos. Verifique se a API está funcionando.');
      setIsLoading(false);
      console.error('Erro na requisição da API:', err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleDelete = async (id, nome) => {
    const isConfirmed = window.confirm(`Tem certeza que deseja excluir o produto "${nome}"?`);
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/produtos/${id}`);
        setProdutos(produtos.filter(produto => produto.id !== id));
        console.log(`Produto com ID ${id} excluído com sucesso.`);
      } catch (err) {
        console.error('Erro ao excluir o produto:', err);
        setError('Erro ao excluir o produto. Tente novamente.');
      }
    }
  };

  // Filtra os produtos com base no termo de busca
  const produtosFiltrados = produtos.filter(produto => 
    produto.nome.toLowerCase().includes(termoDeBusca.toLowerCase())
  );

  if (isLoading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="produtos-cadastrados-container">
      <div className="header">
        <h2>Produtos cadastrados</h2>
        <Link to="/produtos/cadastro" className="novo-btn">
          Novo
        </Link>
      </div>

      <div className="search-bar-container">
        <input 
          type="text" 
          placeholder="Pesquisar por nome..." 
          className="search-input"
          value={termoDeBusca}
          onChange={(e) => setTermoDeBusca(e.target.value)}
        />
      </div>

      <div className="lista-produtos">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map(produto => (
            <div key={produto.id} className="card">
              <img src={produto.imagem} alt={produto.nome} className="produto-imagem" />
              <div className="card-content">
                <h3>{produto.nome} - R$ {produto.preco.toFixed(2).replace('.', ',')}</h3>
                <p className="descricao">{produto.descricao}</p>
                <div className="botoes-card">
                  <button 
                    className="deletar-btn"
                    onClick={() => handleDelete(produto.id, produto.nome)}
                  >
                    Deletar
                  </button>
                  <Link to={`/produtos/editar/${produto.id}`} className="editar-btn">
                    Editar!
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default ProdutosCadastrados;