import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg"

import "./styles.css"

function TeacherItem(){
    return (
        <article className="teacher-item">
            <header>

            <img src="https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4" alt="Diego Fernandes"/>

            <div>
                <strong>Diego Fernandes</strong>
                <span>Química</span>
            </div>
            
            </header>

            <p>
                Sou professor de quimica bla bla bla
                <br /><br />
                Apaixonado por isto e aquilo bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla 
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>€ 20.00</strong>
                </p>

                <button type="button">
                    <img src={whatsappIcon} alt="Entrar em contacto pelo WhatsApp"/>

                    Entrar em contacto
                </button>
            </footer>

        </article>
    )
}

export default TeacherItem
