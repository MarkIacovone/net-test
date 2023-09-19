<?php
	
	$data['error'] = false;
	
	$name = $_POST['nombre'];
	$tel = $_POST['tel'];
	$email = $_POST['mail'];
	$subject = $_POST['asunto'];
	$message = $_POST['mensaje'];
	
	if( empty($name) ){
		$data['error'] = 'Ingrese su Nombre.';
	}else if(filter_var($email, FILTER_VALIDATE_EMAIL) == false){
		$data['error'] = 'El mail es invalido.';
	}else if( empty($tel) ){
		$data['error'] = 'Ingrese su Teléfono.';
	}else if( empty($subject) ){
		$data['error'] = 'Ingrese su asunto.';
	}else if( empty($message) ){
		$data['error'] = 'El campo de mensaje es obligatorio!';
	}else{
		
		$formcontent="From: $name\nSubject: $subject\nEmail: $email\nMessage: $message\nTel: $tel";
		
		
		//Place your Email Here
		$recipient = "info@netconsulting.com.ar";
		
		$mailheader = "From: $email \r\n";
		
		if( mail($recipient, $name, $formcontent, $mailheader) == false ){
			$data['error'] = 'Lo lamento, ha ocurrido un error!';
		}else{
			$data['error'] = false;
		}
	
	}
	
	echo json_encode($data);
	
?>