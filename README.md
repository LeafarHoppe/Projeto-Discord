# Discord Overlay

Um bot Discord que captura mensagens com reações de estrela ⭐ e as exibe em tempo real em um overlay visual customizável. Perfeito para livestreams, eventos ou apresentações.

## 📋 Funcionalidades

- ⭐ **Captura de Reações**: Monitora reações de estrela em mensagens do Discord
- 🎨 **Overlay Visual**: Exibe mensagens em um overlay elegante com avatar do usuário
- 🔒 **Controle de Acesso**: Apenas usuários específicos podem disparar o bot
- ⏱️ **Exibição Temporizada**: Mensagens aparecem por 10 segundos com fade-out suave
- 🖼️ **Suporte a Imagens**: Exibe imagens anexadas às mensagens
- 📶 **Fila de Mensagens**: Processa mensagens na ordem que chegam

## 🚀 Como Usar

### Pré-requisitos

- Node.js 16.0+
- Uma conta Discord com permissão para criar bots
- Um servidor Discord para testes

### 1. Instalação

Clone o repositório e instale as dependências:

```bash
git clone <seu-repositorio>
cd projeto-discord
npm install
```

### 2. Configuração

#### Criar um Bot no Discord

1. Acesse [Discord Developer Portal](https://discord.com/developers/applications)
2. Clique em "New Application" e dê um nome
3. Vá até a seção "Bot" e clique em "Add Bot"
4. Copie o **TOKEN** (guarde com segurança!)
5. Ative as **Gateway Intents** necessárias:
   - ✅ Message Content Intent
   - ✅ Server Members Intent

#### Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e adicione seu token:
```env
DISCORD_TOKEN=seu_token_aqui
```

3. Customize os IDs de usuários permitidos no `main.js`:
```javascript
const ALLOWED_USERS = [
  "seu_id_1",  // ID do usuário 1
  "seu_id_2"   // ID do usuário 2
];
```

**Como obter seu ID Discord**: Ative "Developer Mode" nas configurações do Discord e clique com botão direito no seu usuário para copiar ID.

#### Adicionar Bot ao Servidor

1. Em Developer Portal, vá para "OAuth2 > URL Generator"
2. Selecione escopos:
   - ✅ `bot`
3. Selecione permissões:
   - ✅ `Read Messages/View Channels`
   - ✅ `Send Messages`
4. Copie a URL gerada e abra em seu navegador para adicionar o bot ao servidor

### 3. Executar

```bash
npm start
# ou diretamente
node main.js
```

O bot estará rodando e o overlay disponível em: `http://localhost:5000`

### 4. Usar no OBS/StreamLabs

Para adicionar o overlay em uma livestream:

1. **OBS Studio**:
   - Adicione uma nova source "Browser"
   - URL: `http://localhost:5000`
   - Largura: 1920 | Altura: 1080

2. **StreamLabs OBS**:
   - Custom Widget
   - URL: `http://localhost:5000`

3. **Streaming remoto**:
   - Substitua `localhost` pelo IP da máquina
   - Configure port forwarding se necessário

## 💬 Como Usar Durante Transmissão

1. No Discord, reaja com ⭐ em uma mensagem
2. A mensagem aparecerá no overlay com:
   - ✨ Avatar do usuário
   - 📝 Texto da mensagem (primeiras 3 linhas)
   - 🖼️ Imagem anexada (se houver)
3. A mensagem desaparece após 10 segundos com fade-out suave

## 🎨 Personalização

### Alterar Tempo de Exibição

Em `main.js`, modifique `DISPLAY_TIME`:
```javascript
const DISPLAY_TIME = 10000; // em milissegundos
```

### Customizar Estilo

Edite `index.html` - seção `<style>`:
- Cores (procure por `#ffd166` para cor de texto)
- Tamanho da fonte
- Posição do overlay (procure por `justify-content` e `align-items`)
- Bordas e sombras

### Adicionar/Remover Usuários

Em `main.js`, atualize o array:
```javascript
const ALLOWED_USERS = [
  "123456789",  // seu ID
  "987654321"   // ID de amigos
];
```

## 📁 Estrutura do Projeto

```
.
├── main.js          # Bot Discord e servidor Express
├── index.html       # Frontend do overlay
├── data.json        # Dados da mensagem atual (gerado automaticamente)
├── package.json     # Dependências e scripts
├── .env             # Variáveis de ambiente (não fazer commit)
├── .env.example     # Exemplo de variáveis de ambiente
├── .gitignore       # Arquivos a ignorar no Git
└── README.md        # Este arquivo
```

## 🔐 Segurança

- ⚠️ **Nunca** compartilhe seu `DISCORD_TOKEN`
- ✅ Use `.env` para variáveis sensíveis
- ✅ Configure `.gitignore` para não fazer commit de `.env`
- ⛔ Os IDs de usuários no `main.js` são públicos, mas apenas usuários nessa lista conseguem ativar o bot

## 🐛 Troubleshooting

### Bot não conecta
- Verifique se o token está correto em `.env`
- Confirme se o bot foi adicionado ao servidor
- Ative as Gateway Intents no Discord Developer Portal

### Overlay não aparece
- Verifique se o servidor Express está rodando (porta 5000)
- Tente acessar `http://localhost:5000` no navegador
- Verifique o console do navegador (F12) para erros

### Mensagens não aparecem ao reagir
- Confirme se seu ID está em `ALLOWED_USERS`
- Verifique se está reagindo com ⭐ (estrela exata)
- Veja os logs do bot para mensagens de erro

## 📦 Dependências

- **discord.js** - API para interagir com Discord
- **express** - Servidor web para o overlay
- **dotenv** - Gerenciar variáveis de ambiente

## 📝 Licença

ISC

## 👨‍💻 Autor

Desenvolvido por Leafar

---

**Dica**: Faça um fork deste projeto e compartilhe suas melhorias! 🚀
