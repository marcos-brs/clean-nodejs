import { inject, injectable } from 'tsyringe';
import { Controller, Post, Delete } from '@/presentation/decorators';
import {
  BaseController,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { validatorMiddleware } from '@/presentation/middlewares';
import { AddStudent } from '@/domain/usecases/student/add-student';
import { DeleteStudent } from '@/domain/usecases/student';
import { ok } from '@/presentation/helper';
import { deleteSchema, signupSchema } from './schemas';

@injectable()
@Controller('/student')
export class StudentController extends BaseController {
  constructor(
    @inject('AddStudent')
    private addStudent: AddStudent,
    @inject('DeleteStudent')
    private deleteStudent: DeleteStudent
  ) {
    super();
  }

  @Post('/signup', [validatorMiddleware(signupSchema)])
  async createStudent(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addStudent.add(req.body);

    return ok(response);
  }

  @Delete('/delete', [validatorMiddleware(deleteSchema)])
  async removeStudent(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.deleteStudent.delete(req.body);

    return ok(response);
  }
}
