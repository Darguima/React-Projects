import React, { useState, useEffect } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import AsyncStorage from "@react-native-community/async-storage"

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png"
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png"
import whatsAppIcon from "../../assets/images/icons/whatsapp.png"

import api from '../../services/api';

import style from './styles';

import { classeInfoInterface } from "../../pages/TeacherList"

interface teacherItemProps extends classeInfoInterface {
  favorited: boolean,
}

const TeacherItem: React.FC<teacherItemProps> = ({ avatar, name, subject, bio, cost, whatsapp, id, favorited }) => {

  function handleLinkToWhatsapp () {

    api.post("connections", {
      user_id: id
    })

    Linking.openURL(`whatsapp://send?phone=${whatsapp}`)

  }

  const [isFavorited, setIsFavorited] = useState(favorited)

  async function handleToggleFavorite () {

    const favorites = await AsyncStorage.getItem("favorites")

    let favoritesArray = []

    if (favorites) {
      favoritesArray = JSON.parse(favorites)
    }

    if (isFavorited) {

      const favoriteIndex = favoritesArray.findIndex((favouriteItem: teacherItemProps) => {
        return favouriteItem.id === id
      })

      favoritesArray.splice(favoriteIndex, 1)

    }

    else {

      favoritesArray.push({ avatar, name, subject, bio, cost, whatsapp, id })

    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray))

    setIsFavorited(!isFavorited)
  }

  return (
      <View style={style.container}>

        <View style={style.profile}>

            <Image
							style={style.avatar}
              source={{uri: avatar}}
            />

            <View style={style.profileInfo}>

              <Text style={style.name}>{ name }</Text>
              <Text style={style.subject}>{ subject }</Text>

            </View>

        </View>

  <Text style={style.bio}>{ bio }</Text>

        <View style={style.footer}>

          <Text style={style.price}>
            Preço/hora {"   "}
            <Text style={style.priceValue}>€ { cost }</Text>
          </Text>

          <View style={style.buttonsContainer}>

            <RectButton
              onPress={handleToggleFavorite}
              style={[
                style.favoriteButton,
                isFavorited ? style.favorited : {}
              ]}
            >

              { isFavorited 

                  ?

                <Image source={unfavoriteIcon} />
                
                  :
                
                <Image source={heartOutlineIcon} />
              }

            </RectButton>

            <RectButton
              style={style.contactButton}
              onPress={handleLinkToWhatsapp}
            >
              <Image source={whatsAppIcon}/>
              <Text style={style.contactButtonText}>Entrar em contacto</Text>
            </RectButton>

          </View>
          
        </View>

      </View>
  );
}

export default TeacherItem;