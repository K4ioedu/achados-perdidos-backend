# 🔍 Achados e Perdidos - UFC (Campus Russas)

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Plataforma centralizada para gestão, reporte e recuperação de objetos perdidos na Universidade Federal do Ceará. O projeto visa substituir os grupos de mensagens informais por um sistema seguro, visual e organizado.

## 📸 Visão Geral

O sistema resolve o problema da descentralização de informações sobre itens perdidos no campus. Através de uma interface moderna e responsiva, alunos podem reportar itens encontrados (com fotos) ou buscar pertences perdidos.

> 🔒 **Segurança:** O sistema conta com validação que restringe o cadastro apenas a usuários com e-mail institucional (`@alu.ufc.br` ou `@ufc.br`).

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido seguindo a arquitetura **SPA (Single Page Application)**, separando o Front-end do Back-end.

### 🧠 Back-End (API REST)
* **Java 21:** Linguagem base, utilizando recursos modernos da versão LTS.
* **Spring Boot 3:** Framework principal para criação da API.
* **Spring Data JPA:** Camada de persistência de dados.
* **Spring Security:** Configuração de CORS e segurança das rotas.
* **PostgreSQL:** Banco de dados relacional (Armazenamento de dados e imagens via BLOB).
* **Maven:** Gerenciamento de dependências.
* **Render:** Hospedagem em nuvem (Deploy).

### 🎨 Front-End (Interface)
* **React.js:** Biblioteca para construção da interface do usuário.
* **Vite:** Ferramenta de build de alta performance.
* **Tailwind CSS:** Framework de estilização utilitária e responsiva.
* **Axios:** Cliente HTTP para integração com a API.
* **Lucide React:** Biblioteca de ícones.

---

## ⚙️ Funcionalidades

1.  **Cadastro e Login Institucional**
    * Validação automática de domínio de e-mail universitário para garantir segurança.
2.  **Reportar Item (Achado ou Perdido)**
    * Upload de imagem do item (armazenado diretamente no banco de dados).
    * Categorização (Eletrônicos, Documentos, Vestuário, etc.).
    * Definição de local (Bloco, Sala, Área Comum).
3.  **Feed de Itens**
    * Listagem visual com cards interativos.
    * Indicadores de status (Perdido, Achado, Devolvido).
4.  **Devolução**
    * Fluxo funcional para marcar um item como "Recuperado/Devolvido", encerrando o ciclo.

---

## 🔧 Como Executar o Projeto Localmente

### Pré-requisitos
* Java JDK 21 instalado.
* Node.js e NPM instalados.
* PostgreSQL (Local ou Nuvem).

### 1. Back-End (API)

```bash
# Clone o repositório
git clone [https://github.com/K4ioedu/achados-perdidos-backend.git](https://github.com/K4ioedu/achados-perdidos-backend.git)

# Acesse a pasta do projeto
cd achados-perdidos-backend

# Instale as dependências e inicie a aplicação
mvn spring-boot:run
A API estará rodando em: http://localhost:8080

2. Front-End (Web)
Bash

# Abra um novo terminal e acesse a pasta do frontend
cd frontend

# Instale as dependências do projeto
npm install

# Inicie o servidor de desenvolvimento
npm run dev
O Front-end estará rodando em: http://localhost:5173 (ou porta similar)

👥 Autores
Trabalho desenvolvido para a disciplina de Desenvolvimento de Software para Web - Ciência da Computação (UFC).

Gustavo Ítalo Teixeira Marques
Kaio Eduardo Fontenele Gomes
Diego Cavalcante Diniz Maia
Vitor Manoel Silva de Oliveira
Kelve Monteiro Cartaxo

📄 Licença
Este projeto é de cunho educacional.
