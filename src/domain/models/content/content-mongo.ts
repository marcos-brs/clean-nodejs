import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: {
    _id: false,
    collection: 'content',
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
  },
})
export class ContentSchema extends Base<string> {
  @prop()
  public _id: string;

  @prop()
  public title: string;

  @prop()
  public description: string;

  @prop()
  public owner_id: string;

  @prop()
  public destination_url: string;

  @prop()
  public posted_at: Date;

  @prop()
  public created_at: Date;

  @prop()
  public updated_at: Date;

  @prop()
  public deleted_at: Date | null;
}
