import paths from './paths';
import components from './components';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Zero API',
    description: 'Essa é a documentação da API Zero API.',
    version: '1.0.0',
    contact: {
      name: 'Marcos Santana',
      email: 'brmarcossantanabr@gmail.com',
      url: 'https://www.linkedin.com/in/marcosbrs/',
    },
  },
  servers: [
    {
      url: '/zero-api/v1',
      description: 'Servidor Principal',
    },
  ],
  tags: [
    {
      name: 'Login',
      description: 'APIs relacionadas a Login',
    },
    {
      name: 'Account',
      description: 'APIs relacionadas a Conta',
    },
    {
      name: 'Role',
      description: 'APIs relacionadas a Permissão',
    },
  ],
  paths,
  schemas,
  components,
};
