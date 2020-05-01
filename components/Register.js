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

class Register extends Component{
    
    constructor(){
        super()

        this.state = {
            email:'',
            password:'',
            password_confirmation:'',
            fullname:'',
            address:'',
            phone_number:'',
            isLoading:false,
            validationError:[],
            timeout:false
           
          
        }
       
    }

    componentDidMount(){
        
        setTimeout( () => {
                
            this.setState({timeout: true});
        },2000);
    }
    loginHandler =() =>{
        
        this.props.navigation.navigate('Login');
    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
    }

    gotoDashboard = () =>{
        this.props.navigation('Dashboard');
    }

    validateInput = (input) =>{

        var value = this.state;

        var validate = false;
        var count = 0;

        

        var validationError = []

        for (let i=0; i<input.length; i++){
            if(input[i].value==''){
                validationError.push(
                    input[i].name
                );
            }
            else{
                count = count +1;
            }
        }

        this.setState({
            validationError
        });
        return count;
    }

    showError = (value) =>{
        var error = this.state.validationError;
        if(error.some(item=>value===item)){
            
            return(
                this.state.timeout==false ?
                    <Text style={{color:'red'}}>{value} is required</Text>
                :
                null
            );
        }
    }

    closeErrorMessage = () =>{
        this.setState({
            timeout:false
        });
        this.componentDidMount();
    }


    registerHandler = () => {
        Keyboard.dismiss();
        this.showLoader();
        var value=this.state;
        
        
        

        var input =[
            {
                value:value.email,
                name:'email',
            
            },
            {
                value:value.password,
                name:'password',
            },
            {
                value:value.password_confirmation,
                name:'password confirmation',
            },
            {
                value:value.address,
                name:'address',
                
            },
            {
                value:value.phone_number,
                name:'phone number',
            },
            {
                value:value.fullname,
                name:'full name'
            }
        
        ]
        var count = this.validateInput(input);

        if(count<input.length){
            this.closeErrorMessage();
        }
        
        if (count==input.length){

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
                
                fetch(apiUrl+'register',{
                    method:"POST",
                    headers: {
                        'Accept': 'application/json',
                        'token':token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullname:value.fullname,
                        email: value.email,
                        password: value.password,
                        password_confirmation:value.password_confirmation,
                        address:value.address,
                        phone_number:value.phone_number
                    })
                    
                })
                .then(response => {
                     
                                    
                    return response.json();   
                      
                })
                .then((contents)=>{
                    
                    if(contents.errors){
                        var errors=contents.errors;
                        var message = contents.message;

                        // console.log(contents.errors)

                       
                        this.hideLoader();

                        
                        Toast.show({
                            text:message,
                            buttonText:'Okay',
                            style:{backgroundColor:'gray'}
                           
                        })

                        
                    }
                    else{

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
                    this.hideLoader();

                    Toast.show({
                        text:'Ops!! Network Connection Problem',
                        buttonText:'Okay',
                        style:{backgroundColor:'gray'}
                       
                    })
                    
                    this.setState({
                        password_confirmation:'',
                        password:''
                    })

                    console.log(error);
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
                <ActivityIndicator size="large" color="#00CCFF" animating  />
            </View>
            :


            
             
                <Root>
                    <Container>
                        <Content padder>
                            
                                
                            <View>
                                

                                <Text style={{marginTop:10, color:'#00CCFF', fontSize:30,alignSelf:'flex-start', marginLeft:5,fontWeight:'bold'}}>Welcome,</Text>
                                    
                        
                                
                                <Text style={{color:'black',fontWeight:'bold',alignSelf:'flex-start',marginLeft:5,fontSize:20}}>Register to continue</Text>
                            </View>    
                                
                                <Form>     
                                    <Item floatingLabel>
                                        <Label>Full Name</Label>
                                        <Input onChangeText={(fullname) => this.setState({fullname})} value={this.state.fullname}/>
                                    </Item>
                                    {this.showError('full name')}
                                    <Item floatingLabel>
                                        <Label>Email</Label>
                                        <Input onChangeText={(email) => this.setState({email})} value={this.state.email}/>
                                    </Item>
                                    {this.showError('email')}
                                    <Item floatingLabel last>
                                        <Label>Password</Label>
                                        <Input secureTextEntry onChangeText={(password) => this.setState({password})}/>
                                    </Item>
                                    {this.showError('password')}
                                    <Item floatingLabel last>
                                        <Label>Password Confirmation</Label>
                                        <Input secureTextEntry onChangeText={(password_confirmation) => this.setState({password_confirmation})}/>
                                    </Item>
                                    {this.showError('password confirmation')}
                                    <Item floatingLabel>
                                        <Label>Address</Label>
                                        <Input onChangeText={(address) => this.setState({address})} value={this.state.address}/>
                                    </Item>
                                    {this.showError('address')}
                                    <Item floatingLabel>
                                        <Label>Mobile Number</Label>
                                        <Input onChangeText={(phone_number) => this.setState({phone_number})} value={this.state.phone_number}/>
                                    </Item>
                                    {this.showError('phone number')}
                                    
                                    <View style={{marginTop:50}}>
                                        <Button rounded primary onPress={this.registerHandler} style={{width:'100%'}}>
                                            <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Register</Text>
                                        </Button>
                                    </View>
                                    <View>
                                        <Row>
                                            <Text style={{marginLeft:10, marginTop:10}}>Already have an account?</Text>
                                            <TouchableOpacity onPress={this.loginHandler} >
                                                <Text style={{marginLeft:10, marginTop:10,color:'#e83e8c'}}>Sign In</Text>
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


export default connect(mapStateToProp,mapActionstoProps)(Register);
