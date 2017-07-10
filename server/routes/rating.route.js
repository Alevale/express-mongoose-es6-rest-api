import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import ratingCtrl from '../controllers/rating.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/ratings - Get list of ratings */
  .get(ratingCtrl.list)

  /** POST /api/ratings - Create new rating */
  .post(validate(paramValidation.createRating), ratingCtrl.create);

router.route('/:ratingId')
  /** GET /api/ratings/:ratingId - Get rating */
  .get(ratingCtrl.get)

  /** PUT /api/ratings/:ratingId - Update rating */
  .put(validate(paramValidation.updateRating), ratingCtrl.update)

  /** DELETE /api/ratings/:ratingId - Delete rating */
  .delete(ratingCtrl.remove);

/** Load rating when API with ratingId route parameter is hit */
router.param('ratingId', ratingCtrl.load);

export default router;
