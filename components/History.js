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
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,Tabs,Tab
} from 'native-base';

import {materialIcons, MaterialIcons} from 'react-native-vector-icons';
import FooterScreen from './Footer';
import HeaderScreen from './Header';
import {apiUrl,token,vendorImage} from '../Config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class History extends Component{
    
    constructor(){
        super()

        this.state = {
           isLoading:true,
           activeLoan:[],
           endDate:'',
           activePaymentDetails:[],
           pendingLoans:[],
           rejectedLoans:[],
           overdueLoan:[],
           maturedLoans:[],
           title:'Loan History'
           

          
        }
       
    }

    componentDidMount(){
        const user = this.props.user; 

        fetch(apiUrl+'loan-history',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':token,
                'Authorization':'Bearer '+user.token
            }
            
        })
        .then(response => {
                                
            return response.json();      
        })
        
        .then((contents)=>{

          

            this.setState({

                activeLoan:contents.activeLoan,
                endDate:contents.endDate,
                activePaymentDetails:contents.activePaymentDetails,
                pendingLoans:contents.pendingLoans,
                rejectedLoans:contents.rejectedLoans,
                overdueLoan:contents.overdueLoan,
                maturedLoans:contents.maturedLoans,
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
        let pendingLoans = this.state.pendingLoans; 
        let activeLoan = this.state.activeLoan;
        let activeDisplay = [];
        let pendingDisplay = [];
        let maturedLoans = this.state.maturedLoans;
        let maturedDisplay = [];
        let rejectedLoans = this.state.rejectedLoans;
        let rejectedDisplay = [];
        let overdueLoan =this.state.overdueLoan;
        let overdueDisplay = [];

        const moneyFormatter = (money) =>{
            return (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }

        


        // Pending Loan

        if(pendingLoans.length>0){
            for(let i=0; i<pendingLoans.length; i++){
                pendingDisplay.push(
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{fontWeight:'bold'}}>{pendingLoans[i].name}</Text><Text style={{fontWeight:'bold'}}>(₦{moneyFormatter(parseInt(pendingLoans[i].amount))})</Text>
                            </Left>      
                            <Right>
                                <Text>{pendingLoans[i].loan_start_date}</Text>
                            </Right>
                        </CardItem>

                        <CardItem>
                           
                            <Text style={{fontWeight:'bold'}}>Approved Amount</Text><Text style={{fontWeight:'bold'}}>(₦{moneyFormatter(parseInt(pendingLoans[i].approvedAmount))})</Text>    
                        </CardItem>
                        <CardItem>
                            <Text>Loan Information: {pendingLoans[i].loan_info}</Text>
                        </CardItem>   
                        <CardItem>
                            <Text style={{color:'#e83e8c',fontWeight:'bold'}}>Admin Review: {pendingLoans[i].admin_review}</Text>
                        </CardItem>         
                    </Card>                     
                )
            }
        }
        else{
            pendingDisplay.push(
                <Card>
                    <CardItem>
                        <Text>No Pending Loan Yet</Text>
                    </CardItem>
                </Card>
            )
        }

        //Rejected Loan

        if(rejectedLoans.length>0){
            for(let i=0; i<rejectedLoans.length; i++){
                rejectedDisplay.push(
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{fontWeight:'bold'}}>{rejectedLoans[i].name}</Text><Text style={{fontWeight:'bold'}}>(₦{moneyFormatter(parseInt(rejectedLoans[i].amount))})</Text>
                            </Left>      
                            <Right>
                                <Text>{rejectedLoans[i].loan_start_date}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text>Loan Information: {rejected[i].loan_info}</Text>
                        </CardItem>   
                        <CardItem>
                            <Text style={{color:'#e83e8c',fontWeight:'bold'}}>Admin Review: {rejectedLoans[i].admin_review}</Text>
                        </CardItem>         
                    </Card>                     
                )
            }
        }

        else{
            
            rejectedDisplay.push(
                <Card>
                    <CardItem>
                        <Text>No Rejected Loan Yet</Text>
                    </CardItem>
                </Card>
            )
        }

        //Matured Loan

        if(maturedLoans.length>0){
            for(let i=0; i<maturedLoans.length; i++){
                maturedDisplay.push(
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{fontWeight:'bold'}}>{maturedLoans[i].name}</Text><Text style={{fontWeight:'bold'}}>(₦{moneyFormatter(parseInt(maturedLoans[i].approvedAmount))})</Text>
                            </Left>      
                            <Right>
                                <Text>{maturedLoans[i].loan_start_date}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text>Loan Information: {maturedLoans[i].loan_info}</Text>
                        </CardItem>   
                        <CardItem>
                            <Text style={{color:'#e83e8c',fontWeight:'bold'}}>Admin Review: {maturedLoans[i].admin_review}</Text>
                        </CardItem>         
                    </Card>                     
                )
            }
        }
        else{
            maturedDisplay.push(
                <Card>
                    <CardItem>
                        <Text>No Matured Loan Yet</Text>
                    </CardItem>
                </Card>
            )
        }
        
        // Active Loan

        if(activeLoan){
            activeDisplay.push(
                <Card>
                    <CardItem>
                        <Left>
                            <Text style={{fontWeight:'bold'}}>{activeLoan.name}</Text><Text style={{fontWeight:'bold'}}>(₦{moneyFormatter(parseInt(activeLoan.approvedAmount))})</Text>
                        </Left>

                        
                        
                        <Right>
                            <Text>{activeLoan.loan_start_date} to</Text><Text style={{fontWeight:'bold'}}>{this.state.endDate}</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text style={{fontWeight:'bold'}}>Payment:₦{moneyFormatter(parseInt(this.state.activePaymentDetails.loanToPay))}</Text>
                        </Left>
                        
                        <Right>
                            <Button rounded style={{backgroundColor:'#e83e8c',width:60,height:30}}>
                                <Text style={{color:'#fff',width:'100%',textAlign:'center'}}>Pay</Text>
                            </Button>
                        </Right>
                    </CardItem>

                    <CardItem>
                        <Text>Admin Review: {activeLoan.admin_review}</Text>
                    </CardItem>
                </Card>
            )
        }

        else{
            activeDisplay.push(
                <Card>
                    <CardItem>
                        <Text>No Active Loan Yet</Text>
                    </CardItem>
                </Card>
            )
        }

        //Overdue Loan


        if(overdueLoan){
            overdueDisplay.push(
                
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{fontWeight:'bold'}}>{overdueLoan.name}</Text><Text style={{fontWeight:'bold'}}>(₦{moneyFormatter(parseInt(overdueLoan.amount))})</Text>
                            </Left>

                            
                            
                            <Right>
                                <Text>{overdueLoan.loan_start_date} to</Text><Text style={{fontWeight:'bold'}}>{this.state.endDate}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{fontWeight:'bold'}}>Payment:₦{moneyFormatter(parseInt(this.state.activePaymentDetails.loanToPay))}</Text>
                            </Left>
                            
                            <Right>
                                <Button rounded style={{backgroundColor:'#e83e8c',width:60,height:30}}>
                                    <Text style={{color:'#fff',width:'100%',textAlign:'center'}}>Pay</Text>
                                </Button>
                            </Right>
                        </CardItem>

                        <CardItem>
                            <Text>Admin Review: {overdueLoan.admin_review}</Text>
                        </CardItem>
                    </Card>
               
            )
        }

        else{
            overdueDisplay.push(
                <Card>
                    <CardItem>
                        <Text>No Overdue Loan Yet</Text>
                    </CardItem>
                </Card>
            )
        }



        return (
            
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#00CCFF" animating  />
            </View>
            :
        
            <Container>
                <HeaderScreen navigation={this.props.navigation} title={this.state.title}/>
                
                <Content>
                    <View style={{marginLeft:3,marginRight:3,marginTop:20}}>
                        
                        <View>
                            <Tabs tabBarBackgroundColor='#fff'>
                                
                                <Tab heading="Pending">
                                    {pendingDisplay}
                                </Tab>
                                
                                 
                                <Tab heading="Active">
                                    {activeDisplay}

                                </Tab>
                                

                                <Tab heading="Overdue"> 
                               
                                    {overdueDisplay}   
                                
                                </Tab>
                                <Tab heading="Rejected">
                                    {rejectedDisplay}
                                </Tab>

                                <Tab heading="Matured">
                                    {maturedDisplay}
                                </Tab>
                            </Tabs>
                            
                        </View>
                       
                        
                            
                            
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

  modalToggle:{
    marginBottom:0,
    borderWidth:1,
    borderColor:'#e83e8c',
    padding:10,
    borderRadius:10,
    alignSelf:'center',
    marginTop:20,
}

  
});


const mapStateToProp = (state) =>{
    return {
       
        user:state.user,

    }
  }
  
  
  
  export default connect(mapStateToProp)(History);