<!DOCTYPE html>
<html>

<head>
    <style>

    </style>
</head>

<body>
<h1 style="color: blue;">Update Results for Table Products </h1>
<table border="1">
    <tr>
        <th>Num </th>
        <th>Item Description </th>
        <th>Weight </th>
        <th>Cost </th>
        <th>Count </th>
    </tr>
    <?php
    $server = '127.0.0.1';
    $user = 'root';
    $pass = '1';
    $mydb = 'sale';
    $table_name = 'Products';


    $cnt = 1;
    if (isset($_GET["product"])) {
        $sold_product = $_GET["product"];

        $mysqli = new mysqli("localhost", $user, $pass, $mydb);

        $query1 = "UPDATE $mydb.$table_name SET Numb = Numb - 1 WHERE (Product_desc = '$sold_product')";


        echo '<p>The QUERY is ' . $query1 . ' </p>';

        //update
        mysqli_query($mysqli, $query1);

        // select data
        $query2 = "SELECT * FROM $mydb.$table_name";
        if ($result = $mysqli->query($query2)) {
            /* fetch associative array */
            while ($row = $result->fetch_assoc()) {
                $id = $row["ProductID"];
                $item_name = $row["Product_desc"];
                $weight = $row["Weight"];
                $cost = $row["Cost"];
                $number = $row["Numb"];
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
    }
    ?>
</table>

</body>

</html>