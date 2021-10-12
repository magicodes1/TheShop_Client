export default function Validate(value) {
    let error = {phone:'',address:''};

    if(value.phone == ''){
        error.phone='Please input your phone number.';
    }
    else if(value.phone.length!=10){
        error.phone='Your phone number is invalid';
    }
    else if(value.address===''){
        error.address='Please input your address';
    }
    return error;
}