import axios from "axios";

/*
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const isNumber = RegExp(/^[0-9]*$/);
const strongPassword = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const formValid = (formErrors) => {
    const formFields = {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        email: userInfo.email,
        contactNumber: userInfo.contactNumber,
        zipcode: userInfo.zipcode
    }
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


const onUserInfoChanged = e => {
    const {name, value} = e.target;
    setUserInfo(prevState => ({...prevState, [name]: value}));

    switch (name) {
        case "firstname":
            if (value.length < 2) {
                return setErrorMessage({firstname: 'You must have 2 characters or more !'});

            } else if (value.length >= 2) {
                return setErrorMessage({firstname: ''});
            }
            break;
        case "lastname":
            if (value.length < 2) {
                setErrorMessage({lastname: 'You must have 2 characters or more !'});
            } else if (value.length >= 2) {
                setErrorMessage({lastname: ''});
            }
            break;
        case "email":
            if (emailRegex.test(value) && value.length > 0) {
                setErrorMessage({email: ''})
            } else {
                setErrorMessage({email: 'Invalid email address !'});
            }
            break;
        case "contactNumber":
            if (isNumber.test(value)) {
                setErrorMessage({contactNumber: ''});
            } else {
                setErrorMessage({contactNumber: 'Only numbers allowed!'});
            }
            break;
        case "zipcode":
            if (isNumber.test(value)) {
                setErrorMessage({zipcode: ''});
            } else {
                setErrorMessage({zipcode: 'Only numbers allowed!'});
            }
            break;
        default:
            break;
    }
};*/
