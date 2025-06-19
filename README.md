# AnimeHypez 🎌

Aplicação web para fãs de animes, permitindo explorar títulos, buscar por obras, salvar favoritos, editar perfil com avatar e bio personalizados — tudo com autenticação segura via Firebase.

## 🚀 Tecnologias Utilizadas 

- **React** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Firebase (Authentication + Firestore)**
- **React Router DOM**
- **React Hook Form** + **Zod** para validação de formulários
- **React Hot Toast** para notificações
- **React Slick** para sliders

## 🔐 Funcionalidades

- 🔑 **Cadastro e login** com autenticação via Firebase
- 🔒 **Rotas protegidas** com controle de acesso
- 🔁 **Sistema de busca** de animes
- ⭐ **Favoritar e gerenciar animes**
- ✍️ **Perfil editável** com:
  - Avatar customizável (upload ou escolha de avatar)
  - Campo de bio
- 📁 **Persistência de dados** no Firestore
- ✅ **Formulários com validação robusta** via React Hook Form + Zod
- 📦 **Context API** para estados globais (auth + dados)
- 📱 Interface 100% **responsiva** e moderna com Tailwind
- 🔔 Feedback ao usuário com React Hot Toast

## 📂 Estrutura do Projeto

- `src/contexts`: Auth e dados de animes
- `src/pages`: Home, Login, Registro, Detalhes, Perfil, Editar Perfil
- `src/components`: Sliders, formulários, botões, avatares, etc.
- `src/services`: Integração com Firebase
- `src/utils`: Funções auxiliares (ex: formatadores)
- `src/validations`: Schemas Zod para validação de dados

## 🖼️ Demonstração

> (Adicione aqui um GIF ou link para vídeo no YouTube mostrando as funcionalidades)

## 📦 Como Rodar Localmente

```bash
git clone https://github.com/leandrowork03/animehypez.git
cd animehypez
npm install
npm run dev
