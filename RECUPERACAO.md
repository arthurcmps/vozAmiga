# Recuperação do Voz Amiga

Base revisada: `ca2e9a28189c55cb381e066d3dca3f3d12c9cc7c`, branch main. Trabalho realizado em 23/09/2026 em branch de correção independente.

## Alterações

1. Restaurados Ionic Storage e os provedores modulares de Firebase; removida a mistura de configuração compat/modular. Login, recuperação de senha e logout usam a mesma instância de Auth.
2. O guard aguarda a restauração da sessão e protege também o perfil. Removido o redirecionamento global que sobrescrevia rotas e podia interromper o cadastro.
3. Favoritos compartilham estado e armazenamento; operações esperam a inicialização, são serializadas e podem ser repetidas após falhas. Não é necessário apagar os dados antigos.
4. A reprodução de voz foi centralizada, aplica as preferências em todas as telas e cancela pedidos anteriores. Erros deixam de interromper silenciosamente a interação.
5. O perfil trata carregamento, falha e repetição, salva por merge e sincroniza as preferências. Há proteção contra aplicar respostas antigas após sair da tela ou trocar de usuário.
6. Cadastro distingue falha na criação de conta de falha ao salvar o perfil. Quando a conta já existe por uma tentativa parcial, o botão permite repetir somente o salvamento, evitando duplicar o cadastro.
7. As 36 entradas de frases foram preservadas; 20 imagens inexistentes receberam ícones SVG locais com licença MIT. Favoritos com os caminhos antigos também passam a usar os novos recursos.
8. Contraste, tema escuro, botões, foco, alvos de toque, texto alternativo, leitura de mensagens de erro e redução de movimento foram ajustados. A barra fixa global que cobria formulários foi removida.
9. As seis categorias usam layout e comportamento compartilhados. Cards de fala possuem botões nativos acessíveis por teclado, separados do botão de favoritos.
10. Testes antigos sem configuração foram corrigidos; adicionadas regressões para filas de favoritos, falhas de armazenamento, restauração de sessão, parâmetros de voz e normalização de preferências.
11. Capacitor Android alinhado com Core 7.4.3. Build web antigo deixou de ser versionado dentro do Android; `npm run android:sync` gera a cópia atual antes da compilação nativa.
12. Adicionados README, validação de assets e CI sem publicação automática.

## Validação executada

- Build Angular de produção: aprovado.
- Testes Karma/Jasmine em Chromium headless: 26 aprovados.
- Lint Angular/TypeScript/templates: aprovado.
- Referências estáticas de assets: nenhuma ausente.
- Comparação das frases com a base: todas as 36 entradas preservadas.
- Teste no navegador: login simulado, proteção do perfil sem sessão, seis categorias em 320, 768 e 1280 px, carregamento das imagens, fala simulada, operação pelo teclado, inclusão/remoção/persistência de favoritos, ausência de ressurreição de favorito removido e logout.
- Inspeção visual de telas mobile em tema claro/escuro.
- `cap sync android`: executado com os plugins do projeto.

## Limites e validação final no ambiente do proprietário

- Nenhuma conta real foi criada ou utilizada. Login, cadastro, recuperação de senha e leitura/gravação do perfil precisam de validação no Firebase real com conta de teste autorizada.
- As regras implantadas no Firestore e os domínios autorizados não foram consultados nem alterados. Confirmar isolamento de `usuarios/{uid}` no console.
- A sincronização nativa não equivale a um APK testado. O ambiente disponível possui JDK 17 e não dispõe do SDK Android configurado; o projeto requer JDK 21/SDK 35. Confirmar compilação, instalação, persistência e voz pt-BR em aparelho.
- O teste de fala confirma o código e os parâmetros; não avalia som real ou disponibilidade de voz no sistema.
- Os novos símbolos resolvem arquivos quebrados; sua adequação para Comunicação Alternativa e Aumentativa exige revisão com o público usuário.
- O aviso de otimização CommonJS do `localforage`, dependência do Ionic Storage, permanece. Não impede o build.

Não houve merge na main, publicação, alteração de regras do banco nem atualização de aplicativo em loja nesta recuperação.
