<?php
    include_once("model/Book.php");

    class Book{
        public $title;
        public $author;
        public $description;

        public function __construct($t, $a, $d){
            $this->title = $t;
            $this->author = $a;
            $this->description = $d;
        }
    }
?>