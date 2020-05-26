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
import HeaderScreen from './Header';
import {apiUrl,token,vendorImage} from '../Config';
import {connect} from 'react-redux';
import FooterScreen from './Footer';
class ContactUs extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:false,
            title:'Contact Us',
            message:'',
            messageError:''
           
        }
  
       
    }

    componentDidMount(){
        
    }

    errorInConnection = () => {
        this.hideLoader();

        Toast.show({
            text:'Ops!! Network Connection Problem',
            buttonText:'Okay',
            style:{backgroundColor:'red'}
            
        })
    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
        
    }

    submitHandler = () =>{
        
        
        const user = this.props.user; 
        if(this.state.message !=""){
            this.setState({messageError:''})
            this.showLoader();
           

            fetch(apiUrl+'contact-us',{
                method:"POST",
                headers: {

                    'Content-Type': 'application/json',
                    'token':token,
                    'Authorization':'Bearer '+user.token

                },
                body: JSON.stringify({
                    message:this.state.message,
                })
            })
            .then(response => {
                                    
                return response.json();      
            })

            .then((contents)=>{
                this.hideLoader();
                if(contents.status==true){
                    Toast.show({
                        text:'Success!!! We will get back to you shortly',
                        buttonText:'Okay',
                        style:{backgroundColor:'green'}
                    })
                }

                else{
                    Toast.show({

                        text:'Error!!!',
                        buttonText:'Okay',
                        style:{backgroundColor:'red'}
                    })
                }
            })
            .catch((error)=>{
                
                this.errorInConnection();
            })
        }
        else{
            this.setState({
                messageError:'message field is required'
            })
        }
    }
    

    render(){
        return(
            
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#00CCFF" animating  />
            </View>
            :

            <Root>
                <Container>
                    <HeaderScreen navigation={this.props.navigation} title={this.state.title}/>
                    <Content>
                        <View style={{marginTop:20,marginLeft:10,marginRight:10}}>
                            <Text style={{fontWeight:'bold',fontSize:18}}>Send us a message</Text>

                            <Form>
                                <Textarea rowSpan={5} bordered placeholder="Your message" onChangeText={(message)=>this.setState({message})}/>
                                <Text style={{color:'red'}}>{this.state.messageError}</Text>
                            </Form>


                            <View style={{marginTop:40}}>
                                <Button rounded primary style={{width:'100%',backgroundColor:'#00CCFF'}} onPress={()=>this.submitHandler()}>
                                    <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Submit</Text>
                                </Button>
                            </View>
                        </View>
                    </Content>
                    <FooterScreen navigation={this.props.navigation}/>
                </Container>
            </Root>
        );
    }
}

const mapStateToProp = (state) =>{
    return { 
        user:state.user,
    }
  }
  
  
export default connect(mapStateToProp)(ContactUs);