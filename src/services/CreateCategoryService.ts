import AppError from '../errors/AppError'
import { getRepository } from 'typeorm';
import Category from '../models/Category';
import C from '../models/Transaction';

interface Request {
  title: string
}

class CreateCategoryService {
  public async execute({title}: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const checkExists = await categoryRepository.findOne({
      where: { title },
    })

    if(checkExists){
      throw new AppError('Category address already used.');
    }

    const category = categoryRepository.create({title})

    await categoryRepository.save(category)

    return category;

  }
}

export default CreateCategoryService;
