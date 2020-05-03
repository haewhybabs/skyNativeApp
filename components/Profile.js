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
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FooterScreen from './Footer';
import ProfileModal from './ProfileModal';
import BankProfileModal from './BankProfileModal';
import EmploymentProfileModal from './EmploymentProfileModal';
import NextOfKinProfileModal from './NextOfKinProfileModal';
class Profile extends Component{
    
    constructor(){
        super()

        this.state = {
           userInfo:[],
           employmentInfo:[],
           nextOfKinInfo:[],
           bankInfo:[],
           employmentType:[],
           salaryRange:[],
           banks:[],
           states:[],
           lgs:[],
           percentage:'',
           relationship:[],
           sex:[],
           maritalStatus:[],
           status:'',
           isLoading:true,
           userOpen:false,
           bankOpen:false,
           employmentOpen:false,
           nextOfKinOpen:false,
          
        }
       
    }
   

    componentDidMount()
    {
       
        const user = this.props.user; 

        fetch(apiUrl+'profile',{
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

                userInfo:contents.userInfo,
                employmentInfo:contents.employmentInfo,
                nextOfKinInfo:contents.nextOfKin,
                bankInfo:contents.bankInfo,
                employmentType:contents.employmentType,
                salaryRange:contents.salaryRange,
                banks:contents.banks,
                states:contents.states,
                lgs:contents.lgs,
                percentage:contents.percentage,
                relationship:contents.relationship,
                sex:contents.sex,
                maritalStatus:contents.marital_status,
                status:contents.status,
                isLoading:false,

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

    userModal = (status) =>{
        this.setState({
            userOpen:status
        })
    }

    bankModal = (status) =>{
        this.setState({
            bankOpen:status
        })
    }

    employmentModal = (status) =>{
        this.setState({
            employmentOpen:status
        })
    }

    nextOfKinModal = (status) =>{
        this.setState({
            nextOfKinOpen:status
        })
    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
        
    }

   

    refresh = () => {

        this.componentDidMount();
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
                    <Content scrollEnabled={true}>
                        <ProfileModal
                        maritalStatus ={this.state.maritalStatus}
                        sex ={this.state.sex}
                        navigation={this.props.navigation} 
                        userOpen={this.state.userOpen}
                        userModal={this.userModal}
                        userInfo = {this.state.userInfo}
                        states= {this.state.states}
                        lgs = {this.state.lgs}
                        user = {this.props.user}

                        showLoader={this.showLoader}
                        hideLoader = {this.hideLoader}
                        refresh = {this.refresh}
                        bankOpen={this.state.bankOpen}
                        
                        />

                        <BankProfileModal
                        banks={this.state.banks}
                        bankDetails={this.state.bankInfo}
                        bankModal={this.bankModal}
                        bankOpen={this.state.bankOpen}
                        user = {this.props.user}
                        showLoader={this.showLoader}
                        hideLoader = {this.hideLoader}
                        refresh = {this.refresh}
                        />

                        <EmploymentProfileModal
                        states= {this.state.states}
                        lgs = {this.state.lgs}
                        salaryRange={this.state.salaryRange}
                        employmentType ={this.state.employmentType}
                        employmentInfo={this.state.employmentInfo}
                        employmentModal={this.employmentModal}
                        employmentOpen={this.state.employmentOpen}
                        user = {this.props.user}
                        showLoader={this.showLoader}
                        hideLoader = {this.hideLoader}
                        refresh = {this.refresh}    
                        />


                        <NextOfKinProfileModal
                        states= {this.state.states}
                        lgs = {this.state.lgs}
                        nextOfKinModal={this.nextOfKinModal}
                        nextOfKinOpen={this.state.nextOfKinOpen}
                        nextOfKinDetails={this.state.nextOfKinInfo}
                        user = {this.props.user}
                        showLoader={this.showLoader}
                        hideLoader = {this.hideLoader}
                        refresh = {this.refresh}    
                        />


                        <Body>
                            <Icon active name="person" style={{color:'#e83e8c'}}/>

                            <Text style={{fontWeight:'bold'}}>{this.state.userInfo.fullname}</Text>

                            <Text style={{marginTop:3}}>{this.state.userInfo.phone_number}</Text>

                            <Text style={{marginTop:3}}>{this.state.userInfo.address}</Text>
                            <Text style={{marginTop:3,fontWeight:'bold'}}>Complete Profile: {this.state.percentage}%</Text>    
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


                        <TouchableOpacity onPress={()=>this.bankModal(true)}>

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

                        <TouchableOpacity onPress={()=>this.employmentModal(true)}>
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

                        <TouchableOpacity onPress={()=>this.nextOfKinModal(true)}>
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
  line:{
      borderBottomColor:'red',
    borderBottomWidth:1
  }
});


const mapStateToProp = (state) =>{
    return {
       
        user:state.user,

    }
  }
  
  
  
  export default connect(mapStateToProp)(Profile);