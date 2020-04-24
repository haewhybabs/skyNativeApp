import React,{Component} from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Splash from './Splash';
import Login from './Login';
import Dashboard from './Dashboard';


class Route extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
           
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
        navigationOptions:() => ({
            
            headerBackTitle:null,
            
            
            
            
        }),
    },

    Dashboard:{
        screen:Dashboard,
        navigationOptions: () => ({
            title: null,
            headerBackTitle: null,
            headerShown: false
           
        }),
    },


    
}
const HomeStack =createStackNavigator(screens);

const Navigator=createAppContainer(HomeStack);



