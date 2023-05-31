const express = require('express');
const tourController = require('./../controllers/tourControllers');
const router = express.Router();

// noneed tyo this anymore
// router.param('id',tourController.checkId)
//                                 middleware
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourState);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addNewTour);
// .post(tourController.checkBody, tourController.addNewTour);
router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
