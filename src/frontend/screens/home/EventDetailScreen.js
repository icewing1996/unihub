import React from 'react';
import { StyleSheet, ScrollView, Share, View, ActivityIndicator, Dimensions, Image, StatusBar } from 'react-native';
import { withFirebaseHOC } from "~/../firebase";
import { Text } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FAB, Portal, Provider } from 'react-native-paper';
import  EventTabNavigator  from '../../navigation/EventTabNavigator'

const users = [
  {
    userName: 'Yufan Wang',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu123',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },
  {
    userName: 'Jimmy Wei',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu234',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },

  {
    userName: 'Dawn Yao',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu345',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },

  {
    userName: 'Eric Li',
    numGroups: 10,
    numFriends: 10,
    userID: 'Uu456',
    major: 'Mechanical Enginnering',
    uri: 'https://picsum.photos/700',
    description: 'Cool Guy',
    classyear: 2020
  },



];





  const deviceWidth = Dimensions.get('window').width;
  const FabGroup = (props) => {
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const share = (props) => {
      const { eventName, description, uri } = props;
      Share.share({
        // message: `${props.description}`,
        title: `Check out this event on UniHub - ${props.eventName}`,
        url: props.uri,
      });
    };
  
  return (
    <Provider>
      <Portal>
        <FAB.Group
          // style={{paddingBottom: 50,paddingRight: 30}}
          fabStyle={{backgroundColor:'white'}}
          open={open}
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'block-helper',
              label: 'report',
              onPress: () => alert('reported!'),
            },
            {
              icon: 'share',
              label: 'Share',
              onPress: () => share(event) ,
            },
            {
              icon: props.isAddedtoCalendar ? 'calendar-remove' :'calendar',
              label: props.isAddedtoCalendar ? 'Quit this event': 'Join this event',
              onPress: props.setCalendar,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};







function ResizeImage (uri)  {
  return(
    <View style={{flex: 1,
                marginVertical: 10,
                backgroundColor: 'blue',
                flexDirection: 'row',
                flexWrap: 'wrap'}}>
        <Image
          source={ uri }
          style={ styles.image }
          PlaceholderContent={<ActivityIndicator />}
          > 
        </Image>
    </View>
  )
  
}



const long_text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`

function LocationLogo({location}){
  if (location === 'Online') return <MaterialIcons name='language'  size={25} color='grey'/>
  return <MaterialIcons name='location-on'  size={25} color='grey' />
} 


const EventDetailScreen = ({ route, navigation, firebase }) => {
  const { event } = route.params;
  const {
    eventName,
    description,
    tags,
    location,
    time,
    contact,
    uri,
    participants,
    filters,
    creator,
    host,
  } = event;

  const { groupName } = host;
  const { startDate, endDate } = time;
  let startDateStr; 
  try {
    startDateStr = startDate.toDate().toLocaleDateString("en-US");
  }
  catch (e) {
    startDateStr = startDate.toLocaleDateString("en-US");
  }

  const [isAddedtoCalendar, setCalendar] = React.useState(false)
  const  onSetCalendar = () => setCalendar(!isAddedtoCalendar);


  return (
    <View style={{flex:1, flexDirection:'column'}}>
      <StatusBar hidden={true}/>
      <ScrollView style={styles.scrollView}
      showsVerticalScrollIndicator={false}>
        <View style={{flex:1}}>
          <ResizeImage          
            uri ={ uri }
          />
          <View style={{ marginLeft:20 }}> 
            <View style = {{ flex:1, flexDirection:'row', alignContent:'space-around', alignItems:'center'}}>
              <View style={{}}>
                <Text style={styles.eventName}>
                  { eventName }
                </Text>
              </View>

              


            </View> 
            <Text style={styles.authorName}>
              by{'  '}{ groupName }{'  '}{ creator.displayName }
            </Text>
          </View>

          <View style={{marginHorizontal:20}}>
            <View style={{margin:5, flexDirection:'row', alignContent:'center', alignItems:'center'}}>
              <MaterialCommunityIcons 
                name={ isAddedtoCalendar ? 'calendar-check': 'calendar'}  
                size={25}  
                color={ isAddedtoCalendar ? '#1c7085' : 'grey' }/>
              <Text 
                style={{
                  color: isAddedtoCalendar ? '#1c7085' : '#2c2d2d', 
                  fontFamily:'Avenir-Light',
                  fontSize:18,
                  marginLeft:30}}>
                { startDateStr }
              </Text>
            </View>
            <View style={{margin:5, flexDirection:'row', alignContent:'center', alignItems:'center'}}>
              <LocationLogo location = { location }/>
              <Text style={styles.eventInfo}>
                { location }
              </Text>
            </View>
            <Text style={styles.description}>
              { description }
            </Text>
          </View>
        </View>

        <View style={{ alignSelf: 'stretch', flex:1, marginTop: 50 }}>
          <EventTabNavigator user={users}/>
        </View>
          
      </ScrollView>
      
      

      <FAB
        style={styles.fab}
        small
        icon="arrow-left"
        onPress={() => navigation.goBack()}/>
      
      <FabGroup 
      setCalendar = {onSetCalendar} 
      isAddedtoCalendar={isAddedtoCalendar}
      uri={uri}
      eventName={eventName}
      description={description}/>
      </View>
  );
}

export default withFirebaseHOC(EventDetailScreen);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  sectiontitle:{
    fontFamily:'Avenir-Heavy',
    fontSize: 20,
    marginVertical: 5
  },
  authorName: {
    color:'#1c7085', 
    marginLeft:10,
    marginBottom:10,
    fontFamily:'Avenir-Book',
    fontSize: 10,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 1.5,
    lineHeight: 16,
    textTransform: "uppercase",
  },
  eventName: {
    fontFamily:'Avenir-Light',
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 5
    
  },
  groupName: {
    fontFamily:'Avenir-Light'
  },
  image: {
    width: deviceWidth,
    height: deviceWidth*0.75
  },
  eventInfo: {
    fontFamily:'Avenir-Light',
    fontSize:18,
    marginLeft:30,
    color: '#2c2d2d'
  },
  description: {
    fontFamily:'Avenir-Light',
    fontSize: 16,
    marginVertical:5,
    lineHeight: 24
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    top: 20,
    backgroundColor:'white'
  },
  
});