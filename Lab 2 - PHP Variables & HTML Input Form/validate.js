const fullname = document.querySelector("#fullname");
const classname = document.querySelector("#classname");
const schoolname = document.querySelector("#schoolname");
const email = document.querySelector("#email");
const birthday = document.querySelector("#birthday");

function validate() {
  var fullnameValue = fullname.value.trim();
  var classnameValue = classname.value.trim();
  var schoolnameValue = schoolname.value.trim();
  var emailValue = email.value.trim();
  var birthdayValue = birthday.value.trim();

  if (fullnameValue === "") {
    setErrorMessage(fullname, "Họ và tên không được để trống.");
    return false;
  } else setErrorMessage(fullname, "");

  if (classnameValue === "") {
    setErrorMessage(classname, "Tên lớp không được để trống.");
    return false;
  } else setErrorMessage(classname, "");

  if (schoolnameValue === "") {
    setErrorMessage(schoolname, "Tên trường không được để trống.");
    return false;
  } else setErrorMessage(schoolname, "");

  if (emailValue === "") {
    setErrorMessage(email, "Email không được để trống");
    return false;
  } else setErrorMessage(email, "");

  var todayDate = new Date().toISOString().slice(0, 10);
  if (birthdayValue === "") {
    setErrorMessage(birthday, "Ngày sinh không được để trống.");
    return false;
  } else if (birthdayValue > todayDate) {
    setErrorMessage(birthday, "Ngày sinh không được muộn hơn hôm nay.");
    return false;
  } else {
    setErrorMessage(birthday, "");
  }

  return true;
}

function setErrorMessage(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
}
