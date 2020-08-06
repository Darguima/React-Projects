import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg"

import api from "../../services/api";

import "./styles.css"

interface TeacherItemProps {
    classInfo: {
        id: number
        name: string,
        avatar: string,
        whatsapp: string,
        bio: string,
        subject: string,
        cost: number,
        schedule: {
            week_day: number,
            from: string,
            to: string
        }
    }
}

const TeacherItem: React.FC<TeacherItemProps> = ({classInfo: {id, avatar, name, subject, bio, cost, whatsapp}}) => {

    const createNewConnection = () => {
        api.post("connections", {
            user_id: id
        })
    }

    return (
        <article className="teacher-item">
            <header>

            <img src={avatar} alt={`Avatar de ${name}`}/>

            <div>
                <strong>{name}</strong>
                <span>{subject}</span>
            </div>
            
            </header>

            <p>
                {bio}
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>€ {cost}</strong>
                </p>

                <a
                    target="_blanck"
                    href={`https://wa.me/${whatsapp}`}
                    onClick={createNewConnection}
                >
                    <img src={whatsappIcon} alt="Entrar em contacto pelo WhatsApp"/>

                    Entrar em contacto
                </a>
            </footer>

        </article>
    )
}

export default TeacherItem
