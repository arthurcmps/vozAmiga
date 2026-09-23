# Voz Amiga

Aplicativo de Comunicação Alternativa e Aumentativa em Ionic, Angular e Capacitor, com seis categorias e 36 entradas de frases, síntese de voz em português, favoritos locais, autenticação e perfil no Firebase.

## O que o aplicativo faz

- Organiza frases nas categorias Alimentos, Necessidades, Sentimentos, Brincar, Pessoas e Locais.
- Reproduz as frases em português ao tocar no cartão ou acioná-lo pelo teclado.
- Permite guardar frases nos favoritos do dispositivo.
- Oferece cadastro, login, recuperação de senha e logout.
- Permite ajustar velocidade e tom da voz, além do tamanho das imagens no perfil.
- Adapta a interface a celular, tablet e desktop, com temas claro e escuro.

**Stack:** Angular 19, Ionic 8, TypeScript, Capacitor 7, Firebase Authentication, Cloud Firestore e Ionic Storage. A voz usa o plugin Capacitor Text-to-Speech, com implementação web baseada no navegador.

## Para quem está avaliando o projeto

A versão recuperada está na branch `fix/recuperacao-voz-amiga`. Enquanto o PR não for integrado, use essa branch para testar as correções. Este repositório entrega o código-fonte; não há um endereço de demonstração hospedada ou um APK publicado por esta recuperação.

Há duas formas de avaliar:

1. **Testes automatizados:** executam verificações isoladas, sem criar contas ou alterar dados reais. Siga a seção Verificações.
2. **Uso interativo:** execute o aplicativo localmente e conecte um projeto Firebase de testes sob seu controle, conforme a seção Firebase. Não há uma conta pública de demonstração nem credenciais compartilhadas no README.

## Executar no navegador

Pré-requisitos: Git, Node.js 22 LTS, npm e um navegador com suporte a síntese de voz. Para escutar as frases, o sistema deve disponibilizar uma voz em português. Para login e perfil, é necessária conexão com o Firebase configurado.

Em um terminal, baixe a versão recuperada e instale as dependências:

```sh
git clone --branch fix/recuperacao-voz-amiga https://github.com/arthurcmps/vozAmiga.git
cd vozAmiga
npm ci
npm start
```

Se você já tem uma cópia, preserve suas alterações locais antes de atualizar. Em uma cópia sem alterações pendentes:

```sh
git fetch origin
git switch fix/recuperacao-voz-amiga
git pull --ff-only
npm ci
npm start
```

Abra o endereço exibido pelo Angular. `npm run build` gera a versão de produção em `www/`. Ao hospedar essa pasta, configure o servidor para devolver `index.html` para rotas como `/perfil` e `/alimentos`.

## Firebase

O projeto usa exclusivamente os provedores modulares de Auth e Firestore. Os arquivos `src/environments/environment.ts` e `environment.prod.ts` preservam a configuração já existente. Não coloque credenciais administrativas ou chaves de conta de serviço nesses arquivos.

Para testar interativamente sem usar o banco do proprietário:

1. Crie um projeto Firebase de testes e registre um aplicativo Web.
2. Copie o objeto de configuração Web para `firebaseConfig` nos dois arquivos de environment, mantendo as demais propriedades.
3. Habilite o provedor **E-mail/senha** em Authentication.
4. Confira se `localhost` está nos domínios autorizados de Authentication; adicione-o se estiver ausente.
5. Crie o Cloud Firestore no banco padrão e configure o acesso ao documento `usuarios/{uid}` somente para o usuário autenticado com o mesmo UID.
6. Reinicie `npm start`, abra Criar conta e cadastre um e-mail de teste que você controle. A recuperação de senha precisa de acesso a essa caixa de entrada.

Exemplo mínimo de regras para **um projeto de testes novo e dedicado a este aplicativo**:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid} {
      allow read, create, update: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

Esse exemplo não substitui regras de um projeto compartilhado com outros sistemas: as demais coleções ficam sem acesso. Revise as regras existentes antes de qualquer alteração. O guard de navegação não substitui as regras do banco.

Nenhuma regra ou configuração do Firebase em produção foi alterada nesta recuperação. Confirme as regras implantadas no console antes de distribuir o aplicativo. Os testes automatizados não acessam contas nem documentos reais.

A opção existente `bloquearAutoLogin` controla somente o redirecionamento do login quando já existe sessão. Ela não encerra sessões. O logout continua sendo feito pelo botão Sair.

## Roteiro de teste manual

| Etapa | O que fazer | Resultado esperado |
| --- | --- | --- |
| Acesso protegido | Sem sessão, abrir `/perfil` | Redirecionamento para o login |
| Cadastro e entrada | Criar uma conta de teste e entrar | Abertura das seis categorias |
| Frases e imagens | Abrir cada categoria | Seis cartões por categoria, com texto e recurso visual |
| Voz | Tocar em uma frase e depois em outra | Reprodução da frase selecionada, sem acumular pedidos antigos |
| Teclado | Navegar com Tab e ativar uma frase com Enter | Foco visível e reprodução da frase |
| Favoritos | Marcar duas frases, abrir Favoritos e recarregar | As duas continuam salvas no mesmo navegador/dispositivo |
| Remoção | Remover uma frase e adicionar outra | A frase removida não reaparece |
| Preferências | Alterar voz e tamanho no perfil e salvar | Mudança aplicada às categorias e aos favoritos |
| Recuperação | Sair e solicitar redefinição de senha | Instruções enviadas ao e-mail da conta de teste |
| Logout | Sair e tentar abrir uma rota protegida | Retorno ao login; favoritos locais preservados |
| Layout | Testar em tela estreita, tema escuro e zoom | Conteúdo legível e controles acessíveis por rolagem |

Favoritos dependem dos dados do navegador. Limpar o armazenamento do site ou usar outra janela anônima/dispositivo não recupera os favoritos de outra instalação.

## Android

Use JDK 21, Android Studio e Android SDK 35. Depois de alterar o código web, sincronize antes de abrir ou compilar o projeto nativo:

```sh
npm run android:sync
npx cap open android
```

O comando recompila o aplicativo e sincroniza os plugins e os assets. O diretório `android/app/src/main/assets/public/` é gerado e agora fica fora do Git: manter a cópia antiga versionada permitia compilar um aplicativo desatualizado mesmo após corrigir o código-fonte.

No Android Studio, aguarde a sincronização do Gradle, selecione um emulador ou um celular com depuração USB habilitada e execute o módulo `app`. Instale/ative uma voz pt-BR nas configurações de síntese de fala do aparelho e repita o roteiro acima. A primeira preparação pode baixar componentes do SDK e dependências do Gradle.

Os plugins Capacitor Android e Core foram alinhados à versão 7.4.3. A sincronização foi validada, mas APK/AAB e síntese de voz no dispositivo precisam ser verificados em ambiente Android com SDK/JDK adequados.

## Favoritos e preferências

- Favoritos permanecem **locais no dispositivo**, na chave original `favoritos`. Não são sincronizados pelo Firebase nem separados por conta; isso preserva o comportamento e os dados existentes. Sair da conta não os apaga.
- Todas as telas usam o mesmo serviço. As gravações são serializadas e a lista só muda após persistência bem-sucedida.
- Referências antigas às 20 imagens ausentes são normalizadas para os novos SVG ao carregar os favoritos, sem alterar o texto.
- Velocidade, tom de voz e tamanho das imagens são usados em todas as categorias e nos favoritos. O perfil atualiza a configuração compartilhada após salvar; mudanças no documento também são observadas em tempo real.
- Sem acesso às preferências, o aplicativo informa a falha e mantém os padrões ou a configuração já carregada na sessão.

## Recursos visuais

As 36 frases foram preservadas. Os 20 PNG que não existiam foram substituídos por símbolos SVG do Ionicons, já utilizado pelo projeto. Eles são recursos visuais de apoio acompanhados de texto, não reconstruções das imagens originais nem um conjunto de pictogramas clinicamente validado. Alguns símbolos são genéricos (por exemplo, leite e expressões sociais); valide sua compreensão com o público do app e substitua por pictogramas específicos se necessário.

A licença MIT dos SVG está em `src/assets/icon/LICENCA-ICONES.txt`. A origem/licença dos PNG e da logo preexistentes deve ser confirmada pelo proprietário antes de distribuição; esses arquivos foram preservados.

## Verificações

```sh
npm run check:assets
npm run lint
npm run test:ci
npm run build
```

Os testes usam Chrome/Chromium. Se necessário, indique o executável pela variável `CHROME_BIN`. Para contêineres executados como root, o launcher específico `ChromeHeadlessCI` está disponível:

```sh
npm test -- --watch=false --browsers=ChromeHeadlessCI
```

Existe também `scripts/browser-smoke.cjs`, teste opcional com Playwright. Para executá-lo em uma cópia de testes, sem alterar os arquivos de dependências versionados:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
npm run build
node scripts/browser-smoke.cjs
```

Uma execução posterior de `npm ci` restaura a instalação definida pelo lockfile. O script serve `www/` localmente na porta 4200 e intercepta os serviços externos; login, Firebase e voz são simulados. `CHROME_BIN` permite usar um Chromium já instalado. Não mede a disponibilidade do Firebase real nem a qualidade de áudio de um aparelho.

A rotina `.github/workflows/ci.yml` executa verificação de assets, lint, testes e build no GitHub. Ela não publica o app nem modifica o Firebase.

Veja `RECUPERACAO.md` para o resumo das alterações e limitações da validação.

## Estrutura principal

```text
src/app/home/          Login
src/app/pages/         Categorias, favoritos, cadastro, recuperação e perfil
src/app/services/      Favoritos, preferências, voz e mensagens de erro
src/app/shared/        Comportamento compartilhado das frases e migração de ícones
src/app/guards/        Proteção de rotas
src/assets/           Logo, imagens e ícones
src/theme/            Paleta e estilos compartilhados
src/environments/     Configuração Firebase de desenvolvimento/produção
android/              Projeto nativo Capacitor
scripts/              Verificação de assets e teste de navegador
```

## Solução de problemas

| Situação | O que conferir |
| --- | --- |
| `npm ci` falha | Usar Node 22 e executar dentro da pasta que contém `package.json`; preservar o lockfile |
| Login/cadastro falha | Configuração do Firebase, provedor E-mail/senha, conexão e mensagem exibida na tela |
| Perfil não carrega/salva | Banco Firestore criado, sessão válida e regras para `usuarios/{uid}` |
| Conta criada, mas perfil falhou | Usar Tentar salvar perfil; a conta já existe, então não é necessário cadastrá-la novamente |
| Não sai som | Volume, suporte do navegador, voz pt-BR instalada e mensagem de erro; testar após interação com o botão |
| Android abre uma versão antiga | Executar `npm run android:sync` antes de recompilar no Android Studio |
| Testes não encontram Chrome | Instalar Chrome/Chromium ou definir `CHROME_BIN` com o caminho do executável |
| Porta ocupada | Encerrar o processo que usa a porta ou usar `npm start -- --port 4201` |

## Estado da recuperação

Build de produção, lint, 26 testes automatizados, referências de assets e navegação simulada foram validados. A verificação do Firebase real, a compilação de APK/AAB e o teste de áudio em aparelho Android ainda dependem do ambiente do proprietário. Não foi publicado um site, um APK ou uma atualização em loja.
