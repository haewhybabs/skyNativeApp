import React,{Component} from 'react';

import { 
  StyleSheet,
  View,
  Text,ActivityIndicator
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,CardItem,
    Input,Label,Row,Toast,Root,Thumbnail,Textarea, Form ,Button,Content
} from 'native-base';
import {apiUrl,token,vendorImage} from '../Config';
import {connect} from 'react-redux';
import FooterScreen from './Footer';
import { DataTable,ViewStyle } from 'react-native-paper';
import HeaderScreen from './Header';


class loanAmount extends Component{
    
    constructor(){
        super()

        this.state = {
            loanData:[],
            isLoading:true,
            title:'Loan Amount',
        }

    }


    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
        
    }

    componentDidMount(){
        const user = this.props.user; 

        fetch(apiUrl+'get-loan-amount',{
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

                loanData:contents.loanData,
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

    userConfirmAmount=(type,loanId)=>
    {
        const user = this.props.user;
        this.showLoader();
        fetch(apiUrl+'user-confirm-amount',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':token,
                'Authorization':'Bearer '+user.token
            },
            body: JSON.stringify({
                loanId,
                type
            })
            
        })
        .then(response => {
                                
            return response.json();      
        })
        
        .then((contents)=>{
            this.hideLoader();
            if(contents.status){
                Toast.show({
                    text:'Success!!! We will get back to you shortly',
                    buttonText:'Okay',
                    style:{backgroundColor:'green'}
                })
                this.componentDidMount()
            }
            
        })
        .catch((error)=>{ 
            this.errorInConnection();
        })
    }

    render(){
        let x =0;
        let status = null;
        let loanData= this.state.loanData;
        if(this.state.loanData){
            if(loanData.is_approved==0){
                status='Pending';
            }
            else if(loanData.is_approved==1){
                status = "Admin Approved"
            }
            else if(loanData.is_approved==2){
                status = "User Approved"
            }
            else if(loanData.is_approved==3){
                status = "User Rejected"
            }
            else if(loanData.is_approved==4){
                status = "Admin Rejected"
            }
        }
        
       
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
                            <Text style={{fontWeight:'bold',fontSize:18,marginBottom:20}}>Loan Approved Amount</Text>
                            {this.state.loanData ? 
                                <Card>
                                    <CardItem>
                                        <Text>Amount Request: ₦{loanData.amount}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Text>Status: {status}</Text>
                                    </CardItem>

                                    <CardItem>
                                        <Text style={{color:'green',fontWeight:'bold'}}>Approved Amount: ₦{loanData.approvedAmount}</Text>
                                    </CardItem>

                                    {loanData.is_approved==1 ?
                                        <CardItem>
                                            <Text>Action:</Text>
                                            <Button rounded primary style={{ marginLeft:20,width:80,height:40,backgroundColor:'#00CCFF'}} onPress={()=>this.userConfirmAmount(2,loanData.idloans)}>
                                                <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:15}}>Approve</Text>
                                            </Button>
                                            <Button rounded primary style={{marginLeft:20,width:80,backgroundColor:'#e83e8c',height:40}} onPress={()=>this.userConfirmAmount(3,loanData.idloans)}>
                                                <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:15}}>Reject</Text>
                                            </Button>
                                        </CardItem>:null
                                    }

                                    

                                    <CardItem>
                                        <Text style={{fontWeight:'bold'}}>Date: {loanData.created_at}</Text>
                                    </CardItem>
                                    
                                </Card>
                                :
                                <Card>
                                    <CardItem>
                                        <Text>Hi, You currently do not have new loan Request!!</Text>
                                    </CardItem>
                                </Card>
                            
                            }
                            
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
  
  
export default connect(mapStateToProp)(loanAmount);