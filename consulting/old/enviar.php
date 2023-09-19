<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);
        $telefono = trim($_POST["telefono"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! Hubo un problema. Complete el formulario e intente nuevamente.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "info@netlaplata.com.ar";

        // Set the email subject.
        $subject = "Consulta Consulting - $name";

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";
        $email_content = '
        <table width="100%" height="100%" style="min-width:348px;" border="0" cellspacing="0" cellpadding="0">
   <tbody>
      <tr height="32px"></tr>
      <tr align="center">
         <td width="32px"></td>
         <td>
            <table border="0" cellspacing="0" cellpadding="0" style="max-width:600px;">
               <tbody>
                  <tr>
                     <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                           <tbody>
                              <tr>
                                 <td align="left"><img width="92" height="32" src="http://netlp.tk/img/logonetn.png"></td>
                                 <td align="right"></td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
                  <tr height="16"></tr>
                  <tr>
                     <td>
                        <table bgcolor="#4184F3" width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width:332px;max-width:600px;border:1px solid #E0E0E0;border-bottom:0;border-top-left-radius:3px;border-top-right-radius:3px;">
                           <tbody>
                              <tr>
                                 <td height="72px" colspan="3"></td>
                              </tr>
                              <tr>
                                 <td width="32px"></td>
                                 <td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:24px;color:#FFFFFF;line-height:1.25;">Envio de mail desde <a href="http:///netconsulting.com" target="_blank" style="text-decoration:none;color:#FFFFFF;">NET CONSULTING</a></td>
                                 <td width="32px"></td>
                              </tr>
                              <tr>
                                 <td height="18px" colspan="3"></td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <table bgcolor="#FFFFFF" width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width:332px;max-width:600px;border:1px solid #F0F0F0;border-top:0;">
                           <tbody>
                              <tr>
                                 <td height="18px" colspan="3"></td>
                              </tr>
                              <tr>
                                 <td width="32px"></td>
                                 <td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;">Has recibido un mail de:
                                 <br> Nombre <a target="_blank">'.$name.'</a>.
                                 <br> Mail: <a target="_blank">'.$email.'</a>
                                 <br> Telefono: <a target="_blank">'.$telefono.'</a><br>
                                  </td>
                                 <td width="10px"></td>
                              </tr>
                              <tr>
                                 <td height="18px" colspan="3"></td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <table bgcolor="#FAFAFA" width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width:332px;max-width:600px;border:1px solid #F0F0F0;border-bottom:1px solid #C0C0C0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px;">
                           <tbody>
                              <tr height="16px">
                                 <td width="32px" rowspan="3"></td>
                                 <td></td>
                                 <td width="32px" rowspan="3"></td>
                              </tr>
                              <tr>
                                 <td>
                                    <table style="min-width:300px;" border="0" cellspacing="0" cellpadding="0">
                                       <tbody>
                                          <tr>
                                             <td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;">'.$message.'</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </td>
                              </tr>
                              <tr height="32px"></tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
                  <tr height="16"></tr>
                  <tr>
                     <td style="max-width:600px;font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:10px;color:#BCBCBC;line-height:1.5;"></td>
                  </tr>
                  <tr>
                     <td>
                        <table style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:10px;color:#666666;line-height:18px;padding-bottom:10px;">
                           <tbody>
                              <tr>
                                 <td>Te hemos enviado este correo electrónico desde el formulario de contacto de la web de <a href="http:///netconsulting.com.ar" target="_blank" style="text-decoration:none;color:#4285F4;">NET CONSULTING </a></td>
                              </tr>
                              <tr>
                                 <td>
                                    <div style="direction:ltr;text-align:left;">© 2016 Net CONSULTING  - powered by Pablo Santamaria</div>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
               </tbody>
            </table>
         </td>
         <td width="32px"></td>
      </tr>
      <tr height="32px"></tr>
   </tbody>
</table>
        ';

        // Build the email headers.
        $email_headers = "From: $name <$email>\r\n";
        $email_headers .= "MIME-Version: 1.0\r\n";
		$email_headers .= "Content-Type: text/html; charset=UTF8\r\n";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            header("Location: index.html");
            echo "Gracias! Su mensaje ha sido enviado.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Algo salio mal y no se pudo enviar el mensaje.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Hubo un problema con el envio. Intente nuevamente.";
    }

?>