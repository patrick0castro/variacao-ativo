# Variação do Ativo

Este projeto exibe os últimos pregões de um ativo, mostrando seu valor e variação em relação ao dia anterior e à primeira data registrada. Com essas informações, é possível acompanhar o desempenho do ativo escolhido ao longo do tempo e tomar decisões informadas de investimento. A interface do projeto é simples e intuitiva, permitindo que o usuário visualize facilmente as informações mais relevantes.

Projeto desenvolvido em Angular com pacotes adicionais, como Angular Material, ng2-chart e date-fns, que são utilizados para criar interfaces de usuário e gráficos interativos. Além disso, ele também faz uso da API do Yahoo Finance para buscar dados de ações.

## Captura de tela

![App Screenshot](./imagem.png)

## Executando o Projeto com Docker

Para executar o projeto com Docker, é necessário ter o Docker e o Docker-compose instalados em sua máquina. Para fazer isso, basta abrir o terminal na raiz do projeto e executar o seguinte comando:

```bash
  docker-compose up
```

Depois que o Docker for executado, o projeto estará disponível em http://localhost:4200/.
<br><br><br>

## Executando o Projeto sem utilizar Docker

Antes de começar, você precisará ter o Node.js instalado em sua máquina. Este projeto foi criado com o Angular 15, portanto, certifique-se de ter a versão compatível (mínima de v16.13 ou v18.10) instalada em sua máquina.

## Instalação

Para instalar as dependências do projeto, abra um terminal na raiz do projeto e execute o seguinte comando:

```bash
  npm install
```

Se você não quiser executar o projeto com Docker, pode executá-lo em um servidor de desenvolvimento. Para isso, execute o seguinte comando:

```bash
  npm start
```

Após o processo de compilação, o projeto estará disponível em http://localhost:4200/.

## Pacotes utilizados

**Angular Material:** conjunto de componentes para Angular que implementam os princípios de design do Material Design do Google.

**ng2-chart:** pacote que fornece diretivas para criar gráficos com o Chart.js.

**date-fns:** biblioteca de utilitários para manipulação de datas em JavaScript.

**API do Yahoo Finance:** API para buscar dados de ações.
