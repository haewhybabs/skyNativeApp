import React,{Component} from 'react';

import { 
  StyleSheet,
  View,

  Text
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail
} from 'native-base';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Splash from './Splash';
import Login from './Login';
import Dashboard from './Dashboard';


class HeaderScreen extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
           
        }
  
       
    }

    render(){
        return(
            <Header style={{backgroundColor:'#007bff'}}>
                <Left>
                   
                    
                    
                        <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                  
                    
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                
            </Header>
        );
    }
}

export default HeaderScreen;;