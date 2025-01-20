<?php
// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name"; // Replace with your DB name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize input to prevent SQL injection
$name = mysqli_real_escape_string($conn, $_POST['name']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$message = mysqli_real_escape_string($conn, $_POST['message']);

// Insert query into the database
$sql = "INSERT INTO user_queries (name, email, message) VALUES ('$name', '$email', '$message')";

if ($conn->query($sql) === TRUE) {
    // Send email notification to you
    $to = "asmsheikh123@gmail.com"; // Replace with your email address
    $subject = "New Query Submitted";
    $message_body = "A new query has been submitted by $name ($email):\n\n$message";
    $headers = "From: asmsheikh123@gmail.com "; // Replace with your email address
    mail($to, $subject, $message_body, $headers);

    // Inform the user
    echo "Your query has been submitted successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
