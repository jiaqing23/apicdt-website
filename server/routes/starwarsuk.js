import express from 'express';

import { addStarwarsData, getStarwarsData, checkUsed, updateToken} from '../controllers/starwarsuk-controller.js';

const router = express.Router();


router.post('/', addStarwarsData);

router.get('/', getStarwarsData);

router.put('/:query', updateToken);

router.get('/:query', checkUsed);

// router.get('/:query', updateToken);





export default router;

