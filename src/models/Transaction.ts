import Category from "./Category";

class Transaction {
  id: string;

  title: string;

  type: 'income' | 'outcome';

  value: number;

  category_id: string;

  category: Category;

  created_at: Date;

  updated_at: Date;
}

export default Transaction;
