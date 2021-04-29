<html>
    <head>
        <title>
            Create Table
        </title>
    </head>

<body>
<?php
    $server = '127.0.0.1';
    $user = 'root';
    $pass = '1';
    $mydb= 'test';
    $table_name = 'Products';
    $port = 3306;
    $connect = new mysqli($server, $user, $pass, $mydb);
    if (!$connect){
        die("Cannot connect to $server using $user");
    }  else{
        $SQLcmd = "create table $table_name(
            productid int unsigned not null auto_increment primary key,
            product_desc varchar(50),
            cost int,
            weight int,
            numb int    
        );";
        $result = mysqli_query($connect,$SQLcmd);
        if($result){
            print '<font size="4" color="blue">Create table';
            print "<i>$table_name</i> in database <i>$mydb</i><br></font>";
            print "<br>SQLcmd=$SQLcmd";
        }else{
            die("Create product table fail");
        }
//        if($connect->query($SQLcmd)){
//            print '<font size="4" color="blue">Create table';
//            print "<i>$table_name</i> in database <i>$mydb</i><br></font>";
//            print "<br>SQLcmd=$SQLcmd";
//        }else{
//            die("Create product table fail");
//        }
        mysqli_close($connect);


    }

?></body></html>