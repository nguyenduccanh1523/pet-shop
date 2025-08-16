import express from 'express';
import * as AdsController from '../../controllers/page/ads.js';

const router = express.Router();


router.get('/', AdsController.getAllAds);

router.post('/', AdsController.createAds);

router.put('/:id', AdsController.updateAds);

router.delete('/:id', AdsController.deleteAds);

export default router;
