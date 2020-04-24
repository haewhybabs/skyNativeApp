import React,{Component} from 'react';
import { 
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
  Text
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
import {saveUserDetailsAction} from '../redux/cart_action';

class Dashboard extends Component{
    
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
        console.log(this.props.navigation.navigate);

    }

    render(){

        

        

        

        return ( 
            <Container>
                <Content>
                <ImageBackground source={require('../assets/img/bimage.jpg')} style={styles.image}>
                        <Text style={{color:'#f8f9fa',alignSelf:'flex-end', marginRight:10,fontWeight:'bold',fontSize:25,marginTop:3}}>LOAN PLANS</Text>
                        <Text style={{alignSelf:'flex-start', marginLeft:'3%', marginTop:30, color:'#f8f9fa'}}>GET A MAXI LOAN</Text>
                        <Grid>
                            <Text style={{fontSize:33,marginTop:10,marginLeft:'3%', color:'#f8f9fa',fontWeight:'bold'}}>0.95%</Text>
                            <Text style={{marginTop:30, marginLeft:10,color:'#f8f9fa'}}>Interest</Text>

                            <Col>
                                <Button rounded info style={{alignSelf:'flex-end',marginTop:20,marginRight:10,width:60,height:30}}><Text style={{color:'#f8f9fa',width:'100%',textAlign:'center',fontWeight:'bold'}}>More</Text></Button>
                            </Col>
                        </Grid>                     
                    </ImageBackground>

                    <View style={{marginTop:40,alignItems:'center'}}>
                        <Text style={{color:'gray',fontSize:25,fontWeight:'bold'}}>All Loan Plans</Text>
                    </View>

                    

                    <Grid style={{marginTop:50}}>

                        <Col>

                            <Card>
                                <CardItem>
                                    <Icon active name="swap" style={{color:'#e83e8c'}}/>
                                    <Text style={{fontWeight:'bold',fontSize:20}}>MINI</Text>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Text style={{letterSpacing:2}}>₦5000-₦49000</Text>  
                                </CardItem>
                            </Card>
                        </Col>

                        <Col>
                            <Card>
                                <CardItem>
                                    <Icon active name="swap" style={{color:'#e83e8c'}}/>
                                    <Text style={{fontWeight:'bold',fontSize:20}}>MIDI</Text>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Text style={{letterSpacing:2}}>₦50000-₦149000</Text>  
                                </CardItem>
                            </Card>
                        </Col>

                    </Grid>

                    
                    <Card style={{alignItems:'center',marginTop:20}}>
                        <CardItem>
                            <Icon active name="md-share" style={{color:'#e83e8c'}}/>
                            <Text style={{fontWeight:'bold',fontSize:20}}>MAXI</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text style={{letterSpacing:2}}>₦15000-₦250000</Text>  
                        </CardItem>
                    </Card>     
                </Content>

                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="apps" />
                            <Text>Apps</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="camera" />
                            <Text>Camera</Text>
                        </Button>
                        <Button vertical active>
                            <Icon active name="navigate" />
                            <Text>Navigate</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="person" />
                            <Text>Contact</Text>
                        </Button>
                    </FooterTab>
                </Footer>
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
});


export default Dashboard;