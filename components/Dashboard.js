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
import {saveUserDetailsAction} from '../redux/actions';
import FooterScreen from './Footer';
class Dashboard extends Component{
    
    constructor(){
        super()

        this.state = {
            username:'',
           
          
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

    errorInConnection = () => {
        this.hideLoader();

        Toast.show({
            text:'Ops!! Network Connection Problem',
            buttonText:'Okay',
            style:{backgroundColor:'red'}
            
        })
    }

    render(){

        

        

        

        return ( 
            <Container>
                <Content>
                    <View style={{marginLeft:10, marginRight:10}}>
                        <Text style={{fontSize:18,fontWeight:'bold',marginTop:10,color:'#00CCFF'}}>Hello {this.state.username}</Text>
                        <Text style={{marginTop:18}}>Loan Details</Text>
                        <Grid style={{marginTop:5}}>
                            <Col>
                                <Card>

                                    <CardItem>
                                        <Icon active name="md-contract" style={{color:'#e83e8c'}}/>
                                        
                                        <Text>Active Loan</Text>
                                    </CardItem>
                                    <CardItem>
                                        
                                        
                                        
                                    <Text style={{fontWeight:'bold', fontSize:18}}>₦50,000</Text>
                                        <Right>
                                            <Icon name="arrow-forward" style={{color:'#00CCFF'}} />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </Col>

                            <Col>
                                <Card>
                                    <CardItem>
                                        <Icon active name="md-information-circle" style={{color:'#e83e8c'}}/>
                                        
                                        <Text>Loan Percentage</Text>
                                    </CardItem>
                                    <CardItem>
                                        
                                        
                                        
                                    <Text style={{fontWeight:'bold', fontSize:18}}>0.95%</Text>
                                        <Right>
                                            <Icon name="arrow-forward" style={{color:'#00CCFF'}} />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Grid>

                        <Grid>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Icon active name="md-time" style={{color:'#e83e8c'}}/>
                                            
                                        <Text>Loan Duration</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Text style={{fontWeight:'bold', fontSize:18}}>30 DAYS</Text>
                                        <Right>
                                            <Icon name="arrow-forward" style={{color:'#00CCFF'}} />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </Col>

                            <Col>
                                <Card>
                                    <CardItem>
                                    <Icon active name="md-stats" style={{color:'#e83e8c'}}/>
                                        
                                        <Text>Expected Payment</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Text style={{fontWeight:'bold', fontSize:18}}>₦50,000</Text>
                                        <Right>
                                            <Icon name="arrow-forward" style={{color:'#00CCFF'}} />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Grid>

                        <Text style={{fontWeight:'bold', marginTop:10}}>Loan Plans</Text>

                        <Card>
                            <CardItem>
                                <Icon active name="planet" style={{color:'#e83e8c'}}/>
                                <Text style={{fontWeight:'bold'}}>MINI</Text>
                                <Right>
                                    <Text style={{fontWeight:'bold'}}>₦5,000-₦49,000</Text>
                                </Right>
                            </CardItem>
                        </Card>

                        <Card>
                            <CardItem>
                                <Icon active name="nutrition" style={{color:'#e83e8c'}}/>
                                <Text style={{fontWeight:'bold'}}>MIDI</Text>
                                <Right>
                                    <Text style={{fontWeight:'bold'}}>₦50,000-₦149,000</Text>
                                </Right>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                                <Icon active name="star" style={{color:'#e83e8c'}}/>
                                <Text style={{fontWeight:'bold'}}>MAXI</Text>
                                <Right>
                                    <Text style={{fontWeight:'bold'}}>₦150,000-₦250,000</Text>
                                </Right>
                            </CardItem>
                        </Card>
                    </View>
                    
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
});


export default Dashboard;