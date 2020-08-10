import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';

import PageHeader from '../../Components/PageHeader';
import TeacherItem from '../../Components/TeacherItem';

import AsyncStorage from "@react-native-community/async-storage"

import styles from './styles';

import { classeInfoInterface } from "../../pages/TeacherList"

const Favourites: React.FC = () => {

  const [favoritedTeachers, setFavoritedTeachers] = useState<[]>([])

  useEffect(() => {
    AsyncStorage.getItem("favorites").then(response => {
      if (response) {

        const favoritesArray = JSON.parse(response)

        setFavoritedTeachers(favoritesArray)
      }

    })
  })

  return (

    <View style={styles.container}>

      <PageHeader title="Meus proffys favoritos"/>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >

        {favoritedTeachers.map((teacher: classeInfoInterface, index) => (
          <TeacherItem
            key={index}
            avatar={teacher.avatar}
            name={teacher.name}
            subject={teacher.subject}
            bio={teacher.bio}
            cost={teacher.cost}
            whatsapp={teacher.whatsapp}
            id={teacher.id}
            favorited={ true }
          />
        ))}

      </ScrollView>

    </View>

  );
}

export default Favourites;