import React,{Component} from 'react';
import { 
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
  Text,BackHandler
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail
} from 'native-base';
import {apiUrl,token,vendorImage} from '../Config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {saveUserDetailsAction} from '../redux/actions';
import FooterScreen from './Footer';
import HeaderScreen from './Header';
class Dashboard extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            username:'',
            title:'Dashboard',
            loanPaymentData:[],
            loanPlans:[],
            monthlyPercentage:'',
            overduePercentage:'',
            isLoading:true,
           
          
        }
        this.componentDidMount
        
        
       
    }


    async componentDidMount(){

        let userDetails = await AsyncStorage.getItem('userDetails');
        let userStore = JSON.parse(userDetails);
        this.setState({
            username:userStore.fullname,
            email:userStore.email,
        })

        const user = this.props.user;

        fetch(apiUrl+'dashboard',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':token,
                'Authorization':'Bearer '+user.token
            },
            body: JSON.stringify({
                
            })
            
        })
        .then(response => {
                                
            return response.json();      
        })
        
        .then((contents)=>{
            
           this.setState({
               loanPaymentData:contents.loanPaymentData,
               loanPlans:contents.loanPlans,
               monthlyPercentage:contents.monthlyPercentage,
               overduePercentage:contents.overduePercentage,
               isLoading:false
           });
            
        })
        .catch((error)=>{
            
            this.errorInConnection();
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

        let activeLoan = this.state.loanPaymentData;
        let activeLoanAmount = 0;
        let loanToPay=0;
        if(activeLoan.status){
            activeLoanAmount = this.state.loanPaymentData.loanDetails.amount;
            loanToPay=this.state.loanPaymentData.loanToPay;
        }

        return ( 
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

                                        {this.state.loanPaymentData.status ?
                                            <CardItem>   
                                                <Text style={{fontWeight:'bold', fontSize:14}}>₦{activeLoanAmount}</Text>
                                                <Right>
                                                    <Text style={{color:'#00CCFF'}}>{this.state.loanPaymentData.noOfDays} days</Text>
                                                    
                                                </Right>
                                            </CardItem>
                                               
                                        :
                                            <CardItem>
                                                    <Text style={{fontWeight:'bold', fontSize:14}}>Not Yet</Text>
                                                    <Right>
                                                        <Icon name="arrow-forward" style={{color:'#00CCFF'}} onPress={()=>this.props.navigation.navigate('Loans')}/>
                                                        
                                                    </Right>
                                            </CardItem>
                                        }
                                    </Card>
                                </Col>

                                
                                <Col>
                                    <Card>
                                        <CardItem>
                                        
                                            <Icon active name="md-time" style={{color:'#e83e8c'}}/>      
                                            <Text>Loan Duration</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={{fontWeight:'bold', fontSize:14}}>30 DAYS</Text>
                                            <Right>
                                                <Text style={{fontWeight:'bold', color:'#00CCFF'}}>0.95%</Text>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </Col>
                            </Grid>

                            <Grid>
                                <Col>
                                    <Card>
                                        <CardItem>
                                            <Icon active name="md-information-circle" style={{color:'#e83e8c'}}/>
                                                
                                            <Text>Overdue Monthly %</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Text style={{fontWeight:'bold', fontSize:11}}> Above 30 DAYS</Text>
                                            </Left>
                                            <Right>
                                                <Text style={{fontWeight:'bold', color:'#00CCFF'}}>1.00%</Text>
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
                                            <Text style={{fontWeight:'bold', fontSize:14}}>₦{loanToPay}</Text>
                                            <Right>

                                                {this.state.loanPaymentData.status ?
                                                    <Icon name="arrow-forward" style={{color:'#00CCFF'}} onPress={()=>this.props.navigation.navigate('History')} />
                                                :
                                                    <Icon name="arrow-forward" style={{color:'#00CCFF'}} onPress={()=>this.props.navigation.navigate('Loans')} />
                                                }
                                                
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </Col>
                            </Grid>

                            <Text style={{fontWeight:'bold', marginTop:20}}>Loan Plans</Text>

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
            </Root>
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


const mapStateToProp = (state) =>{
    return {
       
        user:state.user,

    }
  }
  
  
  
  export default connect(mapStateToProp)(Dashboard);