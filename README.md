**Este projeto foi desenvolvido em React Native e React Native CLI.**

**Pré-requisitos:**

Node.js e npm (ou yarn): Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina. Você pode baixá-los em:
    Node.js: https://nodejs.org/
    npm: https://www.npmjs.com/
    yarn: https://yarnpkg.com/

Android Studio ou Xcode: Se você quiser executar o aplicativo em um emulador ou simulador, instale o Android Studio (para Android) ou o Xcode (para iOS).

Passos para rodar o projeto:

1. Clonar o repositório:
````git clone https://github.com/RodrigoGottschall/educationalApp````

2. Instalar as dependências:
````cd seu-repositorio````
````npm install````
ou
````cd seu-repositorio````
````yarn install````

3. Executar o projeto:
- Android:
````npx react-native run-android````
ou
````yarn android````

- iOS:
````npx react-native run-android````
ou
````yarn ios````


Outras informações:

Dependências: Este projeto utiliza as seguintes bibliotecas:
    react-native-vector-icons
    @react-native-async-storage/async-storage
    react-native-material-menu
    react-native-gesture-handler

Estrutura do projeto:
    App.tsx: Componente principal do aplicativo.
    components/: Pasta que contém os componentes da tela principal (HomeScreen, LoadingScreen, Footer, FilterIconButton, StudentDetailsModal).
    assets/: Pasta para armazenar imagens e outros recursos.

Recursos:
    O aplicativo busca dados de alunos da API https://randomuser.me/api/.
    Os dados da primeira página são armazenados em cache no dispositivo usando o AsyncStorage.
    O aplicativo permite buscar, filtrar e ordenar os alunos.
    Um modal exibe os detalhes do aluno quando o card é clicado.

Observações:
- Certifique-se de ter as ferramentas e dependências necessárias instaladas antes de executar o projeto.
- Se você encontrar algum problema, verifique o console do Expo CLI para obter mais informações.

Esperamos que este README.txt seja útil para você executar o projeto InnovateTech Students!
