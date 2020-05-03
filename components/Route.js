import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Splash from './Splash';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Register from './Register';
import Loans from './Loans';
import History from './History';

import{
    
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail
} from 'native-base';


class Route extends Component {

    constructor() {
        super()

        this.state = {
            dataSource: [],
            isLoading: true,

        }


    }



    render() {

        return ( <
            Navigator / >
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

    Login: {
        screen: Login,
        navigationOptions: () => ({

            title: null,
            headerBackTitle: null,
            headerShown: false




        }),
    },
    Register: {
        screen: Register,
        navigationOptions: () => ({

            title: null,
            headerBackTitle: null,
            headerShown: false




        }),
    },


    Dashboard: {
        screen: Dashboard,
        navigationOptions: () => ({
            title: 'Dashbaord',
            headerTitleStyle:{
                color:'white'
            },
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#007bff',
                
            },

            headerLeft:(
                <Button transparent>
                    <Icon name='menu' style={{color:'#fff'}} />
                </Button>
            )


        }),
    },

   

    Profile: {
        screen: Profile,
        navigationOptions: () => ({
            title: 'Profile',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#007bff',
                
            },
            headerTitleStyle:{
                color:'white'
            },


        }),
    },

    Loans: {
        screen: Loans,
        navigationOptions: () => ({
            title: 'Request For Loan',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#007bff',
                
            },

            headerTitleStyle:{
                color:'white'
            },


        }),
    },

    History: {
        screen: History,
        navigationOptions: () => ({
            title: 'Loan History',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#007bff',
                
            },
            headerTitleStyle:{
                color:'white'
            },


        }),
    },



}
const HomeStack = createStackNavigator(screens);

const Navigator = createAppContainer(HomeStack);