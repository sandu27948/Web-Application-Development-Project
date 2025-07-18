<?php 
 //connect database called userdb 
 $conn = mysqli_connect('localhost','root','','userdb'); 
  
 //check connection is live or not 
 if (!$conn) { 
  die("Connection failed: " . mysqli_connect_error()); 
 } 
  
 