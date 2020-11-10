import { Router } from 'express';

import CreateCategoryService  from '../services/CreateCategoryService';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  // TODO
});

categoriesRouter.post('/', async (request, response) => {
  const title = request.body.title;
  const service = new CreateCategoryService();
  const category = await service.execute({title});
  return response.json(category)
});

categoriesRouter.delete('/:id', async (request, response) => {

});

categoriesRouter.post('/import', async (request, response) => {
  // TODO
});

export default categoriesRouter;
