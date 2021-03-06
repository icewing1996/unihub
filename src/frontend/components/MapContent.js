import React,{ useState, Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Overlay, PROVIDER_GOOGLE } from 'react-native-maps';
import EventItem from '~/components/lists/EventItem';
import Carousel from 'react-native-snap-carousel';


export default class MapContent extends Component {
  
  state = {
    events: this.props.events,
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  }

  onRegionChange(region) {
    this._map.animateToRegion(region);
    // this.setState({ region });
  }

  handleMarkerPress = index => {
    this._carousel.snapToItem(index);
  }

  setIndex = index => {
    const { events } = this.state;
    const region = {
      ...events[index].latlng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    // this.setState({ region });
    this._map.animateToRegion(region);
  }
      
  render() {
    const sliderWidth = 1000;
    const itemWidth = 200;
    const { navigation } = this.props;
    const windowWidth = Dimensions.get('window').width;
    return (
      <View style={{flex:1    }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={ref => this._map = ref}
          style={styles.mapStyle}
          region={this.state.region}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.events.map((event, index) => (
            <Marker
              key={event.eventID}
              coordinate={event.latlng}
              title={event.eventName}
              description={event.description}
              onPress={() => this.handleMarkerPress(index)}
            />
          ))}
         
        </MapView>
        <View style={{ position:'absolute', top: 0, right: 0, flexDirection:'row', justifyContent: 'center' }}>
          <Carousel
            layout={"default"}
            ref={ref => this._carousel = ref}
            data={this.state.events}
            sliderWidth= {300}
            itemWidth={0.9*windowWidth}
            containerCustomStyle ={{ paddingBottom: 20}}
            renderItem={({ item }) => <EventItem navigation={ navigation } event={ item }/>}
            onSnapToItem = { index => this.setIndex(index) } />
        </View>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

