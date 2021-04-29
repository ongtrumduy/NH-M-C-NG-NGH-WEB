<!--php -S localhost:8081 showlist.php-->
<!DOCTYPE html>
<html>

<head>
    <style>

    </style>
</head>

<body>
<table border="1">
    <tr>
        <th>Num </th>
        <th>Item Description </th>
        <th>Weight </th>
        <th>Cost </th>
        <th>Number Available </th>
    </tr>
    <?php
    $server = '127.0.0.1';
    $user = 'root';
    $pass = '1';
    $mydb = 'test';
    $table_name = 'Products';
    $cnt = 1;

    $mysqli = new mysqli($server, $user, $pass, $mydb);

    $query = "SELECT * FROM $table_name";
    if ($result = $mysqli->query($query)) {

        /* fetch associative array */
        while ($row = $result->fetch_assoc()) {
            $id = $row["productID"];
            $item_name = $row["product_desc"];
            $weight = $row["weight"];
            $cost = $row["cost"];
            $number = $row["numb"];
            echo
                '<tr>
                            <td>' . $cnt . '</td>
                            <td>' . $item_name . '</td> 
                            <td>' . $cost . '</td> 
                            <td>' . $weight . '</td> 
                            <td>' . $number . '</td> 
                        </tr>';
            $cnt++;
        }

        $result->free();
    }
    ?>
</table>

</body>

</html>
<?php
