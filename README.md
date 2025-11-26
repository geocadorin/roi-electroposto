# 🔌 Calculadora ROI Eletroposto

Uma aplicação web moderna para análise de investimento em estações de recarga elétrica, desenvolvida com Next.js, TypeScript e seguindo princípios de Clean Architecture.

## 🚀 Funcionalidades

- **Cálculo de ROI**: Análise completa de retorno sobre investimento
- **Projeções Financeiras**: Simulações de 10 anos com diferentes cenários
- **Análise de Viabilidade**: Indicadores como VPL, TIR e Payback
- **Visualizações Interativas**: Gráficos e tabelas para análise detalhada
- **Interface Responsiva**: Design moderno e adaptável a diferentes dispositivos

## 🛠️ Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática para maior segurança
- **Tailwind CSS**: Framework CSS utilitário
- **Shadcn/UI**: Componentes de interface modernos
- **Recharts**: Biblioteca para gráficos interativos
- **Lucide React**: Ícones modernos e consistentes

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture**:

```
src/
├── app/                    # App Router do Next.js
├── components/             # Componentes React
├── domain/
│   ├── entities/          # Entidades de domínio
│   └── usecases/          # Casos de uso
├── lib/                   # Utilitários
└── utils/                 # Funções auxiliares
```

### Camadas da Arquitetura

1. **Entities**: Regras de negócio fundamentais
2. **Use Cases**: Lógica de aplicação específica
3. **Interface Adapters**: Componentes React
4. **Frameworks**: Next.js, UI libraries

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/calculator.git
cd calculator
```

2. Instale as dependências:
```bash
npm install
```

3. Execute em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
npm start
```

### Deploy Estático (GitHub Pages)

```bash
npm run build
```

O projeto está configurado para deploy automático no GitHub Pages via GitHub Actions.

## 📊 Como Usar

1. **Configure as Estações**: Adicione suas estações de recarga com potência e preço
2. **Defina Custos Operacionais**: Configure custos de energia, manutenção, impostos, etc.
3. **Analise os Resultados**: Visualize ROI, VPL, TIR e outras métricas
4. **Explore as Projeções**: Veja gráficos e tabelas com projeções de 10 anos

## 🔧 Configuração do GitHub Pages

Para habilitar o deploy automático:

1. Vá em **Settings** > **Pages** no seu repositório
2. Selecione **GitHub Actions** como source
3. Faça push para a branch `main`
4. O deploy será executado automaticamente

## 📈 Métricas Calculadas

- **ROI**: Retorno sobre Investimento
- **VPL**: Valor Presente Líquido
- **TIR**: Taxa Interna de Retorno  
- **Payback**: Tempo de retorno do investimento
- **Projeções**: Análise de 10 anos com crescimento

## 🎨 Design System

O projeto utiliza um design system consistente com:

- **Cores**: Paleta baseada em CSS Custom Properties
- **Tipografia**: Inter font para melhor legibilidade
- **Componentes**: Reutilizáveis e acessíveis
- **Responsividade**: Mobile-first approach

## 🧪 Testes e Qualidade

- **TypeScript**: Tipagem estática
- **ESLint**: Linting de código
- **Prettier**: Formatação consistente
- **Validações**: Entidades com validação de domínio

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, abra uma [issue](https://github.com/seu-usuario/calculator/issues).

---

Desenvolvido com ❤️ para o futuro da mobilidade elétrica
