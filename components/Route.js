import React, { Component } from 'react';
import { 
    StyleSheet,
    Text,
    Image
     } from 'react-native';
  
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import Splash from './Splash';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Register from './Register';
import Loans from './Loans';
import History from './History';
import ContactUs from './ContactUs';
import AuthLoadingScreen from './AuthLoadingScreen';
import LoanAmount from './LoanAmount';

import{
    
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,Container,Content,Header,Body
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

        return ( 
            <Navigator/>
        );
    }
}

export default Route;




const AppScreens = {


    Dashboard: {
        screen: Dashboard,
        navigationOptions: ({navigation}) => {

            return {
                title: 'Dashboard',
                headerTitleStyle:{
                    color:'white'
                },
            

            }
            


        },
    },

   

    Profile: {
        screen: Profile,
        navigationOptions: () => ({
            title: 'Profile',
            
            // headerStyle: {
            //     backgroundColor: '#007bff',
                
            // },
            // headerTitleStyle:{
            //     color:'white'
            // },


        }),
    },

    Loans: {
        screen: Loans,
        navigationOptions: () => ({
            title: 'Request For Loan',
            


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

    LoanAmount: {
        screen: LoanAmount,
        navigationOptions: () => ({
            title: 'Loan Amount',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#007bff',
                
            },
            headerTitleStyle:{
                color:'white'
            },


        }),
    },

    ContactUs: {
        screen: ContactUs,
        navigationOptions: () => ({
            title: 'Contact us',
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

const AuthScreens = 
{
    Splash: {
        screen: Splash,
        navigationOptions:({navigation}) =>{
            return {
                drawerLabel: ()=> null,
                drawerLockMode:'locked-closed'
            }
        }
    },

    

    Login: {
        screen: Login,
        navigationOptions:({navigation}) =>{
            return {
                drawerLabel: ()=> null,
                drawerLockMode:'locked-closed'
            }
        }
    },
    Register: {
        screen: Register,
        navigationOptions:({navigation}) =>{
            return {
                drawerLabel: ()=> null,
                drawerLockMode:'locked-closed'
            }
        }
    },
}


const CustomDrawerContentComponent = props =>(
    <Container>
        <Header style={{height:200,backgroundColor:'#fff'}}>
            <Body>
                <Image style={styles.drawerImage} source = {require('../assets/skyloan-logo.jpg')}/>
            </Body>
            
        </Header>
        <Content>
            <DrawerItems {...props} />
        </Content>
    </Container>
)


const AccountNavigator = createDrawerNavigator(AppScreens,{
    contentComponent:CustomDrawerContentComponent,
    initialRouteName:'Dashboard',
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle'
});

const AuthNavigator = createStackNavigator(AuthScreens,{
    initialRouteName:'Splash',
    headerMode:"none",
    navigationOptions:({navigation}) =>{
        return {
            drawerLabel: ()=> null,
            drawerLockMode:'locked-closed'
        }
    }
});

const AppNavigator = createDrawerNavigator({
    Auth:AuthNavigator,
    App:AccountNavigator,
    AuthLoadingScreen:AuthLoadingScreen
});

const Navigator = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    
    drawerImage:{
        height:70,
        width:150,
        borderRadius:75
    }
  });