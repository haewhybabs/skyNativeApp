import React,{Component} from 'react';
import { 
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  ActivityIndicator
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,Text,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root
} from 'native-base';
import {apiUrl,token,vendorImage} from '../Config';

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
          
        }
       
    }

    componentDidMount(){
        let userDetails = this.props.user;
        if(userDetails.token){
            //Redirect to user-profile
            //For Now we will use cart
            this.props.navigation.navigate('Cart');
        }
    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
    }

    registerHandler = () =>{
            
        this.props.navigation.navigate('Register');
    }

    

    loginHandler = () => {
        Keyboard.dismiss();
        this.showLoader();
        var value = this.state;

        if (value.email!='' || value.password!=''){

            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (reg.test(value.email) === false) {
                this.hideLoader();
                
                Toast.show({
                    text:'Invalid Email',
                    buttonText:'Okay',
                    style:{backgroundColor:'gray'}
                   
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
                    
                    if (!response.ok) {                      
                        throw new Error(                    
                            "HTTP status " + response.status 
                        );                                   
                    }              
                                    
                    return response.json();      
                })
                .then((contents)=>{

                    if(contents.token){
                        
                        AsyncStorage.setItem('userDetails',
                        JSON.stringify({
                            name:contents.name,
                            email:contents.email,
                            user_id:contents.id,
                            role_id:contents.role_id,
                        }));

                        this.props.saveUserDetailsAction({
                            name:contents.name,
                            email:contents.email,
                            user_id:contents.id,
                            role_id:contents.role_id,
                            token:contents.token

                        });
                        this.props.navigation.navigate('Checkout');
                        
                    }
                    else{

                        
                        Toast.show({
                            text:'Invalid Email or Password',
                            buttonText:'Okay',
                            style:{backgroundColor:'gray'}
                           
                        })

                        this.hideLoader();
                    }
                })
                .catch((error)=>{
                    this.hideLoader();

                    Toast.show({
                        text:'Ops!! Internet problem',
                        buttonText:'Okay',
                        style:{backgroundColor:'gray'}
                       
                    })
                    console.log(error)
                })
              
            }
            
                

        }

        else{
            this.hideLoader();
            Toast.show({
                text:'The fields are required',
                buttonText:'Okay',
                style:{backgroundColor:'gray'}
               
            })
        }

    }

    
    render(){

        

        return ( 

            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#ffb200" animating  />
            </View>
            :

            <Root>
             
                <Container>
                    <Content>
                        <Form>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input onChangeText={(email) => this.setState({email})}/>
                            </Item>
                            <Item floatingLabel last>
                                <Label>Password</Label>
                                <Input secureTextEntry onChangeText={(password) => this.setState({password})}/>
                            </Item>

                            <View style={{marginTop:50}}>
                                <Button warning full onPress={this.loginHandler}><Title>Login</Title></Button>
                            </View>
                            <View>
                                <Row>
                                    <Text style={{marginLeft:10, marginTop:10}}>You don't have an account?</Text>
                                    <TouchableOpacity onPress={this.registerHandler}>
                                        <Text style={{marginLeft:10, marginTop:10,color:'red'}}>Register here</Text>
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
});


const mapStateToProp = (state) =>{

    return {
        cart:state.cart,
        user:state.user
    }
}

const mapActionstoProps = (dispatch) => {
    return bindActionCreators({
        saveUserDetailsAction
    },dispatch)
}

export default connect(mapStateToProp,mapActionstoProps)(Login);
