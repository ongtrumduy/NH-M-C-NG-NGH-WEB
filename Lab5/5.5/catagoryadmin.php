<?php
$server = '127.0.0.1';
$user = 'root';
$pass = '1';
$mydb = 'test';

$connect = mysqli_connect($server, $user, $pass, $mydb);
if(!$connect){
    die("Connect Failed!");
} else {
    $selectQuery = 'select * from categories';
    $selectResult = mysqli_query($connect, $selectQuery);
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Category Administration</title>
</head>
<body>
<h1>Category Administration</h1>
<table border="1">
    <tr>
        <td> <b> Cat ID </b>
        </td>
        <td>
            <b> Title </b>
        </td>
        <td>
            <b>Description</b>
        </td>
    </tr>
    <?php
    while($rows = mysqli_fetch_array($selectResult)){
        echo "<tr> <td>" .$rows['categoryid'] ."</td> ";
        echo " <td>" .$rows['title'] ."</td> ";
        echo " <td>" .$rows['description'] ."</td> </tr>";
    }
    ?>
    <tr>
        <form name="addForm" method="POST">
            <td>
                <input id="catId" name="catId" type="text" required>
            </td>
            <td>
                <input id="title" name="title" type="text" required>
            </td>
            <td>
                <input id="description" name="description" type="text" required>
            </td>
            <input type="submit" value="Add Category">


        </form>
    </tr>

</table>

<?php
if(isset($_POST['catId'])){
//    echo "1111";
    $id = $_POST['catId'];
    $title = $_POST['title'];
    $description = $_POST['description'];

    $insertQuery =  "insert into categories(categoryid, title, description) values('$id','$title','$description');";
    $insertResult = mysqli_query($connect, $insertQuery);
    if($insertResult){
        echo '<script type="text/javascript">alert("Insert Successfully ")</script>';
        echo header("refresh: 0.2");
    }
}
?>
</body>
</html>