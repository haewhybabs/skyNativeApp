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
  Modal,
  FlatList,
  ScrollView
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,Picker,DatePicker
} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {materialIcons, MaterialIcons} from 'react-native-vector-icons';
import FooterScreen from './Footer';
import {apiUrl,token,vendorImage} from '../Config';

class BankProfileModal extends Component{
    
    constructor(props){

        super(props);

        this.state = {
           userBank:'',
           accountNumber:'',
           bvn:'',
           userBankName:''

          
        }

        
       
    }

    

    componentWillReceiveProps(props){
        if(props.bankDetails !=null)
        {
            this.setState({
                userBank:props.bankDetails.bank_id,
                accountNumber:props.bankDetails.account_number,
                bvn:props.bankDetails.bvn,
            })
        }
        

        
        // nextState.address =nextProps.userInfo.address;
    }


    onValueUserBankChange(value) {
        this.setState({
            userBank:value,
        });
    }

    
    updateHandler()
    {
        
        const user = this.props.user;
        const value = this.state;

        this.props.bankModal(false);
        this.props.showLoader();
       

        fetch(apiUrl+'bank-info',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':token,
                'Authorization':'Bearer '+user.token,
                'Accept': 'application/json',
            },

            body: JSON.stringify({
                account_number:value.accountNumber,
                bvn:value.bvn,
                bank_id:value.userBank
            })

            
            
        })
        .then(response => {                        
            return response.json();   
             
        })
        .then((contents)=>{
            this.props.refresh();
            this.props.hideLoader();    
            console.log(contents);        
            

            if(contents.status){
                Toast.show({
                    text:'Success!!',
                    buttonText:'Okay',
                    style:{backgroundColor:'green'}
                
                });
            }

            else{
                Toast.show({
                    text:'All fields are required!!',
                    buttonText:'Okay',
                    style:{backgroundColor:'red'}
                
                });
            }

        })
        .catch((error)=>{
            this.props.refresh();
            this.props.hideLoader();
            Toast.show({
                text:'Error Occured!!',
                buttonText:'Okay',
                style:{backgroundColor:'gray'}            
            })          
        })

        
    }

    render(){

        return (
            
                    <Modal visible={this.props.bankOpen}>

                        <ScrollView>
                            <View>
                            <TouchableOpacity onPress={()=>this.props.bankModal(false)} style={{alignItems:'center', marginTop:10,marginBottom:10}}>
                                <Icon name="close" style={{color:'#e83e8c'}} />  
                            </TouchableOpacity>                                    
                               
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={{fontWeight:'bold'}}>Bank Information Details</Text>
                            </View>

                            <View style={{borderBottomColor:'#e83e8c',borderBottomWidth:3,alignSelf:'stretch',marginTop:10}}/>

                            <Form>

                                <Label style={{marginTop:20,marginLeft:10}}>Select Bank</Label>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                    
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.userBank}
                                        onValueChange={this.onValueUserBankChange.bind(this)}
                                        >

                                        {this.state.userBank !='' ?
                                            <Picker.Item label={this.state.userBankName} value={this.state.userBank}/>

                                            :null
                                    
                                        }

                                        {this.props.banks.map((row, index) => (
                                            <Picker.Item label={row.name} value={row.idbanks} key={row.idbanks} />
                                        ))}          
                                    </Picker>
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Account Number</Label>
                                    <Input onChangeText={(accountNumber) => this.setState({accountNumber})} value={this.state.accountNumber}/>
                                </Item>
                                <Item floatingLabel last>
                                    <Label>BVN</Label>
                                    <Input  onChangeText={(bvn) => this.setState({bvn})} value={this.state.bvn}/>
                                </Item>
                                

                                <View style={{marginTop:50,marginBottom:20}}>
                                    <Button rounded primary style={{width:'100%',backgroundColor:'#00CCFF'}} onPress={this.updateHandler.bind(this)}>
                                        <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Update</Text>
                                    </Button>
                                </View>
                            </Form>
                        </ScrollView>
                        
                    </Modal>
                
                

            
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



  export default BankProfileModal;