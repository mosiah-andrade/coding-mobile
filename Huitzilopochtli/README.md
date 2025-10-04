# Huitzilopochtli - Aztec Bird Finder

![Ícone do Projeto](public/huitzilopochtli.ico)

Bem-vindo ao repositório do **Huitzilopochtli**, uma aplicação web moderna desenvolvida para explorar a avifauna local. Utilizando a geolocalização do navegador, a aplicação consulta a API do iNaturalist para buscar e exibir observações de pássaros recentes na região do usuário.

## O Nome Huitzilopochtli (Beija-flor da Esquerda)

O nome do projeto, **Huitzilopochtli**, é uma referência ao deus asteca do sol e da guerra. Na mitologia asteca, Huitzilopochtli era uma das divindades mais importantes, e seu nome pode ser traduzido como "Beija-flor do Sul" ou "Beija-flor Canhoto".

Guerreiros astecas acreditavam que, ao morrer em batalha, eles reencarnariam como beija-flores, podendo assim voar ao redor de Huitzilopochtli no paraíso. A escolha do nome para este projeto é uma homenagem a essa conexão cultural e simbólica entre a divindade e os pássaros, mais especificamente os beija-flores, que são parte da rica avifauna que a aplicação ajuda a descobrir.

## ✨ Funcionalidades Principais

* **Detecção de Localização:** Utiliza a API de Geolocalização do navegador para identificar a localização do usuário com permissão.
* **Busca de Avifauna:** Conecta-se à API pública do iNaturalist para buscar observações de pássaros (`Aves`) em um raio de 200km.
* **Nomes em Português:** A busca é configurada para priorizar nomes de espécies populares no Brasil (`locale=pt-BR`).
* **Exibição em Cards Detalhados:** Mostra os resultados em cards, contendo:
    * Foto da ave.
    * Nome popular e científico.
    * Local, data e hora do avistamento.
    * Nome do observador e atribuição da foto.
    * Link para a página da espécie na Wikipédia.
* **Componentização:** O código é estruturado em componentes React reutilizáveis para melhor manutenibilidade.

## 🚀 Tecnologias Utilizadas

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**

## 🏃 Como Executar

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/mosiah-andrade/coding-mobile.git](https://github.com/mosiah-andrade/coding-mobile.git)
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd coding-mobile/Huitzilopochtli
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.