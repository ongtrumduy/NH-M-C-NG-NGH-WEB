<!DOCTYPE html>
<html>

<head>
    <style>
        .main {
            display: flex;
        }
        .list_cat, form_biz {
            margin: 10px 20px 10px 30px;
        }
        .submit {
            margin-left: 20px;
            margin-top: 20px;
        }
        h1 {
            color: blue;
        }
    </style>
</head>

<body>
<h1>Business Registration</h1>
<form action="add_respond.php" method="POST">
    <div class="main">
        <div class="list_cat">
            <p>Click on one, or control-click on multiple categories:</p>
            <select name="cat[]" size="5" multiple required>
                <?php
                $server = '127.0.0.1';
                $user = 'root';
                $pass = '1';
                $mydb = 'test';
                $cat_tab = 'categories';


                $mysqli = new mysqli($server, $user, $pass, $mydb);

                $query = "SELECT * FROM $cat_tab";
                if ($result = $mysqli->query($query)) {

                    /* fetch associative array */
                    while ($row = $result->fetch_assoc()) {
                        $catid = $row["categoriesid"];
                        $catTitle = $row["title"];
                        $check = true;
                        foreach($_POST['cat'] as $cat_selected) {
                            if($catid == $cat_selected) {
                                echo '<option value="'. $catid .'" name="'.$catid.'" id="'.$catid.'" selected>'.$catTitle.'</option>';
                                $check = false;
                                break;
                            }
                        }
                        if($check) {
                            echo '<option value="'. $catid .'" name="'.$catid.'" id="'.$catid.'">'.$catid.'</option>';
                        }
                    }

                    $result->free();
                }
                ?>
            </select>
        </div>
        <div class="form_biz">
            <table>
                <?php
                $server = '127.0.0.1';
                $user = 'root';
                $pass = '1';
                $mydb = 'business_service';
                $biz_tab = 'businesses';
                $biz_cat = 'biz_categories';

                $cat_selected = $_POST['cat'];

                $cnt = 1;

                $mysqli = new mysqli($server, $user, $pass, $mydb);

                $query = "SELECT * FROM $biz_tab";
                if ($result = $mysqli->query($query)) {
                    while ($row = $result->fetch_assoc()) {
                        $cnt++;
                    }
                    $result->free();
                }
                $biz_id = $cnt;

                $biz_name = $_POST['biz_name'];
                $address = $_POST['address'];
                $city = $_POST['city'];
                $number = $_POST['number'];
                $url = $_POST['url'];

                $connect = mysqli_connect($server, $user, $pass);
                if (!$connect) {
                    die("Cannot connect to $server using $user");
                } else {
                    mysqli_select_db($connect, $mydb);
                    $query1 = "INSERT INTO $biz_tab
                                    VALUES ('$biz_id', '$biz_name', '$address', '$city', '$number', '$url')";
                    mysqli_query($connect, $query1);
                    foreach($_POST['cat'] as $cat_selected) {
                        $query2 = "INSERT INTO $biz_cat VALUES ('$biz_id', '$cat_selected')";
                        $insertRes = mysqli_query($connect, $query2);
                    }
                    mysqli_close($connect);
                }

                echo
                    '<tr>
                                <td>Business name: </td>
                                <td>'.$biz_name.'</td>
                            </tr>
                            <tr>
                                <td>Address: </td>
                                <td>'.$address.'</td>
                            </tr>
                            <tr>
                                <td>City: </td>
                                <td>'.$city.'</td>
                            </tr>
                            <tr>
                                <td>Telephone: </td>
                                <td>'.$number.'</td>
                            </tr>
                            <tr>
                                <td>URL: </td>
                                <td>'.$url.'</td>
                            </tr>';
                ?>
            </table>
        </div>
    </div>
</form>

<a href="./add_business.php">Add another Business</a>
</body>

</html>