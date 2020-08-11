"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with articles
 */
const Article = use("App/Models/Article");
const { validate } = use("Validator");
const rules = {
  title: "required",
  description: "required",
};
class ArticleController {
  /**
   * Show a list of all articles.
   * GET articles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    try {
      const articles = await Article.all();
      return response.status(200).json({ message: "Success", data: articles });
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }

  /**
   * Render a form to be used for creating a new article.
   * GET articles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({ request, response }) {}

  /**
   * Create/save a new article.
   * POST articles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response
        .status(400)
        .json({ message: validation.messages()[0].message });
    }
    try {
      const article = await Article.create(request.all());
      return response.status(201).json({ message: "Success", data: article });
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }

  /**
   * Display a single article.
   * GET articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    try {
      const article = await Article.findOrFail(params.id);
      return response.status(200).json({ message: "Success", data: article });
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }

  /**
   * Render a form to update an existing article.
   * GET articles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async edit({ params, request, response }) {}

  /**
   * Update article details.
   * PUT or PATCH articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const req = request.all();
    const validation = await validate(req, rules);

    if (validation.fails()) {
      return response
        .status(400)
        .json({ message: validation.messages()[0].message });
    }
    try {
      const article = await Article.findOrFail(params.id);
      article.title = req.title;
      article.description = req.description;
      await article.save();
      return response.status(200).json({ message: "Success", data: article });
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }

  /**
   * Delete a article with id.
   * DELETE articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const article = await Article.findOrFail(params.id);
      await article.delete();
      return response.status(200).json({ message: "Success Delete" });
    } catch (error) {
      return response
        .status(400)
        .json({
          message: `Article with id ${params.id} is not found or has not been deleted`,
        });
    }
  }
}

module.exports = ArticleController;
