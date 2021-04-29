<html>

<head>
    <title>Create Table</title>
</head>

<body>
<?php
$server = '127.0.0.1';
$user = 'root';
$pass = '1';
$mydb = 'test';
$table_name = 'Products';

$item_name = $_GET['item-name'];
$weight = $_GET['weight'];
$cost = $_GET['cost'];
$number = $_GET['number'];

$connect = mysqli_connect($server, $user, $pass);
if (!$connect) {
    die("Cannot connect to $server using $user");
} else {
    $SQLcmd = "INSERT INTO $table_name
                VALUES ('', '$item_name', '$cost', '$weight', '$number')";
    mysqli_select_db($connect, $mydb);
    if (mysqli_query($connect, $SQLcmd)) {
        print "The QUERY is $SQLcmd";
        print "<br>Insert into $table_name successful!";
    } else {
        die("Insertion Failed SQLcmd=$SQLcmd");
    }
    mysqli_close($connect);
}
?></body>

</html>
