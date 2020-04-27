import React,{Component} from 'react';

import { 
  StyleSheet,
  View,

  Text
   } from 'react-native';

import{
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,Footer,FooterTab
} from 'native-base';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Splash from './Splash';
import Login from './Login';
import Dashboard from './Dashboard';


class FooterScreen extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
           
        }
  
       
    }

    DashboardHandler = () =>{
        this.props.navigation.navigate('Dashboard');
    }
    
    LoansHandler = () =>{
        this.props.navigation.navigate('Loans');
    }

    LoanHistoryHandler = () =>{
        this.props.navigation.navigate('History');
    }

    ProfileHandler = () =>{
        this.props.navigation.navigate('Profile');
    }

    render(){
        return(
            <Footer>
                <FooterTab>
                    <Button vertical onPress={this.DashboardHandler}>
                        <Icon name="apps" />
                        <Text>Dashboard</Text>
                    </Button>
                    <Button vertical onPress={this.LoansHandler}>
                        <Icon active name="navigate" />
                        <Text>Loan Request</Text>
                    </Button>

                    <Button vertical onPress={this.LoanHistoryHandler}>
                        <Icon active name="navigate" />
                        <Text>Loan History</Text>
                    </Button>
                    <Button vertical onPress={this.ProfileHandler}>
                        <Icon name="person" />
                        <Text>Profile</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

export default FooterScreen;;