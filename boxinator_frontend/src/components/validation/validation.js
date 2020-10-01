export const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
export const isNumber = RegExp(/^[0-9]*$/);
export const strongPassword = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
export const letters = /^[A-Za-z]+$/;

export const formValid = (formErrors, formFields) => {
    let valid = true;

    // validate if form errors is empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate if the form was filled out
    Object.values(formFields).forEach(val => {
        val === '' && (valid = false);
    });

    return valid;
};
let error = '';

export const validateName = value => {
    if (value.match(letters) && value.length >= 2) {
        error = '';

    } else {
        error = 'You must have at least 2 characters and only contain letters !';
    }
    return error;
}

export const validateEmail = value => {
    if (value.match(emailRegex) && value.length > 0) {
        error = '';
    } else {
        error = 'Invalid email address !';
    }
    return error;
}
export const validatePassword = value => {
    if (value.length > 6 && value.match(strongPassword)) {
        error = '';
    } else {
        error = 'Weak password !, You must have Minimum 6 characters, lowercase, uppercase and special caracter !';
    }
    return error;
}
export const validatePasswordMatch = (value, password) => {
    if (value === password) {
        error = '';
    } else {
        error = 'Password do not match !';
    }
    return error;
}
export const validateIsNumber = value => {
    if (value.match(isNumber)) {
        error = '';
    } else {
        error = 'Only numbers allowed!';
    }
    return error
}


