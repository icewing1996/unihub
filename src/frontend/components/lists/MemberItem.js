import React from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width

const MemberItem = ({ name, uri, onPress }) => (
  <View>
    <TouchableOpacity 
      style={{
              alignContent:"center", 
              alignItems:'center', 
              marginHorizontal: screenWidth*0.025, 
              width: screenWidth*0.2,
              height: 80
            }}
      onPress={onPress}>
      <Image source={{uri: uri }}
            style={{
                      borderRadius: 25,
                      width: 50,
                      height: 50,
                     
                    }}
      />
      <Text style={{fontFamily:'Avenir-Light',
                    fontWeight:'500',
                    fontSize:12}}>
            {name}
      </Text>
    </TouchableOpacity>
  </View>
);

export default MemberItem;