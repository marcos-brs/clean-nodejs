import { BadRequest, Unauthorized } from '@/shared/errors';

export class EmailAlreadyRegistered extends BadRequest {
  constructor() {
    super(
      'EMAIL_ALREADY_REGISTERED',
      'This email is already registered in another account'
    );
  }
}

export class RoleAlreadyRegistered extends BadRequest {
  constructor() {
    super('ROLE_ALREADY_REGISTERED', 'This role is already registered');
  }
}

export class AccountNotFound extends BadRequest {
  constructor() {
    super('ACCOUNT_NOT_FOUND', 'This account was not found');
  }
}

export class RoleNotFound extends BadRequest {
  constructor() {
    super('ROLE_NOT_FOUND', 'This role was not found');
  }
}

export class InvalidPassword extends Unauthorized {
  constructor() {
    super('INVALID_PASSWORD', 'The password is incorrect');
  }
}
