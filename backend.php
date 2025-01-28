<?php
// Include PHPMailer library
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';
$secret = require './secret.php';
// Database connection settings
$host = 'localhost'; // e.g., 'remotemysql.com'
$username = $secret['db_user_name'];
$password = $secret['db_pass'];
$dbname = $secret['db_name'];

// Email settings
$toEmail = 'support@4pmsolutions.com';
$subject = 'New Query Submission';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Validate form data
    if (empty($name) || empty($email) || empty($message)) {
        die('All fields are required.');
    }

    // Save data to the database
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO queries (name, email, message) VALUES (:name, :email, :message)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':message', $message);
        $stmt->execute();

        // Send email notification using PHPMailer
        $mail = new PHPMailer(true);
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.hostinger.com'; // Your SMTP host
            $mail->SMTPAuth = true;
            $mail->Username = 'support@4pmsolutions.com'; // Your email address
            $mail->Password = $secret['email_pass']; // Your email password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom('support@4pmsolutions.com', 'Support');
            $mail->addAddress($toEmail);

            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = "<p>You have received a new query submission:</p>" .
                          "<p><strong>Name:</strong> $name</p>" .
                          "<p><strong>Email:</strong> $email</p>" .
                          "<p><strong>Message:</strong><br>$message</p>";

            $mail->send();

            $response = [
                "status"=>"200",
                "message"=>"Query submitted successfully."
            ];
            
            // Set the Content-Type header to application/json
            header('Content-Type:application/json');
            
            // Echo the response as a JSON string
            echo json_encode($response);

        } catch (Exception $e) {
            $halfresponse = [
                "status"=>"200",
                "message" =>"Query submitted successfully,we will reach back to you within 24 hours." . $mail->ErrorInfo
            ];
            echo json_encode($halfresponse);
            echo "Query submitted: {$mail->ErrorInfo}";
        }
    } catch (PDOException $e) {
        die('Database error: ' . $e->getMessage());
    }
} else {
    echo 'Invalid request method.';
}
?>
