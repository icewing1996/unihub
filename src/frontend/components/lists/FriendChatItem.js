import * as React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Divider, Title } from 'react-native-paper';



const deviceWidth = Dimensions.get('window').width;
const avatorsize = 60
function FriendChatItem (props) {
  
  return(
  <View stlye={styles.cardContianer}>
    <TouchableOpacity style={{ flex:1 }} onPress={props.onPress} props={props}>  
      <View style={styles.cardContent}>
        <View style={{flex:1 }}>
          <Image source={{uri: props.user.uri}}
                style={styles.avator} />
        </View>
        <View style={{ flex:4, alignItems:'flex-start'}}>
          <Title>{ props.user.userName }</Title>
          <Text style={styles.chatText}> most recent chat </Text>
        </View>
      </View>
      <Divider style={{ height:0.3 }}/>
    </TouchableOpacity>
  </View>
)
};

export default FriendChatItem;
const styles = StyleSheet.create({
  cardContianer: {
    width: deviceWidth
  },
  avator:{
    width: avatorsize, 
    height: avatorsize, 
    borderRadius: avatorsize/2 
  },
  cardContent:{
    marginHorizontal: 16,
    marginVertical: 10,
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width:'90%' 
  },
  chatText:{
    fontFamily:'Avenir-Light', 
    fontSize: 14, 
    marginVertical: 5 
  }
})