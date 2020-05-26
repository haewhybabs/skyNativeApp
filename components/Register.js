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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUserDetailsAction} from '../redux/actions';

class Register extends Component{
    
    constructor(){
        super()

        this.state = {

            email:'',
            password:'',
            passwordConfirmation:'',
            fullname:'',
            phoneNumber:'',
            isLoading:true,
            
        }
  
       
    }
    componentDidMount(){
        this.setState({
            isLoading:false
        })
    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
    }


    loginHandler = () => {

        this.props.navigation.navigate('Login');
    }

    errorInConnection = () => {
        this.hideLoader();

        Toast.show({
            text:'Ops!! Connection Problem',
            buttonText:'Okay',
            style:{backgroundColor:'red'}
            
        })
    }

    submitValidation = () =>{
        
        let state = this.state;
        let nameError = state.nameError;
        let emailError= state.emailError;
        let phoneNumberError = state.phoneNumberError;
        let passwordError =state.passwordError;
        let passwordConfirmationError=state.passwordConfirmationError

        if(state.email == ""){
            emailError = 'Email cannot be empty';
        }
        if(state.fullname ==""){
            nameError='Name Field cannot be empty';
        }
        if(state.password==""){
            passwordError= "Password Field cannot be empty";
        }
        if(state.passwordConfirmation==""){
            passwordConfirmationError="Password confirmation field cannot be empty";
        }
        if(state.phoneNumber==""){
            phoneNumberError="Phone number field cannot be empty";
        }

        this.setState({
            nameError,
            passwordError,
            passwordConfirmationError,
            emailError,
            phoneNumberError
        });
    }

    registerHandler = () =>
    {
        this.submitValidation();
        
        let state = this.state
        if(this.state.emailError=="" && this.state.nameError =="" && this.state.phoneNumberError=="" && this.state.passwordError=="" && this.state.passwordConfirmationError==""){
            this.showLoader();
            fetch(apiUrl+'register',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json','token':token

                },
                body: JSON.stringify({
                    fullname:state.fullname,
                    email: state.email,
                    password: state.password,
                    password_confirmation:state.passwordConfirmation,
                    phone_number:state.phoneNumber
                })
                
            })
            .then(response => {
                 
                                
                return response.json();   
                  
            })
            .then((contents)=>{
                this.hideLoader();
                
                if(contents.errors){
                    
                    Toast.show({
                        text:contents.message,
                        buttonText:'Okay',
                        style:{backgroundColor:'red'}
                        
                    })  
                }
                else{
                    Toast.show({
                        text:'Success!!!!',
                        buttonText:'Okay',
                        style:{backgroundColor:'green'},
                        duration:3000
                        
                    })  
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
                        this.props.navigation.navigate('Dashboard');

                }
            })
            .catch((error)=>{
                this.errorInConnection();
                this.setState({
                    password_confirmation:'',
                    password:''
                })
            })
        
        }
        
    }

    validateName = (fullname) => {
        if(fullname == ""){
            this.setState({
                nameError:'Name field cannot be empty'
            })
        }
        else{
            this.setState({
                nameError:'',
                fullname
            })
        }
        
    }

    validateMail = (email) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (reg.test(email) === false || email=="") 
            {
                
                this.setState({

                    emailError:'Email is not yet valid'
                })
            }
            else{
                this.setState({
                    emailError:'',
                    email
                })
            }
    }

    passwordValidation = (password) =>
    {
        if(password.length<=6 || password ==""){
            this.setState({

                passwordError:'Password must be greater than 6'
            })
        }
        else{
            this.setState({
                password,
                passwordError:''
            })
        }
        
    }

    passwordConfirmationValidation = (passwordConfirmation) =>{
        if(this.state.password != passwordConfirmation){
            this.setState({
                passwordConfirmationError:'Password does not match',
            })
        }
        else{
            this.setState({
                passwordConfirmation,
                passwordConfirmationError:''
            })
        }
    }
    phoneNumberValidation =(phoneNumber) =>
    {
        if(phoneNumber == ""){
            this.setState({
                phoneNumberError:'Phone Number Field cannot be empty'
            });
        }
        else{
            this.setState({
                phoneNumber,
                phoneNumberError:''
            });
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
                                <Text style={{marginTop:50, color:'#00CCFF', fontSize:30,alignSelf:'flex-start', marginLeft:5,fontWeight:'bold'}}>Welcome,</Text>
                                <Text style={{color:'black',fontWeight:'bold',alignSelf:'flex-start',marginLeft:5,fontSize:20}}>Register to continue</Text>
                            </View>    
                                
                            <Form>     
                                <Item inlineLabel last>
                                    <Label>Full Name</Label>
                                    <Input  onChangeText={(fullname)=>this.validateName(fullname)}/>
                                </Item>
                                <Text style={{color:'red'}}>{this.state.nameError}</Text>
                                <Item inlineLabel last>
                                    <Label>Email</Label>
                                    <Input  onChangeText={(email)=>this.validateMail(email)} />
                                </Item>
                                <Text style={{color:'red'}}>{this.state.emailError}</Text>
                                <Item inlineLabel last>
                                    <Label>Password</Label>
                                    <Input secureTextEntry onChangeText={(password)=>this.passwordValidation(password)} />
                                </Item>
                                <Text style={{color:'red'}}>{this.state.passwordError}</Text>
                                <Item inlineLabel last>
                                    <Label>Password Confirmation</Label>
                                    <Input secureTextEntry onChangeText={(passwordConfirmation)=>this.passwordConfirmationValidation(passwordConfirmation)} />
                                </Item>
                                <Text style={{color:'red'}}>{this.state.passwordConfirmationError}</Text>
                                <Item inlineLabel last>
                                    <Label>Phone Number</Label>
                                    <Input keyboardType='numeric' onChangeText={(phoneNumber)=>this.phoneNumberValidation(phoneNumber)}/>
                                </Item>
                                <Text style={{color:'red'}}>{this.state.phoneNumberError}</Text>
                                
                                <View style={{marginTop:50}}>
                                    <Button rounded primary onPress={this.registerHandler} style={{width:'100%'}}>
                                        <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Register</Text>
                                    </Button>
                                </View>
                                
                            </Form>
                        
                        </Content>

                        <View style={{position:'absolute',bottom:0,alignItems:'center',width:'100%',marginBottom:10}}>
                            <Row>
                                <Text style={{marginLeft:10, marginTop:10,color:'black'}}>Already have an account?</Text>
                                <TouchableOpacity onPress={this.loginHandler} >
                                    <Text style={{marginLeft:10, marginTop:10,color:'#e83e8c'}}>Login here</Text>
                                </TouchableOpacity>
                            </Row>
                        </View>

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


export default connect(mapStateToProp,mapActionstoProps)(Register);
