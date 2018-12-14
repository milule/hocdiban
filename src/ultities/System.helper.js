export default class SystemHelper {
  checkValidaRegister(e) {
    let error = false;
    let errMess = '';
    const dob = new Date(e.target.dob.value).toDateString()
    console.log(dob)
    if (error === false && !this.checkNumAndChar(e.target.username.value)) {
      error = true;
      errMess = '"Tài khoản" không được trống hoặc chứa kí tự đặc biệt';
    }
    if (error === false && !this.checkNumAndChar(e.target.password.value)) {
      error = true;
      errMess = '"Mật khẩu" không được trống hoặc chứa kí tự đặc biệt';
    }
    if (error === false && !this.checkSpeclChar(e.target.name.value)) {
      error = true;
      errMess = '"Tên" không được trống hoặc chứa kí tự đặc biệt';
    }
    if (error === false && dob === 'Invalid Date') {
      error = true;
      errMess = '"Ngày sinh" không đúng';
    }
    if (error === false && !this.checkNumAndChar(e.target.sex.value)) {
      error = true;
      errMess = '"Giới tính" không được trống hoặc chứa kí tự đặc biệt';
    }
    if (error === false && this.checkEmty(e.target.address.value)) {
      error = true;
      errMess = '"Địa chỉ" không được trống';
    }
    if (error === false && !this.checkSpeclChar(e.target.school.value)) {
      error = true;
      errMess = '"Trường học" không được trống hoặc chứa kí tự đặc biệt';
    }
    return ({
      err: error,
      errMess: errMess
    })
  }
  checkEmty(value) {
    if (value == null || value === '') {
      return true;
    }
    return false;
  }
  checkNumAndChar(value) {
    if (value.match(/^[0-9a-zA-Z]+$/)) {
      return true;
    }
    return false;
  }
  checkSpeclChar(value) {
    // var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (this.checkEmty(value)){
      return false
    }
    if (format.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  chuyenDoiURL(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
  }

}