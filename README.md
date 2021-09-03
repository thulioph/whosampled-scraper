# Who Sampled Scraper

API that gets samples information from [WhoSampled](https://www.whosampled.com) website.

> [API Demo](https://whosampled-scraper.herokuapp.com) or [Postman Collection](https://documenter.getpostman.com/view/9591924/SzYUah8C)

![demo](demo.gif)

## Requirements

In order to run this project locally, you must have:

- [Nodejs@12.14.0](https://nodejs.org/dist/v12.14.0/)
- [Nestjs CLI](https://nestjs.com/)

## Usage

To install all dependencies, run:

```bash
$ npm install
```

### development

To start the **development** mode, run:

```bash
$ npm run start:dev
```

### production

To generate a **production** version, run:

```bash
$ npm run build
```

To **serve a production** version, run:

```bash
$ npm run start:prod
```


## Routes

So far, we have available **two** different routes, one to get artist information and another to get artist information on another page.

### artist

In order to get information from a **specific artist**, hit: `https://whosampled-scraper.herokuapp.com/artist/2pac/`.

### page

In order to get information from a **specific artist on another page**, hit: `https://whosampled-scraper.herokuapp.com/artist/2pac/2/`

## License

[MIT License](https://thulioph.mit-license.org/) © Thulio Philipe