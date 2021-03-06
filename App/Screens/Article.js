import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";
import CountViews from "../API/CountViewsAPI";
import ArticleCard from "../components/ArticleCard";
import Constants from "expo-constants";
import Header from "../components/Header";
import * as firebase from "firebase";

const Article = (props) => {
  const [readingId, setReadingId] = useState(0);

  function goToContentScreen(category_id, user_id, reading_id, vocabBox_id) {
    const views = CountViews(category_id, user_id, reading_id, vocabBox_id);
    Actions.ContentScreen({ text: reading_id });
  }

  const [userId, setUserId] = useState("");
  async function getUid() {
    try {
      console.log("get uid first in article")
      var uid = firebase.auth().currentUser.uid;
      getUser(uid);

    } catch (error) {
      console.log("error getItem")

    }
  }

  const getUser = async (uuidTemp) => {
    try {
      await axios.get("https://readalright-backend.khanysorn.me/user/" + uuidTemp).then(
        (response) => {
          setUserId(response.data.user[0].user_id);
          fetch(response.data.user[0].user_id)
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log("error get userId3")
    }
  }


  const [suggestion, setSuggestion] = useState([]);


  const getSuggestion = async () => {
    console.log("user id in article suggestion")
    console.log(userId)
    const data = await axios
      .get("https://readalright-backend.khanysorn.me/answer/suggestions/" + userId)
      .then((response) => {
        setSuggestion(response.data.answer)

      });
  };

  const [cate, setCate] = useState([]);

  const [cateName, setCateName] = useState("");

  const fetch = async () => {
    await axios.get("https://readalright-backend.khanysorn.me/reading/interest/" + props.text).then(
      (response) => {
        console.log("eiei");
        console.log(response.data.reading[1]);
        setCate(response.data.reading);
        setCateName(response.data.reading[0].categoryName);
        console.log(cateName);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const read = async () => {
    const data = await fetch();
  };
  useEffect(() => {
    read();
    getUid();
    getSuggestion();

  }, []);
  
  const ImageCards = () => {
    return <Image />;
  };

  return (
    <ScrollView
      style={{
        marginTop: Constants.statusBarHeight,
      }}
    >
      <Header
        suggestion={suggestion}
        isSwitch={false}
      />
      <Text style={styles.topic}>{cateName}</Text>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        data={cate}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              goToContentScreen(item.category_id, 1, item.reading_id, 1)
            }
          >
            <View style={styles.container}>
              <ArticleCard
                image={item.image}
                title={item.title}
                level_reading={item.level_reading}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor = { (item, index) => index.toString() }
      
      />
    </ScrollView>
  );
};
export default Article;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    height: 110,
    width: 110,
    overflow: "hidden",
  },
  topic: {
    fontSize: 24,
    color: "#000",
    marginVertical: 30,
    fontFamily: "PT-Bold",
    alignSelf: "center",
  },
  descript: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  itemTopic: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  button: {
    width: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  category: {
    marginTop: 44,
    fontSize: 24,
    fontFamily: "PT-Bold",
    color: "#000",
    alignSelf: "center",
    marginBottom: 26,
  },
});
