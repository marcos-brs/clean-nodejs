<h1 align="center">Welcome to Clean NodeJS API 👋</h1>
<p>
  <a href="LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg" />
  </a>
  <a href="https://twitter.com/mbrsantana" target="_blank">
    <img alt="Twitter: mbrsantana" src="https://img.shields.io/twitter/follow/mbrsantana.svg?style=social" />
  </a>
</p>

> A simple clean NodeJS API

## If you use Docker

### Requirements

To run this aplication, you just need to have Docker installed.

- [Install Docker](https://www.docker.com/get-docker)

### Setup

To make easy to install and up the containers we are using `Makefile` to create
an alias command. After installing Docker, run the following command to prepare your environment:

```
  make install
```

### Running

When ready, you can run the application with this command:

- Local:

```
  make local
```

- Development:

```
  make dev
```

## If you don't use Docker

### Install dependencies

```
npm install
npx husky install
```

Or if you use yarn

```
yarn
yarn husky install
```

### Running

Just run

```
cp .env.sample .env
```

```
npm dev
```

Or if you use yarn

```
yarn dev
```

## Documentation

After running the code, just navigate to http://localhost:8080/api-docs/

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Marcos Santana](https://github.com/zerocoolbr).<br />
This project is [MIT](LICENSE) licensed.
