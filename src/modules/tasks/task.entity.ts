import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from '../categories/category.entity';

@Table({ tableName: 'tasks', timestamps: true })
export class Task extends Model<Task> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Default('pending')
  @Column(DataType.ENUM('pending', 'in_progress', 'completed'))
  status: 'pending' | 'in_progress' | 'completed';

  @AllowNull(true)
  @Column(DataType.DATE)
  dueDate?: Date;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
