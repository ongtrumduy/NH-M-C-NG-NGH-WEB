<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Date Time Processing</title>
</head>
<body>
    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="get">
        <?php
            if (array_key_exists("name", $_GET)) {
                $name = $_GET["name"];
            } else {
                $name = "";
            }

            if (array_key_exists("year", $_GET)) {
                $year = $_GET["year"];
            } else {
                $year = 2000;
            }
            
            if (array_key_exists("month", $_GET)) {
                $month = $_GET["month"];
            } else {
                $month = 1;
            }
            
            if (array_key_exists("day", $_GET)) {
                $day = $_GET["day"];
            } else {
                $day = 1;
            }
            
            if (array_key_exists("hour", $_GET)) {
                $hour = $_GET["hour"];
            } else {
                $hour = 0;
            }
            
            if (array_key_exists("minute", $_GET)) {
                $minute = $_GET["minute"];
            } else {
                $minute = 0;
            }
            
            if (array_key_exists("second", $_GET)) {
                $second = $_GET["second"];
            } else {
                $second = 0;
            }
        ?>
    <p>Enter your name and select date and time for the appointment</p>
        <table>
            <tr>
                <td>Your name: </td>
                <td colspan="3"><input type="text" name="name" maxlength="25" id="" value=<?php if ($name != "") echo $name?>></td>
            </tr>
            <tr>
                <td>Date: </td>
                <td>
                    <select name="day" id="">
                        <?php
                            for ($i = 1; $i <= 31; $i++) {
                                if ($day == $i) {
                                    print ("<option selected>$i</option>");
                                } else {
                                    print ("<option>$i</option>");
                                }
                            }
                        ?>
                    </select>
                </td>
                <td>
                    <select name="month" id="">
                        <?php
                            for ($i = 1; $i <= 12; $i++) {
                                if ($month == $i) {
                                    print ("<option selected>$i</option>");
                                } else {
                                    print ("<option>$i</option>");
                                }
                            }
                        ?>
                    </select>
                </td>
                <td>
                    <select name="year" id="">
                        <?php
                            for ($i = 2000; $i <= 2100; $i++) {
                                if ($year == $i) {
                                    print ("<option selected>$i</option>");
                                } else {
                                    print ("<option>$i</option>");
                                }
                            }
                        ?>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Time: </td>
                <td>
                    <select name="hour" id="">
                        <?php
                            for ($i = 0; $i <= 23; $i++) {
                                if ($hour == $i) {
                                    print ("<option selected>$i</option>");
                                } else {
                                    print ("<option>$i</option>");
                                }
                            }
                        ?>
                    </select>
                </td>
                <td>
                    <select name="minute" id="">
                        <?php
                            for ($i = 0; $i <= 59; $i++) {
                                if ($minute == $i) {
                                    print ("<option selected>$i</option>");
                                } else {
                                    print ("<option>$i</option>");
                                }
                            }
                        ?>
                    </select>
                </td>
                <td>
                    <select name="second" id="">
                        <?php
                            for ($i = 0; $i <= 59; $i++) {
                                if ($second == $i) {
                                    print ("<option selected>$i</option>");
                                } else {
                                    print ("<option>$i</option>");
                                }
                            }
                        ?>
                    </select>
                </td>
            </tr>
            <tr>
                <td align="right"><input type="submit" value="Submit"></td>
                <td align="left"><input type="reset" value="Reset"></td>
            </tr>
        </table>
        <?php
        // Xử lí nếu nhập ngày tháng vào không hợp lệ
            $month_31day = array(2, 4, 6, 9, 11);
            $check_validate =  FALSE;
            $check_namnhuan =  FALSE;

            for($i=0;$i<5;$i++){
                if($day == 31 && $month == $month_31day[$i]){
                    $check_validate = TRUE;
                }
            }
            
            if ($month == 2) {
                    if ($year%4 == 0) {
                        if ($year%100 != 0 || ($year%100 == 0 && $year%400 ==0))
                            $check_namnhuan =  TRUE;
                    }
            }

            if($day >29 && $month == 2){
                $check_validate = TRUE;
            }

            if($day >= 29 && $month == 2 && $check_namnhuan == FALSE){
                $check_validate = TRUE;
            }
            
         //------------------------------------------ 
        if($check_validate){
                print ("<br><br>You have chosen unvalid date or month or year. Please choose again!!!");
            }

        else{

            if (array_key_exists("name", $_GET)) {
                print("<br><br> Hi $name !<br><br>");
            }

            if (
                array_key_exists("year", $_GET)
                && array_key_exists("month", $_GET)
                && array_key_exists("day", $_GET)
                && array_key_exists("hour", $_GET)
                && array_key_exists("minute", $_GET)
                && array_key_exists("second", $_GET)
            ) {
                
                $hour12 = 0;
                $halfOdDay = 'AM';
                if ($hour >= 12) {
                    if ($hour > 12) $hour12 = $hour%12;
                    else $hour12 = 12;
                    $halfOdDay = 'PM';
                }
                
                $numberDayOfMonth = 0;
                if (
                    $month == 1
                    || $month == 3
                    || $month == 5
                    || $month == 7
                    || $month == 8
                    || $month == 10
                    || $month == 12
                ) {
                    $numberDayOfMonth = 31;
                } else if ($month == 2) {
                    if ($year%4 == 0) {
                        if ($year%100 != 0 || ($year%100 == 0 && $year%400 ==0)) $numberDayOfMonth = 29;
                    } else {
                        $numberDayOfMonth = 28;
                    }
                } else $numberDayOfMonth = 30;
                
                print("You have choose to have an appointment on $hour:$minute:$second, $day/$month/$year <br><br>");
                print("More information <br><br>");
                print("In 12 hours, the time and date is $hour12:$minute:$second $halfOdDay, $day/$month/$year <br><br>");
                print("This month has $numberDayOfMonth days!");
            }
        }
        ?>
    </form>
</body>
</html>