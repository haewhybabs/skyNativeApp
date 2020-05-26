
import React,{Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
   } from 'react-native';
   import {Container} from 'native-base';
import Route from './components/Route';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
export default class App extends Component {
  constructor() {
    super()
    
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
