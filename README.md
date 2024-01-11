# Projeto Login Completo React Com Dashboard

- Projeto criado para estudo e em progresso.
- Página de login completa (cadastrar, recuperar senha e login).
- Dashboard pronto

## Tecnologias Utilizadas

Todas as tecnologias utilizadas:

- [React](https://reactjs.org/)
- [Material](https://material-ui.com/)
- [Tailwind](https://tailwindcss.com/)
- [AtomicDesign](https://atomicdesign.bradfrost.com/)
- [NextJS](https://nextjs.org/)

## Estrutura do Projeto

- components -> contendo duas pastas AtomicDesign e Commons
- context -> utilizando o contexto do React 
- hooks -> preparado para o estilo dark do tailwind (não implementado) e localStorage
- model -> refletir os DTOs do backend.
- services -> unificar todos os serviços chamados.
- styles -> estilos globais e do material
- .env e .env.local -> arquivo para utilizar as variáveis

## Como Utilizar

Código aberto para qualquer pessoa clonar e utilizar como base em seus projetos.

  - fazer o clone do projeto
  - npm install
  - e acessar localhost:3000 no browser

**Observação:** Seria interessante ter backend para realizar as chamadas e testar o fluxo da aplicação.
Você pode remover a chamada ao backend no login para fazer o bypass e acessar como se estivesse logado.

**Observação:** A ideia é ter o hamburger para reduzir o menu (aberto / fechado). A estrutura está praticamente pronta.
