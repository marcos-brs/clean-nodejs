import { modelOptions, prop } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: {
    _id: false,
    collection: 'student',
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
  },
})
export class StudentSchema extends Base<string> {
  @prop()
  public _id: string;

  @prop()
  public ciclo: string;

  @prop()
  public state: string;

  @prop()
  public school: string;

  @prop()
  public created_at: Date;

  @prop()
  public updated_at: Date;

  @prop()
  public deleted_at: Date | null;
}
