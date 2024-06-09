import express from 'express';
const routerApi = express.Router();
const router = express.Router();

import campus from './campus.js';
import comercio from './comercio.js';

router.use('/comercio', comercio);
router.use('/campus', campus);

routerApi.use('/api', router);
export default routerApi;