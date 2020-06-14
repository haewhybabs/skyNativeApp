import React,{Component} from 'react';

import { 
  StyleSheet,
  View,
  Text,ActivityIndicator
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    Input,Label,Row,Toast,Root,Thumbnail,Textarea, Form ,Button,Content
} from 'native-base';
import {apiUrl,token,vendorImage} from '../Config';
import {connect} from 'react-redux';
import FooterScreen from './Footer';
class AuthLoadingScreen extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:false,
        }

        this._checkToken();
    }

    _checkToken = async () =>
    {
        console.log('user',this.props.user)
        
        if(this.props.user){
            this.props.navigation.navigate("App")
        }
        else{
            this.props.navigation.navigate("Auth");
        }
    }

    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#00CCFF" animating  />
            </View>
        );
    }
}

const mapStateToProp = (state) =>{
    return { 
        user:state.user,
    }
  }
  
  
export default connect(mapStateToProp)(AuthLoadingScreen);