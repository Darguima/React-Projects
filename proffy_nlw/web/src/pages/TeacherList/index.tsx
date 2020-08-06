import React, { useState, FormEvent } from "react"

import PageHeader from "../../components/PageHeader"
import TeacherItem from "../../components/TeacherItem"
import Input from "../../components/Input"
import Select from "../../components/Select"

import api from "../../services/api"

import "./styles.css"

function TeacherList() {

    const [subject, setSubject] = useState("")
    const [week_day, setWeekDay] = useState("")
    const [time, setTime] = useState("")

    const [response, setResponse] = useState([])

    async function searchTeachers (e: FormEvent) {
        e.preventDefault()

        try{
            const {data} = await api.get("classes", {
                params: {
                    subject,
                    week_day,
                    time
                }
            })

            setResponse(data)
        }

        catch(err){
            console.warn(err)
        }


    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                
                <form id="search-teachers" onSubmit={searchTeachers}>

                    <Select 
                        name="subject"
                        label="Matéria"

                        value={subject}
                        onChange={e => {setSubject(e.target.value)}}

                        options={[
                            {value: "Filosofia", label: "Filosofia"},
                            {value: "Física", label: "Física"},
                            {value: "Química", label: "Química"},
                            {value: "Portugês", label: "Portugês"},
                            {value: "Matemática", label: "Matemática"},
                            {value: "Educação Física", label: "Educação Física"},
                            {value: "Inglês", label: "Inglês"},
                            {value: "Geometria", label: "Geometria"},
                            {value: "Biologia", label: "Biologia"},
                            {value: "História", label: "História"},
                            {value: "Geometria", label: "Geometria"},
                            {value: "Educação Visual", label: "Educação Visual"},
                            {value: "T.I.C", label: "T.I.C"},
                            {value: "EMRC", label: "EMRC"},
                        ]}

                    />

                    <Select 
                        name="week-day"
                        label="Dia da semana"

                        value={week_day}
                        onChange={e => setWeekDay(e.target.value)}

                        options={[
                            {value: "0", label: "Segunda-feira"},
                            {value: "1", label: "Terça-feira"},
                            {value: "2", label: "Quarta-feira"},
                            {value: "3", label: "Quinta-feira"},
                            {value: "4", label: "Sexta-feira"},
                            {value: "5", label: "Sábado"},
                            {value: "6", label: "Domingo"},
                        ]}

                    />
                    
                    <Input
                        label="Hora"
                        name="time"
                        type="time"

                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />
                
                <button type="submit">Buscar</button>

                </form>

            </PageHeader>

            <main>

                {response.map((item, index) => {
                    return( 
                        <TeacherItem key={index} classInfo={item}/>
                    )
                })}
                
            </main>
        </div>
    )
}

export default TeacherList
