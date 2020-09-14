import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";
import CountViews from "../API/CountViewsAPI";
import ArticleCard from "../components/ArticleCard";
import Constants from "expo-constants";
import Header from "../components/Header";

const data = [
  {
    img:
      "https://vignette.wikia.nocookie.net/diamondnoace/images/9/96/Haruichi_Act_2.png/revision/latest?cb=20190709155009",
    title: "Ho",
  },
];

const Article = (props) => {
  const [readingId, setReadingId] = useState(0);

  function goToContentScreen(category_id, user_id, reading_id, vocabBox_id) {
    const views = CountViews(category_id, user_id, reading_id, vocabBox_id);
    console.log("readingIdddddddddddddddddddddd++++++++++++++");
    console.log(reading_id);
    Actions.ContentScreen({ text: reading_id });
  }

  const [suggestion, setSuggestion] = useState([]);


  const getSuggestion = async () => {
    const data = await axios
      .get("http://10.0.2.2:3000/answer/suggestions/1")
      .then((response) => {
        console.log("Suggestion");
        // console.log(response.data.length);
        console.log(response.data.answer);
        console.log("Suggestion");

        setSuggestion(response.data.answer)

      });
  };

  const [cate, setCate] = useState([]);

  const [cateName, setCateName] = useState("");

  const fetch = async () => {
    console.log("runningggggggggggggggggggggggggggggg");
    await axios.get("http://10.0.2.2:3000/reading/interest/" + props.text).then(
      (response) => {
        console.log("eiei");
        console.log(response.data.reading[1]);
        setCate(response.data.reading);
        // setCateName(response.data.reading[0].categoryName);
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
    getSuggestion();
  }, []);
  console.log("This is id");
  console.log(props.text);

  // const goToAbout = () => {
  //    Actions.about()
  // }

  const ImageCards = () => {
    return <Image />;
  };

  return (
    // <FlatList
    //   numColumns={2}
    //   contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    //   data={cate}
    //   renderItem={({ item }) => (
    //     <View>
    //       {/* <TouchableOpacity onPress={() => goToContentScreen(item.category_id,1,item.reading_id,1)} > */}
    //         <ArticleCard
    //           // img={item.image}
    //           // title={item.title}
    //         />
    //       {/* </TouchableOpacity> */}
    //     </View>
    //   )}
    // />
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
        keyExtractor={(item) => item.reading_id}
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
