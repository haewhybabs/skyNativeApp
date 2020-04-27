import React,{Component} from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Splash from './Splash';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';

import Loans from './Loans';
import History from './History';


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

    Profile:{
        screen:Profile,
        navigationOptions: () => ({
            title: 'Profile',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#00CCFF'
            }
           
           
        }),
    },

    Loans:{
        screen:Loans,
        navigationOptions: () => ({
            title: 'Request For Loan',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#00CCFF'
            }
           
           
        }),
    },

    History:{
        screen:History,
        navigationOptions: () => ({
            title: 'Loan History',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#00CCFF'
            }
           
           
        }),
    },


    
}
const HomeStack =createStackNavigator(screens);

const Navigator=createAppContainer(HomeStack);



