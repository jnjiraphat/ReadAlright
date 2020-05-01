import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import HeaderText from "../components/HeaderText";
import ButtonClick from "../components/ButtonClick";
// import whiteCardStyle from "../components/WhiteCardStyle";
// import { useFonts } from "@use-expo/font";
import TestBox from "../components/TestBox";
import Test from "../API/TestAPI";

const PreTest = () => {
  const [quizs, setQuiz] = useState([]);
  const Quiz = async () => {
    const data = await Test();
    setQuiz(data.quiz);
  };
  console.log("This is Quiz");
  console.log(quizs);

  useEffect(() => {
    Quiz();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const sections = [
    {
      question: "Question1",
      key: "1",
      data: [
        {
          key: "1",
          list: [
            {
              choice: "Carrot",
              color: "Orange",
            },
            {
              choice: "Cabbage",
              color: "Purple",
            },
            {
              choice: "Strawberry",
              color: "Red",
            },
            {
              choice: "Blueberry",
              color: "Blue",
            },
          ],
        },
      ],
    },
    {
      question: "Question2",
      key: "2",
      data: [
        {
          key: "2",
          list: [
            {
              choice: "Apple",
              color: "Green",
            },
            {
              choice: "Banana",
              color: "Yellow",
            },
            {
              choice: "Strawberry",
              color: "Red",
            },
            {
              choice: "Blueberry",
              color: "Blue",
            },
          ],
        },
      ],
    },
  ];

  // let [fontsLoaded] = useFonts({
  //   // "PTSansCaption-Regular": require("../assets/font/PTSansCaption-Regular.ttf"),
  //   "PTSansCaption-Bold": require("../assets/font/PTSansCaption-Bold.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return console.log("Font not load");
  // } else {

  // const renderSectionListItem = ({ item }) => {
  //   return (
  //     <FlatList
  //       data={item}
  //       numColumns={2}
  //       contentContainerStyle={{ flexDirection: "row" }}
  //       renderItem={({ item }) => (
  //         <ButtonClick
  //           // onPressAction={}
  //           colorsStart="#E9B0FF"
  //           colorsEnd="#8A63E5"
  //           // padding=
  //           radius={10}
  //           height={39}
  //           width={112}
  //           fontSize={14}
  //           // fontWeight="normal"
  //           fontcolor="#000"
  //           text={item}
  //           marginBottom={10}
  //           marginTop={10}
  //         />
  //       )}
  //     />
  //   );
  // };

  // if (quizs.length>0) {
  //   console.log(quizs.length)

  return (
    <LinearGradient
      colors={["#FFB382", "#F07590"]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
    >
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.textLayout}>
            <HeaderText text="Pre-Test" />
            <Text style={styles.subHeader}>
              Fill the gaps with the correct word from the box.
            </Text>
          </View>
          <TestBox quizs={quizs} />
          <ButtonClick
            text="Submit"
            fontSize={24}
            fontWeight="bold"
            fontcolor="#000000"
            height={39}
            width={245}
            radius={30}
            padding={0}
            marginBottom="10%"
            onPressAction={() => {
              setModalVisible(true);
            }}
            // shadowRadius={30}
            colorsStart="#7EF192"
            colorsEnd="#2DC897"
          />
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <LinearGradient
                colors={["#7EB2F0", "#8A63E5"]}
                style={styles.modalView}
              >
                <Text style={styles.header}>
                  Your Level of our suggestion is
                </Text>
                {/* circleLayout */}
                <LinearGradient
                  colors={["#FFD387", "#FCDE58"]}
                  style={styles.circleLayout}
                >
                  <Text style={styles.modalText}>A1</Text>
                </LinearGradient>
                {/* circleLayout */}

                {/* next Step */}
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <LinearGradient
                    colors={["#FFD387", "#FCDE58"]}
                    style={styles.openButton}
                  >
                    <Text style={styles.textStyle}>Next Step</Text>
                  </LinearGradient>
                </TouchableOpacity>
                {/* next Step */}
              </LinearGradient>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </LinearGradient>
  );
  // } else {
  //   return (
  //     <View>
  //       <Text>Loading</Text>
  //     </View>
  //   );
  // }

  // }
};
export default PreTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeader: {
    marginTop: "5%",
    fontSize: 16,
    // fontFamily: "PTSansCaption-Bold",
  },
  textLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%",
    width: Dimensions.get("window").width / 1.25,
  },
  whiteCard: {
    // flex: 1,
    width: Dimensions.get("window").width / 1.15,
    // justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    marginVertical: 20,
    paddingVertical: 20,
  },
  LayoutChoice: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("window").width / 1.35,
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    width: Dimensions.get("window").width / 1.35,
    // height: Dimensions.get("window").height / 2.3,
    margin: 20,
    // backgroundColor: "white",
    borderRadius: 5,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    // backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 90,
  },
  circleLayout: {
    borderRadius: 170 / 2,
    width: 170,
    height: 170,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
  },
});
