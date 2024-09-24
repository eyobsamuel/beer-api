const Beer = require("../models/Beer");
const Sequelize = require("sequelize");

exports.createBeer = async (req, res) => {
  const { name, type, rating } = req.body;

  let averageRating = 0;
  let ratingCount = 0;

  if (rating !== undefined) {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        isSuccess: false,
        status: "Error",
        statusCode: 400,
        msg: "Invalid rating provided.",
        errorCode: "ERR_INVALID_RATING",
        data: null,
      });
    }
    averageRating = rating;
    ratingCount = 1;
  }

  try {
    const newBeer = await Beer.create({
      name,
      type,
      averageRating,
      ratingCount,
    });

    res.status(201).json({
      isSuccess: true,
      status: "OK",
      statusCode: 201,
      msg: "Beer created successfully.",
      errorCode: null,
      data: newBeer.toJSON(),
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        isSuccess: false,
        status: "Error",
        statusCode: 400,
        msg: "Duplicate beer name.",
        errorCode: "ERR_DUPLICATE_BEER_NAME",
        data: null,
      });
    }
    res.status(500).json({
      isSuccess: false,
      status: "Error",
      statusCode: 500,
      msg: "Error creating beer.",
      errorCode: "ERR_CREATE_BEER",
      data: null,
    });
  }
};

exports.listBeers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Beer.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      isSuccess: true,
      status: "OK",
      statusCode: 200,
      msg: "Beers retrieved successfully.",
      errorCode: null,
      data: {
        beers: rows.map((beer) => beer.toJSON()),
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      status: "Error",
      statusCode: 500,
      msg: "Error retrieving beers.",
      errorCode: "ERR_LIST_BEERS",
      data: null,
    });
  }
};

exports.searchBeer = async (req, res) => {
  const query = req.params.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Beer.findAndCountAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${query}%`,
        },
      },
      limit,
      offset,
    });

    res.status(200).json({
      isSuccess: true,
      status: "OK",
      statusCode: 200,
      msg: "Beers matching the query retrieved successfully.",
      errorCode: null,
      data: {
        beers: rows.map((beer) => beer.toJSON()),
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      status: "Error",
      statusCode: 500,
      msg: "Error searching for beers.",
      errorCode: "ERR_SEARCH_BEERS",
      data: null,
    });
  }
};

exports.updateRating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({
      isSuccess: false,
      status: "Error",
      statusCode: 400,
      msg: "Invalid rating provided.",
      errorCode: "ERR_INVALID_RATING",
      data: null,
    });
  }

  const beer = await Beer.findByPk(id);
  if (!beer) {
    return res.status(404).json({
      isSuccess: false,
      status: "Error",
      statusCode: 404,
      msg: "Beer not found.",
      errorCode: "ERR_BEER_NOT_FOUND",
      data: null,
    });
  }

  const currentRatingSum = beer.averageRating * beer.ratingCount;
  const newRatingSum = currentRatingSum + rating;
  beer.ratingCount += 1;
  beer.averageRating = newRatingSum / beer.ratingCount;

  await beer.save();

  res.json({
    isSuccess: true,
    status: "OK",
    statusCode: 200,
    msg: "Beer rating updated successfully.",
    errorCode: null,
    data: {
      ...beer.toJSON(),
      averageRating: beer.averageRating,
    },
  });
};
