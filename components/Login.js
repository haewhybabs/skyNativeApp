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
import {saveUserDetailsAction} from '../redux/actions';

class Login extends Component{
    static navigationOptions = {
        drawerLabel:()=>null
    }
    constructor(){
        super()

        this.state = {
            email:'',
            password:'',
            isLoading:false,
            username:''
          
        }
       
    }

    async componentDidMount(){

            let userDetails = await AsyncStorage.getItem('userDetails');
            let user = JSON.parse(userDetails);
            this.setState({
                username:user.fullname,
                email:user.email,
            })

    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
    }

    

    registerHandler = () =>{

        if(!this.props.route){
            this.props.navigation.navigate('Register');
        }

        else{
        
            
            this.props.route('Register');
        }
    }

    gotoDashboard = () =>{
        if(!this.props.route){
            this.props.navigation.navigate('Dashboard');
        }

        else{
        
            
            this.props.route('Dashboard');
        }
    }

    errorInConnection = () => {
        this.hideLoader();

        Toast.show({
            text:'Ops!! Network Connection Problem',
            buttonText:'Okay',
            style:{backgroundColor:'red'}
            
        })
    }


    loginHandler = () => {
        Keyboard.dismiss();
        this.showLoader();
        var value = this.state;

        if (value.email!='' && value.password!=''){

            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (reg.test(value.email) === false) {
                this.hideLoader();
                
                Toast.show({
                    text:'Invalid Email',
                    buttonText:'Okay',
                    style:{backgroundColor:'red'}
                   
                })
            }
            else {
                
                fetch(apiUrl+'login',{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json','token':token
                    },
                    body: JSON.stringify({
                        email: value.email,
                        password: value.password,
                    })
                    
                })
                .then(response => {
                    
                          
                                    
                    return response.json();      
                })
                .then((contents)=>{

                    if(contents.token){
                        
                        AsyncStorage.setItem('userDetails',
                        JSON.stringify({
                            fullname:contents.fullname,
                            email:contents.email,
                            user_id:contents.idusers,
                            role_id:contents.role_id,
                        }));

                        this.props.saveUserDetailsAction({

                            fullname:contents.fullname,
                            email:contents.email,
                            user_id:contents.idusers,
                            role_id:contents.role_id,
                            token:contents.token

                        });
                        this.gotoDashboard()
                    }
                    else{

                        this.hideLoader();
                        Toast.show({
                            text:'Invalid Email or Password',
                            buttonText:'Okay',
                            style:{backgroundColor:'red'}
                           
                        })

                        
                    }
                })
                .catch((error)=>{
                    this.errorInConnection();
                    
                })
              
            }
            
                

        }

        else{
            this.hideLoader();
            Toast.show({
                text:'The fields are required',
                buttonText:'Okay',
                style:{backgroundColor:'red'}
               
            })
        }

    }

    
    render(){

        

       
        return ( 

            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#00CCFF" animating  />
            </View>
            :


            
             
                <Root>
                    <Container>
                        <Content padder>
                            
                                
                            <View>
                                {this.state.email=='' ?
                                    
                                <Text style={{marginTop:100, color:'#00CCFF', fontSize:30,alignSelf:'flex-start', marginLeft:5,fontWeight:'bold'}}>Welcome ,</Text>
                                :

                                <Text style={{marginTop:100, color:'#00CCFF', fontSize:30,alignSelf:'flex-start', marginLeft:5,fontWeight:'bold'}}>Welcome {this.state.username},</Text>
                                    
                            
                                }
                                
                                <Text style={{color:'black',fontWeight:'bold',alignSelf:'flex-start',marginLeft:5,fontSize:20}}>Sign in to continue</Text>
                            </View>    
                                
                                <Form style={{marginTop:90}}>
                                {this.state.email=='' ?
                                    
                                    <Item floatingLabel>
                                        <Label>Email</Label>
                                        <Input onChangeText={(email) => this.setState({email})}/>
                                    </Item>
                                :

                                    <Item floatingLabel>
                                        <Label>Email</Label>
                                        <Input onChangeText={(email) => this.setState({email})} value={this.state.email}/>
                                    </Item>
                            
                            
                                }
                                   
                                    <Item floatingLabel last>
                                        <Label>Password</Label>
                                        <Input secureTextEntry onChangeText={(password) => this.setState({password})}/>
                                    </Item>

                                    <View style={{marginTop:50}}>
                                        <Button rounded primary onPress={this.loginHandler} style={{width:'100%'}}>
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
                </Root>
            
           
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

const mapStateToProp = (state) =>{

    return {
        user:state.user
    }

    
}

const mapActionstoProps = (dispatch) => {
    return bindActionCreators({
        saveUserDetailsAction
    },dispatch)
}


export default connect(mapStateToProp,mapActionstoProps)(Login);
