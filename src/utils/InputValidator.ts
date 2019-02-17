import Validator from 'validator';
import IUserLogin from '../interfaces/IUserLogin';
import IUserRegister from '../interfaces/IUserRegister';

class ValidateInput {
    public register(data: IUserRegister) {
        // tslint:disable-next-line
        let errors: any = {};
        if (Validator.isEmpty(data.firstName)) {
            errors.firstNameEmpty = 'First name is required.';
        }
        if (Validator.isEmpty(data.lastName)) {
            errors.lastNameEmpty = 'Last name is required.';
        }
        if (Validator.isEmpty(data.email)) {
            errors.emailEmpty = 'Email address is required.';
        }
        if (!Validator.isEmail(data.email)) {
            errors.emailInvalid = 'Please provide a valid email address.';
        }
        if (Validator.isEmpty(data.password)) {
            errors.passwordEmpty = 'A password is required.';
        }
        if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
            errors.passwordLength = 'Your password should be between 8 and 32 characters long.';
        }
        if (Reflect.ownKeys(errors).length > 0) {
            return errors;
        } else {
            return true;
        }
    }
    public login(data: IUserLogin) {
        // tslint:disable-next-line
        let errors: any = {};
        if (Validator.isEmpty(data.email)) {
            errors.emailEmpty = 'Email address is required.';
        }
        if (!Validator.isEmail(data.email)) {
            errors.emailInvalid = 'Please provide a valid email address.';
        }
        if (Validator.isEmpty(data.password)) {
            errors.passwordEmpty = 'A password is required.';
        }
        if (Reflect.ownKeys(errors).length > 0) {
            return errors;
        } else {
            return true;
        }
    }
}

// tslint:disable-next-line
const Input_Validator = new ValidateInput();

export default Input_Validator;
