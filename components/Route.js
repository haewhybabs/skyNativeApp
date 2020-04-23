import React,{Component} from 'react';

import { createStackNavigator } from 'react-navigation-stack';


import {Text,TouchableOpacity} from 'react-native';
import{Title} from 'native-base';
import { createAppContainer } from 'react-navigation';


import Splash from './Splash';
import Login from './Login';


class Route extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
            timePassed:false
        }
  
       
    }

    
    
    render(){

        return (  
            <Navigator/>
        );
    }
}

export default Route;

const screens = {

    Splash: {
        screen: Splash,
        header: null,
        navigationOptions: () => ({
            title: null,
            headerBackTitle: null,
            headerShown: false
           
        }),
    },
    
    Login:{
        screen:Login,
        navigationOptions:({navigation}) => ({
            
            headerBackTitle:null,
            
            
            
            
        }),
    },
    
}
const HomeStack =createStackNavigator(screens);

const Navigator=createAppContainer(HomeStack);
