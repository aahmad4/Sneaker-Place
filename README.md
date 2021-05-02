<h1 align="center">StockX Clone</h1>

<p align="center">
This is a personal project I created as a platform for my friends, family, and peers at school to have a custom platform to buy, sell, and trade sneakers. The app allows users to register accounts, login, and post shoes for others to browse and buy. I also used The Sneaker Database API to fetch a list of upcoming sneaker releases and showing them on a designated page.   
</p>

<p align="center">
A link to an online demo version can be found here: <a href="https://xtocks.herokuapp.com" target="_blank">xtocks.herokuapp.com</a>
</p>

## Summary

- [Getting Started](#getting-started)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Setup

A step by step series of examples that tell you how to get a development env running.

#### Clone

```sh
$ git clone https://github.com/aahmad4/StockX-Clone
```

#### Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install the required packages.

```sh
$ npm install
```

or

```sh
$ yarn install
```

#### Usage

For development purposes I would recommend this setting as it will run the app with nodemon constantly watching your server for new changes.

```
$ npm run dev
```

#### Implementation

In the root directory create a file named `.env` with the following enviornment variables. `DATABASEURL` is the MongoDB Uri. `RAPIDAPIKEY` is the API key used with The Sneaker Database API hosted on RapidAPI. Lastly, `PRIVATEKEY` is the private API key used for Stripe payments.

```
DATABASEURL =
RAPIDAPIKEY =
PRIVATEKEY =
```

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime engine
- [Express](https://expressjs.com/) - Back-end web application framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Passport](http://www.passportjs.org/) - Unobtrusive authentication for Node.js
- [Ejs](http://ejs.co/) - Embedded JavaScript templates
- [The Sneaker Database API](https://thesneakerdatabase.com/api/) - Helpful third-party API for latest sneaker releases
- [Stripe](https://stripe.com/) - Online payment service
- [Heroku](https://www.heroku.com/) - Online cloud platform

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
