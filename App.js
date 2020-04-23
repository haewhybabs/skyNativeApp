import React,{Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity
   } from 'react-native';
   import {Container, Header, Content
    , Footer, FooterTab,Button, Subtitle} from 'native-base';
import Route from './components/Route';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { NavigationContainer } from 'react-navigation';
import reducers from './reducers';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      dataSource:[],
      isLoading:true,
      loading:true,
    }
  }

  render(){
    return (
      <Container>
        <Provider store={store}>
          <Route/>
        </Provider>
      </Container>
    );
  }
}

const store = createStore(reducers);



