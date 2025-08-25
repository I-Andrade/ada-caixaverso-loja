# Ada CaixaversoLoja

<div align="center">
  <img src="public/favicon.ico" width="64" height="64" alt="Favicon" />
</div>

Uma aplicação completa de e-commerce desenvolvida com Angular, Angular Material e Tailwind CSS. O projeto oferece funcionalidades para clientes e administradores, incluindo autenticação, gerenciamento de produtos, carrinho de compras, e interface responsiva para desktop e mobile.

---

**Desenvolvedor:** I-Andrade

## Principais Tecnologias

- **Angular 20+**: Framework principal para construção da SPA
- **Angular Material**: Componentes UI modernos e acessíveis
- **Tailwind CSS**: Estilização responsiva e utilitária
- **RxJS**: Gerenciamento reativo de dados
- **TypeScript**: Tipagem estática e robustez

## Usuários de Teste

### Administrador

- **Email:** admin@mail.com
- **Senha:** admin123
- Permissões: Gerenciar produtos, visualizar pedidos, acessar área administrativa

### Cliente

- **Email:** maria@mail.com
- **Senha:** 12345
- Permissões: Navegar, adicionar ao carrinho, comprar produtos

> Também é possível registrar um novo usuário pela tela de login/registro.

## APIs de Teste

O projeto utiliza duas APIs para simular dados reais:

- **apiUsers:** [https://api.escuelajs.co/api/v1](https://api.escuelajs.co/api/v1) — Endpoints para usuários, autenticação, registro e permissões
- **apiProducts:** [https://fakestoreapi.com](https://fakestoreapi.com) — Endpoints para produtos, categorias e carrinho

## Como Rodar Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
3. Acesse `http://localhost:4200` no navegador.

## Deploy

Acesse a versão buildada e pronta para uso em:

**[ada-caixaverso-loja.vercel.app](https://ada-caixaverso-loja.vercel.app/)**

## Funcionalidades

- Autenticação e registro de usuários
- Área administrativa para gerenciar produtos
- Carrinho de compras com atualização automática
- Layout responsivo para desktop, tablet e mobile
- Feedback de erros via snackbar
- Tooltips e navegação intuitiva
- Avatar e menu de usuário com opções de logout

## Informações Adicionais

- O projeto está organizado em módulos para facilitar manutenção
- Todos os serviços tratam erros e exibem mensagens amigáveis
- O carrinho é sincronizado com o usuário logado
- O layout se adapta automaticamente a diferentes tamanhos de tela

---

**Dúvidas ou sugestões? Abra uma issue ou contribua!**
