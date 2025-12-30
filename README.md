📝 Blogs API

Neste projeto, desenvolvi uma API completa para um sistema de gestão de conteúdo (Blog), utilizando o Sequelize como ORM para interagir com o banco de dados MySQL. A aplicação gerencia usuários, categorias e posts, garantindo que apenas usuários autenticados possam criar e editar conteúdos, aplicando os princípios de SOLID e autenticação JWT.

➤ Tecnologias Utilizadas 💻

Node.js & Express: Estrutura robusta para o servidor e gerenciamento de rotas.

Sequelize (ORM): Utilizado para mapeamento objeto-relacional, migrações e associações complexas entre tabelas.

MySQL: Banco de dados relacional para persistência de dados.

JWT (JSON Web Token): Implementação de segurança para autenticação e autorização de usuários.

Joi: Validação de esquemas de dados para garantir a integridade das informações enviadas.

➤ Principais Funcionalidades 🚀

Sistema de Autenticação: Registro de usuários e login com geração de tokens JWT protegidos.

Relações de Banco de Dados:

Usuário 1:N Posts: Um usuário pode ter vários posts.

Posts N:N Categorias: Um post pode pertencer a várias categorias e vice-versa (Tabela associativa).

CRUD de Posts: Criação, leitura, atualização e exclusão de posts de blog com validação de autoria (um usuário só edita seus próprios posts).

Busca Dinâmica: Endpoint que permite filtrar posts por termos de pesquisa no título ou conteúdo.

➤ Habilidades Desenvolvidas 🧠

Domínio de ORM: Criação de migrações, seeders e modelos para automatizar a estrutura do banco de dados.

Segurança no Back-end: Implementação de middlewares de autenticação para proteger rotas sensíveis.

Arquitetura de Software: Organização do código seguindo padrões de mercado e foco em manutenibilidade.

Consultas Complexas: Uso de Eager Loading (include) para buscar dados relacionados em uma única consulta ao banco.