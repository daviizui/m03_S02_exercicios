import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TelaListagem.css'; 
import { Link } from 'react-router-dom';

function ProdutosCadastrados() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchProdutos();
  }, []); 

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
        <button className="novo-btn">Novo</button>
      </div>

      <div className="lista-produtos">
        {produtos.length > 0 ? (
          produtos.map(produto => (
            <div key={produto.id} className="card">
              <img src={produto.imagem} alt={produto.nome} className="produto-imagem" />
              <div className="card-content">
                <h3>{produto.nome} - R$ {produto.preco.toFixed(2).replace('.', ',')}</h3>
                <p className="descricao">{produto.descricao}</p>
                <div className="botoes-card">
                  <button className="deletar-btn">Deletar</button>
                  <Link to={`/produtos/editar/${produto.id}`} className="editar-btn">
                    Editar!
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto cadastrado.</p>
        )}
      </div>
    </div>
  );
}

export default ProdutosCadastrados;