import * as React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { withFirebaseHOC } from "../config/Firebase";

function ItemDetailScreen({ navigation, firebase }) {

  function goToChat() {
    navigation.navigate("ChatDetail", {'name': 'Rich Man 666'});
  }

  function goToSellerProfile() {
    navigation.navigate("SellerProfile");
  }

  return (
    <View style={styles.container}>
      <Text>Item Details!</Text>
      <Button
        title="Go to Chat"
        onPress={goToChat}
        titleStyle={{
          color: "#F57C00"
        }}
        type="clear"
      />
      <Button
        title="Go to Seller Profile"
        onPress={goToSellerProfile}
        titleStyle={{
          color: "#F57C00"
        }}
        type="clear"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withFirebaseHOC(ItemDetailScreen);