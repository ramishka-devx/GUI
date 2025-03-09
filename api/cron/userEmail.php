<?php
// Database connection
$host = "alguidance.lk";
$dbname = "alguidance_canteen";
$username = "alguidance_bit";
$password = ";IhgWQezODaN";

// Email configuration
$subject = "Food Order Reminder";
$email_body = "Hello {name},\n\nPlease remember to order your food before 1 PM today!\n\nBest Regards,\nCanteen Team";

// SMTP configuration
$smtp_host = "alguidance.lk"; // Change this if needed
$smtp_user = "no-reply@alguidance.lk";
$smtp_pass = "oN$MT^c8{W2a";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get students who haven't placed an order today
    $stmt = $pdo->prepare("
        SELECT u.firstName, u.email 
        FROM users u
        LEFT JOIN orders o ON u.userId = o.userId AND DATE(o.created_at) = CURDATE()
        WHERE o.userId IS NULL AND u.email IS NOT NULL AND u.email != ''
    ");
    $stmt->execute();
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($students) == 0) {
        exit("No students need reminders today.");
    }

    // Load PHPMailer
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';
    require 'PHPMailer/Exception.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    foreach ($students as $student) {
        $mail = new PHPMailer(true);
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = $smtp_host;
            $mail->SMTPAuth   = true;
            $mail->Username   = $smtp_user;
            $mail->Password   = $smtp_pass;
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;

            // Email headers
            $mail->setFrom($smtp_user, 'Canteen Reminder');
            $mail->addAddress($student['email']);
            $mail->isHTML(false);
            $mail->Subject = $subject;

            // Customize email body with student's name
            $personalized_body = str_replace("{name}", $student['firstName'], $email_body);
            $mail->Body = $personalized_body;

            $mail->send();
            echo "Reminder sent to: " . $student['email'] . "\n";
        } catch (Exception $e) {
            echo "Failed to send email to " . $student['email'] . ". Error: " . $mail->ErrorInfo . "\n";
        }
    }
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
