import React from 'react';
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";

const Contact = () => {
  return (
    <div className="contact-page">
        <form class='contact-form'>
          <h1>Contacto</h1>
          <div class="validate-input" data-validate="Se requiere el nombre">
            <input class="input" type="text" name="name" placeholder="Nombre"></input>
          </div>
          <div class="validate-input" data-validate="Se requiere un correo electrónico válido">
            <input class="input" type="text" name="email" placeholder="Correo electrónico"></input>
          </div>
          <div class="validate-input" data-validate="Se requiere el asunto">
            <input class="input" type="text" name="subject" placeholder="Asunto"></input>
          </div>
          <div class="validate-input " data-validate="Se requiere el mensaje">
            <textarea class="message" type="text" name="message" placeholder="Mensaje"></textarea>
          </div>
          <div class="container-contact-form-btn">
            <button class="contact-form-btn" type="submit">Enviar correo</button>
          </div>
        </form>
    </div>
  );
};

export default Contact;
