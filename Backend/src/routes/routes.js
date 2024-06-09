import express from 'express';
const routerApi = express.Router();
const router = express.Router();

import campus from './campus.js';

router.use('/campus', campus);

routerApi.use('/api', router);
export default routerApi;