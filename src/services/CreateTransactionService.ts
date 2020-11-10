// import AppError from '../errors/AppError';

import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository'

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome' ,
  category: string
}

class CreateTransactionService {
  public async execute({title,value,type,category}:Request): Promise<Transaction> {

    const categoryRepository = getRepository(Category);
    const repository = getCustomRepository(TransactionsRepository);


    const { total } = await repository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError(' You do not have enough balance');
    }
    let checkCategoriaExists = await categoryRepository.findOne({where: { title:category },})

    if(!checkCategoriaExists){
      checkCategoriaExists = categoryRepository.create({title})
      await categoryRepository.save(checkCategoriaExists);

    }
    const transaction = await repository.create({title,value,type,category: checkCategoriaExists,  category_id: checkCategoriaExists.id})


    await repository.save(transaction)
    return transaction;
  }
}

export default CreateTransactionService;
