# Aztec Bird Finder (Huitzilopochtli)

![Ícone do Projeto](public/huitzilopochtli.ico)

Bem-vindo ao repositório do **Huitzilopochtli**, uma aplicação web moderna desenvolvida para explorar a avifauna local. Utilizando a geolocalização do navegador, a aplicação consulta a API do iNaturalist para buscar e exibir observações de pássaros recentes na região do usuário.

O nome do projeto, Huitzilopochtli, é uma referência ao deus asteca do sol e da guerra, que frequentemente era associado a beija-flores.

Este repositório também contém uma atividade bônus (`atv1`), um simples buscador de informações sobre países.

## ✨ Funcionalidades Principais

* **Detecção de Localização:** Utiliza a API de Geolocalização do navegador para identificar la localização do usuário com permissão.
* **Busca de Avifauna:** Conecta-se à API pública do iNaturalist para buscar observações de pássaros (`Aves`) em um raio de 200km.
* **Nomes em Português:** A busca é configurada para priorizar nomes de espécies populares no Brasil (`locale=pt-BR`).
* **Exibição em Cards Detalhados:** Mostra os resultados em cards, contendo:
    * Foto da ave.
    * Nome popular e científico.
    * Local, data e hora do avistamento.
    * Nome do observador e atribuição da foto.
    * Link para a página da espécie na Wikipédia.
* **Componentização:** O código é estruturado em componentes React reutilizáveis para melhor manutenibilidade.

## 🗺️ Atividade Bônus: Volta Ao Mundo

Dentro