<html>
<head></head>

<body>

<?php
    $book = new Book("a","b","c");
    echo 'Title:' . $book->title . '<br/>';
    echo 'Author:' . $book->author . '<br/>';
    echo 'Description:' . $book->description . '<br/>';

?>

</body>
</html>