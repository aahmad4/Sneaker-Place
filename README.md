# StockX Clone  
  
This is a personal project I created as a platform for my friends, family, and peers at school to have a custom platform to buy, sell, and trade sneakers. The app allows users to register accounts, login, and post shoes for others to browse and buy. I also used The Sneaker Database API to fetch a list of upcoming sneaker releases and showing them on a designated page.   

The app is currently deployed to heroku, you can check it out here: https://xtocks.herokuapp.com/  

## Screenshots Of Core Pages 
 
Screenshots Coming Soon 

## Features 

* Authentication:
  * User login with username and password
  * Admin sign-up with admin code

* Authorization:
  * One cannot manage posts and view user profile without being authenticated
  * One cannot edit or delete posts and comments created by other users
  * Admin can manage all posts and comments

* Manage shoe posts with basic functionalities:
  * Create, edit and delete posts and comments
  * Upload shoe photos  
  * Search existing campgrounds

* Manage user account with basic functionalities:
  * Profile page setup with sign-up

* Flash messages responding to users' interaction with the app

* Responsive web design

## Built With

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](http://mongoosejs.com/)
* [Async](http://caolan.github.io/async/)
* [Crypto](https://nodejs.org/api/crypto.html#crypto_crypto)
* [Helmet](https://helmetjs.github.io/)
* [Passport](http://www.passportjs.org/)
* [Passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [Express-session](https://github.com/expressjs/session#express-session)
* [Method-override](https://github.com/expressjs/method-override#method-override)
* [Nodemailer](https://nodemailer.com/about/)
* [Moment](https://momentjs.com/)
* [Cloudinary](https://cloudinary.com/)
* [Geocoder](https://github.com/wyattdanger/geocoder#geocoder)
* [Connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)
* [Ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

## Clone

```sh
git clone https://github.com/aahmad4/StockX-Clone
```

## Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install the required packages.

```sh
npm install
```

or

```sh
yarn install
```

## Usage

```sh
node app.js
```

Then go to

```sh
localhost:8000
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
