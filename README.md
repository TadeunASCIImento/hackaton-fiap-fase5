# Aplicação de Conteúdos - Mobile (React Native)


## Apresentação Gravada do funcinamento da aplicação
[Assista a apresentação](https://drive.google.com/file/d/1N_BlTfZhVLntb6ltIM3KyHkR8DgOCvCF/view?usp=sharing)

## Descrição
Esta aplicação mobile de postagens foi desenvolvida utilizando React Native e permite a criação, visualização, leitura e gerenciamento de conteúdos postados por professores de escolas públicas. 
Professores têm permissões de gerenciamento completo dos conteúdos, enquanto os alunos podem apenas visualizar e ler os conteúdos publicados.

### Funcionalidades
- **Alunos**:
  - Visualizam uma lista de conteúdos na página principal.
  - Podem ler um conteúdo específico ao clicar no título ou conteúdo.
  
- **Professores**:
  - Acessam uma área administrativa para gerenciar os conteúdos (login requerido).
  - Podem criar, editar, listar e excluir conteúdos.

## Requisitos
Para executar a aplicação localmente, você precisará ter o seguinte instalado:
- [Node.js](https://nodejs.org/) (versão 12 ou superior)
- [npm](https://www.npmjs.com/) para gerenciamento de pacotes

## Instalação

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/TadeunASCIImento/hackaton-fiap-fase5.git
    ```

2. **Acesse o diretório do projeto**:
    ```bash
    cd nome-do-repositorio
    ```

3. **Instale as dependências**:
    Com npm:
    ```bash
    npm install
    ```

## Executando a Aplicação

1. **Inicie o servidor de desenvolvimento**:
    Com npm:
    ```bash
    npx expo start
    ```

2. Com o emulador do Android Studio inicializado:
    ```
    Pressione a tecla A para abrir o aplicativo.
    ```


## Fluxo da Aplicação

### Visão dos Alunos:
- Os alunos acessam a página principal e veem a lista de conteúdos.
- Ao clicar em um conteúdo, eles podem visualizar o conteúdo completo.

### Visão dos Professores (Área Administrativa):
- Os professores fazem login para acessar a área administrativa.
- Na área administrativa, os professores podem:
  - Criar novos conteúdos.
  - Editar conteúdos existentes.
  - Listar todos os conteúdos criados.
  - Excluir conteúdos.

## Tecnologias Utilizadas
- **React Native**: Biblioteca JavaScript para construção da interface do usuário.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **React Router**: Gerenciamento de rotas da aplicação.
- **CSS Modules**: Estilização dos componentes.


### Scripts Disponíveis
- `npm run start`: Inicia o servidor de desenvolviment.
- `npm run android`: Abre o aplicativo no emulador Android.
- `npm run web`: Abre o aplicativo no navegador web.


## Estrutura de Pastas
```bash
├── app
│   ├── components        # Componentes da aplicação   
│   ├── index.tsx         # Componente principal
├── .gitignore            # Arquivos e pastas a serem ignorados no Git
├── package.json          # Dependências e scripts do projeto
└── README.md             # Documentação do projeto
```



# Para mais informações de configuração do projeto verifique a documentação abaixo:

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

