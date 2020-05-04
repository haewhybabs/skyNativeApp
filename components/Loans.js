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
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,Picker
} from 'native-base';
import {apiUrl,token,vendorImage} from '../Config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {materialIcons, MaterialIcons} from '@expo/vector-icons';
import FooterScreen from './Footer';
import HeaderScreen from './Header';

class Loans extends Component{
    
    constructor(){
        super()

        this.state = {
           
           loanPlans:[],

           loanDuration:[],
           loanPlanInput:'',
           loanRequestInfo:'',
           loanAmount:'',
           loanRequestInfoError:'',
           loanAmountError:'',

           isLoading:true,
           title:'Loan Request'
          
        }
       
    }

    componentDidMount()
    {
        const user = this.props.user; 

        fetch(apiUrl+'loans',{
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

                loanPlans:contents.loanPlans,
                loanDuration:contents.loanDuration,
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

    onValueChange2(value) {
        this.setState({
          loanPlanInput: value
        });
    }

    loanAmountValidation = (loanAmount) =>
    {
        let error = "";
        let status = false;
        let loanPlanInput = this.state.loanPlanInput;
        let data={
            status,error
        }
        if(loanPlanInput != ""){
            let checkFilter = this.state.loanPlans.filter(loanPlans=>loanPlans.idloanrange==loanPlanInput);
            if(loanAmount > checkFilter[0].maxi_range || loanAmount <checkFilter[0].mini_range ){
                error="The amount is invalid for the selected plan";
            }
            else{
                status=true
            }
        }
        data={
            status,
            error
        }
        return data;
    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
        
    }



    loanInputAmountValidation = (loanAmount) =>
    {
        
        let loanPlanInput = this.state.loanPlanInput;
        let error = "";
        if(loanPlanInput == ""){

            error="Please select a plan";
        }
        else{

            let validateAmount = this.loanAmountValidation(loanAmount);
            error = validateAmount.error;   
        }

        this.setState({
            loanAmountError:error,
            loanAmount

        })
       
    }

    submitHandler = () =>
    {
        let state=this.state;
        let loanAmount = state.loanAmount;
        let amountValidation = this.loanAmountValidation(loanAmount);
        let loanRequestInfoError=""
        if(state.loanRequestInfo == ""){
            loanRequestInfoError="You haven't filled this field.";
        }
        this.setState({
            loanRequestInfoError
        })
        if(amountValidation.status==false || state.loanAmountError!="" || state.loanRequestInfo ==""){
            Toast.show({
                text:'Ops!! All the fields are required',
                buttonText:'Okay',
                style:{backgroundColor:'red'}
                
            })
            
        }
        else{
            this.showLoader();
            const user = this.props.user; 

        fetch(apiUrl+'loan-request',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':token,
                'Authorization':'Bearer '+user.token
            },
            body: JSON.stringify({
                amount:state.loanAmount,
                loan_range_id:state.loanPlanInput,
                loan_info:state.loanRequestInfo
            })
            
        })
        .then(response => {
                                
            return response.json();      
        })
        
        .then((contents)=>{
            this.hideLoader();

          if(contents.status){
            Toast.show({
                text:'Success!! We will get back to you soon',
                buttonText:'Okay',
                style:{backgroundColor:'green'},
                duration:3000       
            })
            setTimeout( () => {
                this.props.navigation.navigate('History');
            },3000);
              
          }
          else{
            Toast.show({
                text:'Error!! '+contents.message,
                buttonText:'Okay',
                style:{backgroundColor:'red'},
                duration:4000       
            })
          }

            
        })
        .catch((error)=>{
            
            this.errorInConnection();
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
                    <HeaderScreen navigation={this.props.navigation} title={this.state.title}/>
                    <Content>

                        <View style={{marginTop:20,marginLeft:10,marginRight:10}}>
                            <Text style={{fontWeight:'bold',fontSize:18}}>Loan Application</Text>
                            <Text style={{marginTop:5,lineHeight:23}}>We designed our loan process to fit your needs and help you grow. We support Small and Medium Scale Enterprises (SMEs) operators in Nigeria. Irrespective of the sector
                            your enterprise is operating at an affordable interest rate.
                            </Text>
                            <Text style={{lineHeight:23,fontWeight:'bold'}}>NB: 0.95% is our Monthly Interest,Overdue Interest is 1.00%</Text>
                            


                            <Form>
                                
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        
                                        placeholder="Select Loan Plan"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.loanPlanInput}
                                        onValueChange={this.onValueChange2.bind(this)}
                                        >
                                        <Picker.Item label="Select Loan Plan" value="" />
                                        {this.state.loanPlans.map((row,index)=>(
                                            <Picker.Item label={row.name} value={row.idloanrange} key={row.idloanrange} />
                                        ))}
                                    </Picker>
                                </Item>


                                <Item floatingLabel last>
                                    <Label>Enter Amount</Label>
                                    <Input onChangeText={(loanAmount) => this.loanInputAmountValidation(loanAmount)} keyboardType="numeric"/>
                                </Item>

                                <Text style={{color:'red'}}>{this.state.loanAmountError}</Text>

                                <Item floatingLabel last>
                                    <Label>Enter Duration</Label>
                                    <Input disabled value={JSON.stringify(this.state.loanDuration.duration)}/>
                                </Item>

                                <Item floatingLabel last>
                                    <Label>Can we know why you need the loan </Label>
                                    <Input onChangeText={(loanRequestInfo) => this.setState({loanRequestInfo})}/>
                                </Item>
                                <Text style={{color:'red'}}>{this.state.loanRequestInfoError}</Text>

                                <View style={{marginTop:40}}>
                                    <Button rounded primary style={{width:'100%',backgroundColor:'#00CCFF'}} onPress={()=>this.submitHandler()}>
                                        <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Submit</Text>
                                    </Button>
                                </View>
                            </Form>
                        
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
  
  
  
  export default connect(mapStateToProp)(Loans);