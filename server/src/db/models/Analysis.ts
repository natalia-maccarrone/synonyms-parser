import { Optional, UUIDV4 } from 'sequelize';
import { Table, Model, Column, PrimaryKey, IsUUID } from 'sequelize-typescript';

interface AnalysisAttributes {
  id: string;
  text: string;
  analysis: string;
}

interface AnalysisCreationAttributes
  extends Optional<AnalysisAttributes, 'id'> {}

@Table({ freezeTableName: true })
class Analysis extends Model<AnalysisAttributes, AnalysisCreationAttributes> {
  @PrimaryKey
  @IsUUID(4)
  @Column({ defaultValue: UUIDV4() })
  id!: string;

  @Column
  text!: string;

  @Column
  analysis!: string;
}

export default Analysis;
