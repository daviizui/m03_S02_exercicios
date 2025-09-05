import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TelaListagem.css';

function ProdutosCadastrados() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar os produtos da API
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

  // Carrega os produtos ao montar o componente
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para lidar com a exclusão
  const handleDelete = async (id, nome) => {
    // Exibe a confirmação para o usuário
    const isConfirmed = window.confirm(`Tem certeza que deseja excluir o produto "${nome}"?`);
    
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/produtos/${id}`);
        // Se a exclusão for bem-sucedida, atualiza a lista removendo o produto
        setProdutos(produtos.filter(produto => produto.id !== id));
        console.log(`Produto com ID ${id} excluído com sucesso.`);
      } catch (err) {
        console.error('Erro ao excluir o produto:', err);
        setError('Erro ao excluir o produto. Tente novamente.');
      }
    }
  };

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
                  {/* Botão de Deletar com o evento onClick */}
                  <button 
                    className="deletar-btn"
                    onClick={() => handleDelete(produto.id, produto.nome)}
                  >
                    Deletar!
                  </button>
                  <button className="editar-btn">Editar</button>
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