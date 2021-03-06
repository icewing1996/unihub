import React, { Component } from "react";
import {  SearchBar } from "react-native-elements";
class Search extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Search Here..."
        onChangeText={this.updateSearch}
        round
        containerStyle = {{ padding:0,backgroundColor:'#f1f6f7',  borderBottomColor: 'transparent', borderTopColor: 'transparent', borderRadius:20, alignItems:'center', justifyContent:'center' }}
        inputContainerStyle ={{ backgroundColor:'transparent',alignItems:'center', justifyContent:'center', borderRadius:20, height:30, minHeight:20, paddingTop:5}}
        inputStyle={{ fontFamily: 'Avenir-Light', fontWeight: '500', color:'black', fontSize: 15 }}
        value={search}
      />
    );
  }
}
export default Search; 