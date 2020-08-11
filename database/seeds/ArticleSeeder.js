"use strict";

/*
|--------------------------------------------------------------------------
| ArticleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class ArticleSeeder {
  async run() {
    const articles = await Factory.model("App/Models/Article").createMany(5);
    return articles
  }
}

module.exports = ArticleSeeder;
