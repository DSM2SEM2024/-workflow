<?php
namespace Src\Controller;
use Src\Model\MailConfig;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Src\Model\Message;
use Src\Auth\TokenHandler;

class MailController {

    public function requestPassword($name, $email, $id, $role){

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
            $email_hash = hash('md5',$email);
            $n = mt_rand(0,999999);
            $code = str_pad($n, 6, '0', STR_PAD_LEFT);
            $mail->Subject = "Solicitação de criação de perfil";
            $mail->Body = "<h1 style='text-align: center;'>Boas-vindas ao Repositório</h1>\n
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
                            <div style='width: 80vw; display: flex; flex-direction: row; justify-content: space-between; align-items: center;'>
                                <a href='http://localhost:8080/create-password/$email_hash'>Avançar para criação de senha</a>
                                <a href='http://localhost:70/user/remove/$id'>Recusar cadastro</a>
                            </div>";

            $mail->send();
            return Message::send(true, 200, 'E-mail enviado com sucesso',[]);

        } catch(Exception $e){
            return Message::send(false, 500, 'Erro ao enviar o E-mail',$mail->ErrorInfo);
        }

    }

}