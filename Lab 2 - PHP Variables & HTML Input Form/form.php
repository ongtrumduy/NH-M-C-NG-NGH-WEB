<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng ký</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <div class="form-container">
            <h2>Đăng ký thông tin</h2>
            <form class="form-main" action="result.php" method="post" onsubmit="return validate()">
                <div class="form-group">
                    <label for="fullname">Họ và tên</label>
                    <input type="text" class="form-control" id="fullname" name="fullname" placeholder="Nhập họ và tên">
  <div>      
                        <small class="form-error"></small>
                    </div>                </div>
                 <div class="form-group">
                    <label for="classname">Tên lớp</label>
                    <input type="text" class="form-control" id="classname" name="classname" placeholder="Nhập tên lớp">
  <div>      
                        <small class="form-error"></small>
                    </div>                </div>
                 <div class="form-group">
                    <label for="schoolname">Tên trường</label>
                    <input type="text" class="form-control" id="schoolname" name="schoolname" placeholder="Nhập tên trường">
  <div>      
                        <small class="form-error"></small>
                    </div>                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Nhập email">
  <div>      
                        <small class="form-error"></small>
                    </div>                </div>
                <div class="form-group">
                    <label for="birthday">Ngày sinh</label>
                    <input type="date" class="form-control" id="birthday" name="birthday" value="<?php echo date('Y-m-d'); ?>">
                    <div>      
                        <small class="form-error"></small>
                    </div>
                </div>
                <div class="form-group">
                    <label for="gender">Giới tính</label>
                    <select class="form-control" id="gender" name="gender">
                        <option value="Nam">Nam</option>
                        <option value="Nu">Nữ</option>
                    </select>
  <div>      
                        <small class="form-error"></small>
                    </div>                </div>
                <div class="form-group">
                    <label for="hobbies">Sở thích</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="checkboxvar[]" value="Đọc sách">
                        <label class="form-check-label" for="">
                            Đọc sách
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="checkboxvar[]" value="Chơi cầu lông">
                        <label class="form-check-label" for="">
                            Chơi cầu lông
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="checkboxvar[]" value="Đá bóng">
                        <label class="form-check-label" for="">
                            Đá bóng
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="checkboxvar[]" value="Bơi lội">
                        <label class="form-check-label" for="">
                            Bơi lội
                        </label>
                    </div>
                     <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="checkboxvar[]" value="Chơi game">
                        <label class="form-check-label" for="">
                            Chơi game
                        </label>
                    </div>
                     <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="checkboxvar[]" value="Đi ăn uống">
                        <label class="form-check-label" for="">
                            Đi ăn uống
                        </label>
                    </div>
                </div>
                <div class="button-group">
                    <button type="reset" class="cancel-button">Hủy</button>
                    <button type="submit" class="register-button">Đăng ký</button>
                </div>
            </form>
        </div>
    </main>

    <script src="validate.js"></script>
</body>
</html>
