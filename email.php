<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Assurez-vous que le chemin vers le fichier autoload.php est correct

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Récupérer les valeurs du formulaire
    $name = $_GET["name"];
    $email = $_GET["email"];
    $message = $_GET["message"];

    // Créer une instance de PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configuration du serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com'; // Remplacez par le serveur SMTP de votre hébergeur
        $mail->SMTPAuth = true;
        $mail->Username = 'votre@email.com'; // Remplacez par votre adresse e-mail SMTP
        $mail->Password = 'votre_mot_de_passe'; // Remplacez par votre mot de passe SMTP
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Adresses e-mail
        $mail->setFrom($email, $name);
        $mail->addAddress('tasophro@gmail.com'); // Remplacez par l'adresse e-mail destinataire

        // Contenu de l'e-mail
        $mail->Subject = 'Nouveau message du formulaire de contact';
        $mail->Body    = "Nom: $name\nE-mail: $email\nMessage:\n$message";

        // Envoyer l'e-mail
        $mail->send();

        // Rediriger l'utilisateur après l'envoi
        header("Location: confirmation.html");
        exit();
    } catch (Exception $e) {
        echo "Erreur lors de l'envoi de l'e-mail : {$mail->ErrorInfo}";
    }
}
?>
