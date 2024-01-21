<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $name = $_GET["name"];
    $email = $_GET["email"];
    $message = $_GET["message"];

    $destinataire = "tasophro@gmail.com";

    $sujet = "Nouveau message du formulaire de contact";

    $corps_message = "Nom: $name\n";
    $corps_message .= "E-mail: $email\n";
    $corps_message .= "Message:\n$message";

    $entetes = "De: $email";

    // Envoyer l'e-mail
    mail($destinataire, $sujet, $corps_message, $entetes);

    // Rediriger l'utilisateur après l'envoi
    header("Location: confirmation.html");
    exit();
}
?>
