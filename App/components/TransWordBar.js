import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import ButtonClick from "./ButtonClick";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import ModalWord from "../components/ModalWord";
import ModalMoreDetail from "../components/ModalMoreDetail";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const TransWordBar = (props) => {
  const [engWordBook, setEngWordBook] = useState("");

  const { textSearch, value, transAction } = props;
  const [getTranslate, setGetTranslate] = React.useState("");
  const [getWord, setWord] = useState("");
  const [getChecked, setChecked] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMoreVisible, setModalMoreVisible] = useState(false);
  // const [value, onChangeText] = useState('');
  const [isBookMark, setBookMark] = useState(new Map())
  // const [selected, setSelected] = React.useState();
  const [changeBookMark, setchangeBookMark] = useState(false)

  const [postWord, setPostWord] = useState("")

  const onBookMark = React.useCallback(
    async (getWord) => {
      const newSelected = new Map(isBookMark);
      newSelected.set(getWord, !isBookMark.get(getWord));
      setBookMark(newSelected);
      if (!isBookMark.get(getWord) == true) {
        setChecked(true)
        var bookmark = []
        setchangeBookMark(true);
        // console.log(newSelected);
        // function logMapElements(value, key, map) {
        //   console.log(`m[${key}] = ${value}`);
        //   if (value == true) {
        //     bookmark.push(key);
        //   }
        //   console.log("length = " + bookmark.length);
        // }
        // newSelected.forEach(logMapElements);
        // console.log("eieiei" + getTranslate);
        // for (let index = 0; index < bookmark.length; index++) {
        //   await axios
        //     .post("http://10.0.2.2:3000/wordCol", {
        //       wordCol_Thai: getTranslate,
        //       wordCol_Eng: getWord,
        //       user_id: 1
        //     })
        //     .then(
        //       (response) => {
        //         console.log("upload bookmark success!!!");
        //       },
        //       (error) => {
        //         console.log(error);
        //       }
        //     );
        // }

        // axios
        // .post(
        //   "http://10.0.2.2:3000/wordCol",
        //   {
        //     "wordCol_Thai": this.,
        //     "wordCol_Eng": "Calf",
        //     "vocabCard_id": 5,
        //     "user_id": null
        // }
        // )
        // .then(
        //   (responsee) => {
        //     console.log(response.data.data.translations[0].translatedText);
        //     setGetTranslate(response.data.data.translations[0].translatedText);
        //     setModalVisible(true)
        //   },
        //   (error) => {
        //     console.log(error);
        //   }
        // )
      }

      if (!isBookMark.get(getWord) == false) {
        setchangeBookMark(false);
        setChecked(false)
        console.log(getWord)
        await axios
          .delete("http://10.0.2.2:3000/wordCol/del/" + getWord)
          .then(
            (response) => {
              console.log("delete bookmark success!!!");
            },
            (error) => {
              console.log(error);
            }
          );
      }
    },
    [isBookMark],
    // console.log(getWord),
    // console.log(isBookMark),
  );
  useEffect(() => {
    if (getChecked == true) {
      console.log(isBookMark)
      console.log(getTranslate)
      var bookmark = [];
      function logMapElements(value, key, map) {
        console.log(`m[${key}] = ${value}`);
        if (value == true) {
          bookmark.push(key);
        }
        console.log("length = " + bookmark.length);
      }
      isBookMark.forEach(logMapElements);
      for (let index = 0; index < bookmark.length; index++) {
        axios
          .post("http://10.0.2.2:3000/wordCol", {
            wordCol_Thai: getTranslate,
            wordCol_Eng: getWord,
            user_id: 1
          })
          .then(
            (response) => {
              console.log("upload bookmark success!!!");
            },
            (error) => {
              console.log(error);
            }
          );
      }
    } else {

    }


  }, [getChecked]);

  const translationGoogle = async (word) => {
    setWord(word)
    console.log("translate------------------");
    await axios
      .post(
        "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCBEbjkNJ_6_DL8s5Ni6bfF0M4YwhrR-Dc",
        {
          q: word,
          source: "en",
          target: "th",
          format: "text",
        }
      )
      .then(
        (response) => {
          console.log(response.data.data.translations[0].translatedText);
          setGetTranslate(response.data.data.translations[0].translatedText);
          var mean = response.data.data.translations[0].translatedText;
          setEngWordBook(mean)
          console.log("innon" + getTranslate);
          setModalVisible(true)
        },
        (error) => {
          console.log(error);
        }
      )
  };

  // console.log("---------------------------------------")
  // console.log("THIS "+ getTranslate)
  return (
    <View style={styles.barArea}>
      {/* <Text>{getTranslate}</Text> */}
      <LinearGradient
        colors={["#FFD387", "#FFE43A"]}
        style={{
          left: 0,
          right: 0,
          top: 0,
          height: 70,
          width: Dimensions.get("window").width,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TextInput
          style={styles.textInput}
          onChangeText={textSearch}
          value={value}
        />
        <ButtonClick
          text="แปล"
          fontSize={20}
          fontcolor="#000000"
          fontFamily="Noto-Reg"
          height={50}
          width={70}
          radius={5}
          padding={0}
          onPressAction={() => translationGoogle(value)}
          colorsStart="#E9B0FF"
          colorsEnd="#8A63E5"
        />

      </LinearGradient>
      <ModalWord
        modalVisible={modalVisible}
        modalClose={() => setModalVisible(false)}
        modalAction={() => setModalVisible(true)}
        modalButton="More Detail"
        engWord={getWord}
        typeWord="n."
        meaning={getTranslate}
        exampleSentence="If you want this. Please Pat for Upgrade version."
        onBookMark={() => onBookMark(getWord)}
        changeBookMark={changeBookMark}
      />
      <ModalMoreDetail
        modalVisible={modalMoreVisible}
        modalClose={() => setModalMoreVisible(false)}
        engWord={getWord}
        typeWord="n."
        meaning={getTranslate}
      />
    </View>
  );
};
export default TransWordBar;

const styles = StyleSheet.create({
  barArea: {
    width: Dimensions.get("window").width,
    height: 70,
    bottom: 0,
    position: "absolute",
  },
  textInput: {
    width: 250,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 10
  }
});