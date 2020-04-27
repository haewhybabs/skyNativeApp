import React,{Component} from 'react';
import { 
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
  Text,
  Modal
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail
} from 'native-base';
import {apiUrl,token,vendorImage} from '../Config';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUserDetailsAction} from '../redux/actions';
import FooterScreen from './Footer';
import ProfileModal from './ProfileModal';
class Profile extends Component{
    
    constructor(){
        super()

        this.state = {
           userOpen:false,
          
        }
       
    }

    componentDidMount(){
       

    }

    userModal = (status) =>{
        this.setState({
            userOpen:status
        })
    }

    render(){

        

        

        

        return ( 
            <Container>
                <Content>
                    <ProfileModal 
                     navigation={this.props.navigation} 
                     userOpen={this.state.userOpen}
                     userModal={this.userModal}
                    />
                    <Body>
                        <Icon active name="person" style={{color:'#e83e8c'}}/>

                        <Text style={{fontWeight:'bold'}}>Ayobami Babalola</Text>

                        <Text style={{marginTop:3}}>+2348 1353 73563</Text>

                        <Text style={{marginTop:3}}>Obafemi Awolowo University</Text>
                        <Text style={{marginTop:3,fontWeight:'bold'}}>Complete Profile: 100%</Text>    
                    </Body>
                    <View style={{borderBottomColor:'#e83e8c',borderBottomWidth:3,alignSelf:'stretch',marginTop:10}}/>

                    <View style={{marginTop:25,alignItems:'center'}}>
                        <Text style={{color:'gray',fontWeight:'bold'}}>Account Information</Text>
                    </View>


                    <TouchableOpacity onPress={()=>this.userModal(true)}>

                        <Card style={{marginTop:10}}>
                            <CardItem>
                                <Icon active name="person" style={{color:'#00CCFF'}} />
                                <Text>User Information</Text>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>


                    <TouchableOpacity>

                        <Card>
                            <CardItem>
                                <Icon active name="home" style={{color:'#00CCFF'}}/>
                                <Text>Bank Information</Text>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Card>
                            <CardItem>
                                <Icon active name="md-document" style={{color:'#00CCFF'}}/>
                                <Text>Employment Information</Text>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Card>
                            <CardItem>
                                <Icon active name="man" style={{color:'#00CCFF'}}/>
                                <Text>Next Of Kin Information</Text>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                </Content>
                <FooterScreen navigation={this.props.navigation}/>
                
            </Container>
        )

    }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  image: {
    marginTop:50,
    height:150,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    marginLeft:'3%',
    marginRight:'3%'
  },
  line:{
      borderBottomColor:'red',
    borderBottomWidth:1
  }
});


export default Profile;