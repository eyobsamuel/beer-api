const express = require("express");
const router = express.Router();
const beerController = require("../controllers/beerController");

/**
 * @swagger
 * tags:
 *   name: Beers
 *   description: Beer management
 */

/**
 * @swagger
 * /api/beers:
 *   post:
 *     summary: Create a beer
 *     tags: [Beers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Beer created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 errorCode:
 *                   type: string
 *                   nullable: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                     averageRating:
 *                       type: number
 *                       format: float
 *                     ratingCount:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */
router.post("/", beerController.createBeer);

/**
 * @swagger
 * /api/beers:
 *   get:
 *     summary: List all beers
 *     tags: [Beers]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of beers per page
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of beers with pagination details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 errorCode:
 *                   type: string
 *                   nullable: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     beers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           type:
 *                             type: string
 *                           averageRating:
 *                             type: number
 *                             format: float
 *                           ratingCount:
 *                             type: integer
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 */
router.get("/", beerController.listBeers);

/**
 * @swagger
 * /api/beers/search/{query}:
 *   get:
 *     summary: Search beers by name
 *     tags: [Beers]
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         description: Name to search for
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of beers per page
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of beers matching the query with pagination details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 errorCode:
 *                   type: string
 *                   nullable: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     beers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           type:
 *                             type: string
 *                           averageRating:
 *                             type: number
 *                             format: float
 *                           ratingCount:
 *                             type: integer
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 */
router.get("/search/:query", beerController.searchBeer);

/**
 * @swagger
 * /api/beers/{id}/rating:
 *   patch:
 *     summary: Update beer rating
 *     tags: [Beers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the beer to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Updated beer with new average rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 errorCode:
 *                   type: string
 *                   nullable: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                     averageRating:
 *                       type: number
 *                       format: float
 *                     ratingCount:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Beer not found
 */
router.patch("/:id/rating", beerController.updateRating);

module.exports = router;
