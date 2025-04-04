# HabitPrime

## Descrição
HabitPrime é um aplicativo desenvolvido em React Native que permite aos usuários criarem, monitorarem e gerenciarem hábitos para melhorar sua produtividade e qualidade de vida.

## Funcionalidades
- **Cadastro e Login**: Os usuários podem se registrar e fazer login para acessar suas informações pessoais e hábitos cadastrados.
- **Adicionando Hábitos**: Crie novos hábitos com nome e descrição.
- **Edição de Hábitos**: Modifique informações sobre seus hábitos.
- **Detalhes dos Hábitos**: Visualize informações completas sobre um hábito específico.
- **Gerenciamento de Perfil**: Atualize suas informações pessoais.
- **Tela de Conquistas**: Acompanhe seu progresso com base nos hábitos cumpridos.

## Estrutura do Projeto

O projeto é estruturado da seguinte forma:

```
HabitPrime/
|-- backend/
|   |-- manage.py
|   |-- requirements.txt
|   |-- core/
|   |   |-- settings.py
|   |   |-- urls.py
|   |-- habits/
|   |   |-- models.py
|   |   |-- views.py
|   |   |-- auth_views.py
|   |   |-- serializers.py
|   |   |-- urls.py
|-- mobile/
|   |--habitpro/
|   |   |-- src/
|   |   |   |-- screens/
|   |   |   |   |-- HomeScreen.js
|   |   |   |   |-- LoginScreen.js
|   |   |   |   |-- RegisterScreen.js
|   |   |   |   |-- ProfileScreen.js
|   |   |   |   |-- EditProfileScreen.js
|   |   |   |   |-- AddHabitScreen.js
|   |   |   |   |-- UpdateHabitScreen.js
|   |   |   |   |-- HabitDetailScreen.js
|   |   |   |   |-- AchievementsScreen.js
|   |   |-- assets/
|   |   |-- App.js
|   |   |-- package.json
|-- README.md
```

## Instalação

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado globalmente
- Python 3 instalado
- Django e Django REST Framework

### Configurando o Backend
1. Acesse a pasta `backend`:
   ```sh
   cd backend
   ```
2. Crie um ambiente virtual e ative-o:
   ```sh
   python -m venv venv
   source venv/bin/activate  # No Windows, use venv\Scripts\activate
   ```
3. Instale as dependências:
   ```sh
   pip install -r requirements.txt
   ```
4. Rode as migrações e inicie o servidor:
   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

### Configurando o Frontend
1. Acesse a pasta `habitpro`:
   ```sh
   cd mobile
   ```
   cd habitpro
   ```sh
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o aplicativo:
   ```sh
   expo start
   ```

## Tecnologias Utilizadas
- **Frontend**:
  - React Native
  - Expo
  - Axios
  - React Navigation
  - AsyncStorage

- **Backend**:
  - Python
  - Django
  - Django REST Framework
  - Simple JWT para autenticação

## Como Encontrar no GitHub

Este projeto está disponível publicamente no GitHub. Você pode acessá-lo pelo seguinte link:

👉 https://github.com/FiLpoix/habitpro.git

Não esqueça de deixar uma estrela ⭐ se gostar do projeto!