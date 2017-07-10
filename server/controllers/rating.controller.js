import Rating from '../models/rating.model';

/**
 * Load rating and append to req.
 */
function load(req, res, next, id) {
  Rating.get(id)
    .then((rating) => {
      req.rating = rating; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get rating
 * @returns {Rating}
 */
function get(req, res) {
  return res.json(req.rating);
}

/**
 * Create new rating
 * @property {string} req.body.ratingname - The ratingname of rating.
 * @property {string} req.body.mobileNumber - The mobileNumber of rating.
 * @returns {Rating}
 */
function create(req, res, next) {
  const rating = new Rating({
    feedback: {
      rating: req.body.feedback.rating,
      text: req.body.feedback.text
    },
    settings: {
      activeProject: req.body.settings.activeProject,
      maxSentenceCount: req.body.settings.maxSentenceCount,
    },
    data: {
      query: req.body.data.query,
      summary: req.body.data.summary,
      links: req.body.data.links,
    },
    algorithmAndTime: req.body.algorithmAndTime,
    algorithm: req.body.algorithm,
    time: req.body.time
  });

  rating.save()
    .then(savedRating => res.json(savedRating))
    .catch(e => next(e));
}

/**
 * Update existing rating
 * @property {string} req.body.ratingname - The ratingname of rating.
 * @property {string} req.body.mobileNumber - The mobileNumber of rating.
 * @returns {Rating}
 */
function update(req, res, next) {
  const rating = req.rating;
  Object.assign(rating, req.body);

  rating.save()
    .then(savedRating => res.json(savedRating))
    .catch(e => next(e));
}

/**
 * Get rating list.
 * @property {number} req.query.skip - Number of ratings to be skipped.
 * @property {number} req.query.limit - Limit number of ratings to be returned.
 * @returns {Rating[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Rating.list({ limit, skip })
    .then(ratings => res.json(ratings))
    .catch(e => next(e));
}

/**
 * Delete rating.
 * @returns {Rating}
 */
function remove(req, res, next) {
  const rating = req.rating;
  rating.remove()
    .then(deletedRating => res.json(deletedRating))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
