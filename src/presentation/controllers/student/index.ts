import { inject, injectable } from 'tsyringe';
import {
  Controller,
  Post,
  Delete,
  Get,
  Patch,
} from '@/presentation/decorators';
import {
  BaseController,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { validatorMiddleware } from '@/presentation/middlewares';
import {
  AddStudent,
  DeleteStudent,
  ListStudents,
  GetStudent,
  UpdateStudent,
} from '@/domain/usecases/student';
import { ok } from '@/presentation/helper';
import {
  deleteSchema,
  signupSchema,
  listingSchema,
  getSchema,
  updateSchema,
} from './schemas';

@injectable()
@Controller('/student')
export class StudentController extends BaseController {
  constructor(
    @inject('AddStudent')
    private addStudent: AddStudent,
    @inject('DeleteStudent')
    private deleteStudent: DeleteStudent,
    @inject('ListStudents')
    private listStudents: ListStudents,
    @inject('GetStudent')
    private getStudent: GetStudent,
    @inject('UpdateStudent')
    private updateStudent: UpdateStudent
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

  @Get('/listing', [validatorMiddleware(listingSchema)])
  async listingStudents(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.listStudents.list(req.body);

    return ok(response);
  }

  @Get('/get', [validatorMiddleware(getSchema)])
  async gettingStudent(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.getStudent.get(req.body);

    return ok(response);
  }

  @Patch('/update', [validatorMiddleware(updateSchema)])
  async patchStudent(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.updateStudent.update(req.body);

    return ok(response);
  }
}
