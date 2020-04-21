import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
import { FlatGrid } from "react-native-super-grid";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import axios from "axios";
import TimelineCard from "../components/TimelineCard";

const Content = (props) => {
  const [cate, setCate] = useState([]);

  const fetch = async () => {
    console.log("runningggggggggggggggggggggggggggggg");
    await axios
      .get("http://10.0.2.2:3000/reading/readingId/" + props.text)
      .then(
        (response) => {
          console.log("eieiContent");
          console.log(response.data.reading);
          setCate(response.data.reading);
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
  }, []);
  console.log("This is reading id");
  console.log(props.text);

  // const goToAbout = () => {
  //    Actions.about()
  // }
  return (
    <ScrollView>
      <FlatList
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        data={cate}
        renderItem={({ item }) => (
          <View>
            <TimelineCard
              img={item.image}
              title={item.content}
              imgHeight={102}
              width={162.75}
              titleHeight={40}
            />
          </View>
          // <ListItem
          //   onPressIn={() => setReadingId(item.reading_id)}
          //   onPress={goToContentScreen}
          //   key={item.category_id}
          //   title={item.title}
          //   leftIcon={{ name: item.icon }}
          //   bottomDivider
          //   chevron
          // />
        )}
      />
      {/* <FlatGrid
        items={cate}
        renderItem={({ item }) => (
          <ListItem
            key={item.category_id}
            title={item.content}
            leftIcon={{ name: item.icon }}
            bottomDivider
            chevron
          />
          
        )}
      /> */}
    </ScrollView>
  );
};
export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 20,
    color: "#000",
    marginTop: 50,
    fontWeight: "bold",
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
});
