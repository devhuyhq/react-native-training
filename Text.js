import React, { Component, ReactNode } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class AppText extends Component {
  render(): ReactNode {
    const { style } = this.props;
    return (
      <Text {...this.props} style={[styles.text, style]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "red"
  }
});
