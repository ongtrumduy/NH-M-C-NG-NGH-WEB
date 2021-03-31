<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kết quả</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="form-information">
        <p> Chào mừng,  <?php echo $_POST["fullname"]; ?>!</p>
        <p> Tên lớp của bạn: <?php echo $_POST["classname"]; ?></p>
        <p> Tên trường của bạn: <?php echo $_POST["schoolname"]; ?></p>
        <p> Email của bạn: <?php echo $_POST["email"]; ?></p>

        <p>Ngày sinh của bạn là: 
        <?php 
            $new_date = date('d-m-Y', strtotime($_POST['birthday']));
            echo $new_date;
        ?>
        </p>

        <p>Giới tính của bạn là:
            <?php
            if(isset($_POST['gender'])){
                $sex = $_POST['gender'];
                switch ($sex) {
                    case 'Nam':
                        echo 'Nam';
                        break;
                    case 'Nu':
                        echo 'Nữ';
                        break;
                    default:
                        break;
                }
            }
            ?>
        </p>
        <p>Sở thích của bạn là:
            <?php 
            if (isset($_POST['checkboxvar'])) {
                echo implode(', ', $_POST['checkboxvar']); 
            }
            ?>
        </p>

</div>
</body>
</html>