import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import Text from "./Text";
import axios from "axios";
import I18n, { getLanguages } from "react-native-i18n";

I18n.fallbacks = true;

I18n.translations = {
  en: {
    greeting: "Hi!"
  },
  fr: {
    greeting: "Bonjour!"
  },
  vi: {
    greeting: "Xin chao"
  }
};

getLanguages().then(languages => {
  I18n.locale = languages;
});

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      imageVisible: true,
      coins: []
    };
  }

  renderImage = () => {
    const { imageVisible } = this.state;
    if (imageVisible) {
      return (
        <Image style={styles.image} source={require("./right-arrow.png")} />
      );
    } else {
      return <Text>Here</Text>;
    }
  };

  componentDidMount = () => {
    fetch("https://api.coinmarketcap.com/v2/listings/")
      .then(response => response.json())
      .then(data =>
        this.setState({
          coins: data.data
        })
      );
    // axios
    //   .get("https://api.coinmarketcap.com/v2/listings/")
    //   .then(data =>
    //     this.setState({
    //       coins: data.data.data
    //     })
    //   )
    //   .catch(err => alert(err.message));
  };

  renderCoin = ({ item }) => {
    return <Text>{item.name}</Text>;
  };

  render() {
    console.log("render");
    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          data={this.state.coins}
          renderItem={this.renderCoin}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40
  },
  bold: {
    fontWeight: "bold",
    color: "black"
  },
  image: {
    width: 50,
    height: 50,
    tintColor: Platform.OS === "android" ? "red" : "yellow"
  }
});
