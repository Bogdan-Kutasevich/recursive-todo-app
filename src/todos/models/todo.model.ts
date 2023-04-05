import { Model, Table, Column } from 'sequelize-typescript';

@Table({
  tableName: 'todos',
})
export class Todo extends Model {
  @Column
  title: string;

  @Column({ defaultValue: false })
  completed: boolean;

  @Column
  parentId: number;
}
