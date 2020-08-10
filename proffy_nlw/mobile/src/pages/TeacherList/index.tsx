import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"


import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons"

import AsyncStorage from "@react-native-community/async-storage"

import PageHeader from '../../Components/PageHeader';
import TeacherItem from '../../Components/TeacherItem';

import api from '../../services/api';

import styles from "./styles"

export interface classeInfoInterface {
  avatar: string,
  name: string,
  subject: string,
  bio: string,
  cost: number,
  whatsapp: string,
  id: number,
}

const TeacherList: React.FC = () => {

  const [isFiltersVisible, setIsFiltersVisible] = useState(true)

  function handleToggleFilterVisible () {
    setIsFiltersVisible(!isFiltersVisible)
  }

  const [subject, setSubject] = useState("")
  const [week_day, setWeekDay] = useState("")
  const [time, setTime] = useState("")

  const [classeInfo, setClasseInfo] = useState([])

  async function handleFiltersSubmit () {

    try{
      const {data} = await api.get("classes", {
          params: {
              subject,
              week_day,
              time
          }
      })

      setClasseInfo(data)

      if ( data.length !== 0 ) {

        handleToggleFilterVisible()

      }

    }

    catch(err){
        console.warn(err)
    }

  }

  const [favoritedTeachersIds, setFavoritedTeachersIds] = useState<Number[]>([])

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem("favorites").then(response => {
      if (response) {

        const favoritesArray = JSON.parse(response)
        const favoritesIdsArray = favoritesArray.map((item: classeInfoInterface) => (item.id))

        setFavoritedTeachersIds(favoritesIdsArray)
      }

    })
  }, [])

  useFocusEffect(() => {

    loadFavorites()

  })

  return (

    <View style={styles.container}>

      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton
            onPress={handleToggleFilterVisible}
          >
            <Feather name="filter" size={20} color={"#FFF"} />
          </BorderlessButton>
        )}
      >

        {isFiltersVisible &&
          <View style={styles.searchForm}>

            <Text style={styles.label}>Matéria</Text>

            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#C1BCCC"

              value={subject}
              onChangeText={text => setSubject(text)}

            />

            <View style={styles.inputGroup}>

              <View style={styles.inputBlock}>

                <Text style={styles.label}>Dia da Semana</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#C1BCCC"

                  value={week_day}
                  onChangeText={text => setWeekDay(text)}

                />

              </View>

              <View style={styles.inputBlock}>

                <Text style={styles.label}>Horário</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#C1BCCC"

                  value={time}
                  onChangeText={text => setTime(text)}

                />

              </View>

            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >

              <Text style={styles.submitButtonText}>
                Filtrar
              </Text>

            </RectButton>

          </View>
        }

      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >

        {classeInfo.map((item: classeInfoInterface, index) => (

          <TeacherItem 
            key={index}
            avatar={item.avatar}
            name={item.name}
            subject={item.subject}
            bio={item.bio}
            cost={item.cost}
            whatsapp={item.whatsapp}
            id={item.id}
            favorited={ favoritedTeachersIds.includes(item.id) }
          />
        ))}

      </ScrollView>

    </View>

  );
}

export default TeacherList;