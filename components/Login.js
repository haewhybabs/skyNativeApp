import React,{Component} from 'react';
import { 
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  ActivityIndicator,
  Text
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root
} from 'native-base';
import {apiUrl,token,vendorImage} from '../Config';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUserDetailsAction} from '../redux/cart_action';

class Login extends Component{
    
    constructor(){
        super()

        this.state = {
            email:'',
            password:'',
            isLoading:false,
            loading:true,
          
        }
       
    }

    async componentDidMount(){
        await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
        })
        this.setState({ loading: false })

    }


    registerHandler = () =>{
            
        this.props.navigation.navigate('Register');
    }

    gotoDashboard = () =>{
        this.props.navigation('Dashboard');
    }

    
    render(){

        console.log(this.props.navigation);

        return ( 
            
             
                <Container>
                    <Content padder>
                        
                            
                        <View>
                            <Text style={{marginTop:100, color:'#007bff', fontSize:30,alignSelf:'flex-start', marginLeft:5,fontWeight:'bold'}}>Welcome,</Text>
                            <Text style={{color:'black',fontWeight:'bold',alignSelf:'flex-start',marginLeft:5,fontSize:20}}>Sign in to continue</Text>
                        </View>    
                            
                            <Form style={{marginTop:90}}>
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input onChangeText={(email) => this.setState({email})}/>
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Password</Label>
                                    <Input secureTextEntry onChangeText={(password) => this.setState({password})}/>
                                </Item>

                                <View style={{marginTop:50}}>
                                    <Button rounded primary onPress={this.gotoDashboard} style={{width:'100%'}}>
                                        <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Login</Text>
                                    </Button>
                                </View>
                                <View>
                                    <Row>
                                        <Text style={{marginLeft:10, marginTop:10}}>You don't have an account?</Text>
                                        <TouchableOpacity onPress={this.registerHandler} >
                                            <Text style={{marginLeft:10, marginTop:10,color:'#e83e8c'}}>Register here</Text>
                                        </TouchableOpacity>
                                    </Row>
                                </View>
                            </Form>
                    
                        
                        
                    </Content>
                </Container>
                
            
           
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  textLeft:{
    alignSelf: 'flex-start',
    marginLeft:5,
  }
});




export default Login;
