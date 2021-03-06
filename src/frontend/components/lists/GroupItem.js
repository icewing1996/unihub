import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';




function GroupItem ({ group, navigation })  {
  return(
  <View style={{margin:5, maxWidth:'95%', flex:1, marginVertical:10 }} onPress={()=>navigation.navigate('GroupDetail',{ group })}>
    <TouchableOpacity style={{flex:1}} onPress={ () => navigation.navigate('GroupDetail',{ group }) }>
      <Card.Content style={{padding:0}}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width:'90%' }}>
            <View style={{shadowOffset:{height:10, width:1}, shadowColor:'grey', shadowOpacity: 0.5,shadowRadius:10, elevation: 3}}>
              <Image source={{uri: group.uri}}
                  style={{width: 80 , height: 80, borderRadius:5 }} />
            </View>
          <View style={{ flex:3, marginHorizontal:20, justifyContent:'space-around'}}>
          <Title>{ group.groupName }</Title>
          { (group.numMember === 1) ? 
           <Text>{ group.numMember } member</Text>
           :
           <Text>{ group.numMember } members</Text>
          } 
          </View>

          {/* <Button style={{}}>
            <Text>join</Text>
          </Button> */}
        </View>
      </Card.Content>
      <Divider style={{marginTop:15 , height:0.5}}/>
    </TouchableOpacity>
  </View>
  
)
};

export default GroupItem;