Este projeto foi desenvolvido em React Native e utiliza o Expo CLI para facilitar o desenvolvimento e a execução em dispositivos móveis.

Pré-requisitos:

    Node.js e npm (ou yarn): Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina. Você pode baixá-los em:
        Node.js: https://nodejs.org/
        npm: https://www.npmjs.com/
        yarn: https://yarnpkg.com/
    Expo CLI: Instale o Expo CLI globalmente:

**npm install expo-cli --global**

ou

**yarn global add expo-cli**

    Android Studio ou Xcode: Se você quiser executar o aplicativo em um emulador ou simulador, instale o Android Studio (para Android) ou o Xcode (para iOS).

Passos para rodar o projeto:

    Clonar o repositório:

**git clone https://github.com/RodrigoGottschall/educationalApp**

    Instalar as dependências:

**cd seu-repositorio**
**npm install**

ou

**cd seu-repositorio**
**yarn install**

    Iniciar o Expo CLI:

**npx expo start**

ou

**yarn start**

    Executar no dispositivo ou emulador:

    Dispositivo físico:
        Instale o aplicativo Expo Go em seu dispositivo Android ou iOS.
        Leia o QR code exibido no terminal ou no navegador com o aplicativo Expo Go.
    Emulador/Simulador:
        Abra o Android Studio ou Xcode e inicie um emulador/simulador.
        Pressione a (para Android) ou i (para iOS) no terminal para abrir o aplicativo no emulador/simulador.

Outras informações:

    Dependências: Este projeto utiliza as seguintes bibliotecas:
        react-native-vector-icons
        react-native-modalize
        @react-native-async-storage/async-storage
        react-native-material-menu

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

    Certifique-se de ter as ferramentas e dependências necessárias instaladas antes de executar o projeto.
    Se você encontrar algum problema, verifique o console do Expo CLI para obter mais informações.

Esperamos que este README.txt seja útil para você executar o projeto InnovateTech Students!
