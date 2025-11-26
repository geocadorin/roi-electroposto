# 🚀 Guia de Deploy - Calculadora ROI Eletroposto

## Deploy no GitHub Pages

### Configuração Inicial

1. **Fork ou Clone o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/calculator.git
   cd calculator
   ```

2. **Instalar Dependências**
   ```bash
   npm install
   ```

3. **Testar Localmente**
   ```bash
   npm run dev
   ```

### Configuração do GitHub Pages

1. **Acesse as Configurações do Repositório**
   - Vá para `Settings` > `Pages`

2. **Configure o Source**
   - Selecione `GitHub Actions` como source
   - Não é necessário selecionar uma branch específica

3. **Ajuste o Base Path (se necessário)**
   - Se o repositório não estiver na raiz da sua conta, ajuste o `basePath` no `next.config.js`
   - Exemplo: se o repo for `usuario.github.io/calculator`, o basePath deve ser `/calculator`

### Deploy Automático

O deploy acontece automaticamente quando você:

1. **Faz Push para Main**
   ```bash
   git add .
   git commit -m "feat: adicionar nova funcionalidade"
   git push origin main
   ```

2. **Acompanhe o Deploy**
   - Vá para a aba `Actions` no GitHub
   - Veja o progresso do workflow `Deploy to GitHub Pages`

### URLs de Acesso

Após o deploy bem-sucedido, sua aplicação estará disponível em:
- **Repositório próprio**: `https://seu-usuario.github.io/calculator/`
- **GitHub Pages personalizado**: `https://seu-dominio.com` (se configurado)

### Troubleshooting

#### Erro 404 após Deploy
- Verifique se o `basePath` no `next.config.js` está correto
- Confirme que o arquivo `.nojekyll` está na pasta `public/`

#### Build Falhando
- Verifique os logs na aba `Actions`
- Certifique-se de que não há erros de TypeScript
- Execute `npm run build` localmente para testar

#### Páginas não Carregando
- Verifique se todas as rotas estão usando caminhos relativos
- Confirme que as imagens e assets estão na pasta `public/`

### Deploy Manual (Alternativo)

Se preferir fazer deploy manual:

1. **Build da Aplicação**
   ```bash
   npm run build
   ```

2. **Upload dos Arquivos**
   - Faça upload da pasta `out/` para seu servidor
   - Configure o servidor para servir arquivos estáticos

### Configurações Avançadas

#### Custom Domain
1. Adicione um arquivo `CNAME` na pasta `public/` com seu domínio
2. Configure o DNS do seu domínio para apontar para o GitHub Pages

#### Variáveis de Ambiente
- Use apenas variáveis que começam com `NEXT_PUBLIC_`
- Configure no GitHub em `Settings` > `Secrets and variables` > `Actions`

#### Cache e Performance
- O GitHub Pages tem cache automático
- Para forçar atualização, faça um novo commit

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Linting
npm run lint

# Verificar build localmente
npm run start
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs na aba Actions
2. Consulte a documentação do Next.js
3. Abra uma issue no repositório
