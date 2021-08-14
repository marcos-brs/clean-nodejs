import { inject, injectable } from 'tsyringe';
import { Controller, Post } from '@/presentation/decorators';
import {
  BaseController,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { validatorMiddleware } from '@/presentation/middlewares';
import { AddStudent } from '@/domain/usecases/student/add-student';
import { ok } from '@/presentation/helper';
import { signupSchema } from './schemas';

@injectable()
@Controller('/student')
export class StudentController extends BaseController {
  constructor(
    @inject('AddStudent')
    private addStudent: AddStudent
  ) {
    super();
  }

  @Post('/signup', [validatorMiddleware(signupSchema)])
  async createStudent(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addStudent.add(req.body);

    return ok(response);
  }
}
