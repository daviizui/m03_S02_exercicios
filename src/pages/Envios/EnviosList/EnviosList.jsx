import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import EditDocument from "@mui/icons-material/EditDocument";
import { useNavigate } from "react-router-dom";

function EnvioList() {
  const [envios, setEnvios] = useState([]);
  const navigate = useNavigate()

  function buscarEnvios() {
    axios
      .get("http://localhost:3001/envios")
      .then((response) => {
        setEnvios(response.data);
      })
      .catch(() => alert("Houve um erro"));
  }

  useEffect(() => {
    buscarEnvios();
  }, []);

  function deletarEnvio(id) {
    const resposta = window.confirm(
      "Tem certeza que deseja deletar este envio?"
    );

    if (resposta) {
      axios
        .delete(`http://localhost:3001/envios/${id}`)
        .then(() => {
          alert("Deletado com sucesso");
          buscarEnvios();
        })
        .catch(() => alert("Erro ao deletar envio"));
    }
  }

  function redirecionarParaEdicao(id){
    navigate(`/envios/editar/${id}`)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography as="h1">Envios feitos</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {envios.map((envio) => (
                <TableRow key={envio.id}>
                  <TableCell>{envio.id}</TableCell>
                  <TableCell>{envio.cliente_nome}</TableCell>
                  <TableCell>{envio.produtos_clientes.length}</TableCell>
                  <TableCell>{envio.valor_total.toFixed(2)}</TableCell>
                  <TableCell>
                    <DeleteIcon
                      style={{ color: "red" }}
                      onClick={() => deletarEnvio(envio.id)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#b71c1c")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "red")
                      }
                    />

                    <EditDocument  style={{ color: "blue" }} onClick={() => redirecionarParaEdicao(envio.id)}/>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default EnvioList;
