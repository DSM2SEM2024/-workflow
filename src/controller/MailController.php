<?php
namespace Src\Controller;
use Src\Model\MailConfig;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Src\Model\Message;

class MailController {

    public function requestPassword($name, $email){

        $data = json_decode(file_get_contents('php://input'),true);

        $mail_config = new MailConfig();
        $mail = new PHPMailer(true);

        try{

            $mail->isSMTP();
            $mail->Host = $mail_config->getHost();
            $mail->SMTPAuth = true;
            $mail->Username = $mail_config->getUsername(); // Substitua pelo seu email do Gmail
            $mail->Password = $mail_config->getPassword(); // Substitua pela senha de app gerada
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $mail_config->getPort();
            $mail->CharSet = 'UTF-8';
            $mail->isHTML(true);

            $mail->setFrom($mail_config->getUsername(), $mail_config->getName());
            $mail_name = $mail_config->getName();
            $mail->addAddress($email, $name);
            $mail->Subject = "Solicitação de criação de perfil";
            $mail->Body = "<h1>Boas-vindas ao Repositório</h1>\n
                            <p>
                                Olá! Esperamos que esse e-mail te encontre bem, $name. O enviamos para que considere aceitar
                                a sua inscrição no sistema Repository do Workflow. 
                            </p>
                            <p>
                                Para tal, você deve simplesmente clicar na URL abaixo, para assim criar a sua senha de acesso
                                ao sistema, permitindo seu login. Caso não reconheça essa atividade e/ou deseja recusar, pedimos cordialmente
                                que utilize a opção de recusar cadastro.
                            </p>
                            <p>Atenciosamente,</p>
                            <p>$mail_name</p>
                            <a href='http://localhost:8080/'>Avançar para criação de senha</a>
                            <br>
                            <a href='http://localhost:8080/'>Recusar cadastro</a>";

            $mail->send();
            return Message::send(true, 200, 'E-mail enviado com sucesso',[]);

        } catch(Exception $e){
            return Message::send(false, 500, 'Erro ao enviar o E-mail',$mail->ErrorInfo);
        }

    }

}