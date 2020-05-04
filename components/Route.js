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


    Dashboard: {
        screen: Dashboard,
        navigationOptions: ({navigation}) => {

            return {
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

            }
            


        },
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
const CustomDrawerContentComponent = props =>(
    <Container>
        <Header style={{height:200,backgroundColor:'#fff'}}>
            <Body>
                <Image style={styles.drawerImage} source = {require('../assets/icon.png')}/>
            </Body>
            
        </Header>
        <Content>
            <DrawerItems {...props} />
        </Content>
    </Container>
)

const settings = 
{
        
}
const HomeStack = createDrawerNavigator(screens,{
    contentComponent:CustomDrawerContentComponent,
    initialRouteName:'Splash',
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle'
});

const Navigator = createAppContainer(HomeStack);

const styles = StyleSheet.create({
    
    drawerImage:{
        height:30,
        width:150,
        borderRadius:75
    }
  });