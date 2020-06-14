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

class NextOfKinProfileModal extends Component{
    
    constructor(props){

        super(props);

        this.state = {

           email:'',
           fullName:'',
           phoneNumber:'',
           address:'',
           stateId:'',
           lgId:'',
           relationship:'',
           lgName:'',
           stateName:'',
           selectedLgs:[],

          
        }

        
       
    }

    

    componentWillReceiveProps(props){
        if(props.nextOfKinDetails !=null)
        {
            this.setState({
                fullName:props.nextOfKinDetails.fullname,
                email:props.nextOfKinDetails.email,
                phoneNumber:props.nextOfKinDetails.phone_number,
                address:props.nextOfKinDetails.address,
                stateId:props.nextOfKinDetails.state_id,
                lgId:props.nextOfKinDetails.lg_id,
                relationship:props.nextOfKinDetails.relationship
            })

            var lg = this.props.lgs.filter(lgs=> lgs.idlgs == props.nextOfKinDetails.lg_id);

            var state = this.props.states.filter(states=> states.idstates == props.nextOfKinDetails.state_id);

            if(lg.length>0){
                this.setState({
                    lgName:lg[0].lgs,
                    stateName:state[0].names,
                })

            }
        }
        
    }

    onValueStateChange(value) {
        this.setState({
            stateId:value,
        });


        var lg = this.props.lgs.filter(lgs=> lgs.state_id == value);
        
        this.setState({
            selectedLgs:lg
        });
    }

    onValueLgChange(value) {
        this.setState({
            lgId:value,
        });
    }

    
    updateHandler()
    {
        
        const user = this.props.user;
        const value = this.state;

        this.props.nextOfKinModal(false);
        this.props.showLoader();
       

        fetch(apiUrl+'next-of-kin-info',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':token,
                'Authorization':'Bearer '+user.token,
                'Accept': 'application/json',
            },

            body: JSON.stringify({
                email:value.email,
                fullname:value.fullName,
                address:value.address,
                relationship:value.relationship,
                phone_number:value.phoneNumber
            })

            
            
        })
        .then(response => {                        
            return response.json();   
             
        })
        .then((contents)=>{
            this.props.refresh();
            this.props.hideLoader();   
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
            
                    <Modal visible={this.props.nextOfKinOpen}>

                        <ScrollView>
                            <View>                                        
                            <TouchableOpacity onPress={()=>this.props.nextOfKinModal(false)} style={{alignItems:'center', marginTop:10,marginBottom:10}}>
                                <Icon name="close" style={{color:'#e83e8c'}} />  
                            </TouchableOpacity> 
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={{fontWeight:'bold'}}>Next of kin Information Details</Text>
                            </View>

                            <View style={{borderBottomColor:'#e83e8c',borderBottomWidth:3,alignSelf:'stretch',marginTop:10}}/>

                            <Form>
                                
                                <Item floatingLabel last>
                                    <Label>Full Name</Label>
                                    <Input onChangeText={(fullName) => this.setState({fullName})} value={this.state.fullName}/>
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Email</Label>
                                    <Input  onChangeText={(email) => this.setState({email})} value={this.state.email}/>
                                </Item>

                                <Item floatingLabel last>
                                    <Label>Phone Number</Label>
                                    <Input onChangeText={(phoneNumber) => this.setState({phoneNumber})} value={this.state.phoneNumber}/>
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Relationship</Label>
                                    <Input  onChangeText={(relationship) => this.setState({relationship})} value={this.state.relationship}/>
                                </Item>

                                
                            
                                <Item floatingLabel last>
                                    <Label>Address</Label>
                                    <Input onChangeText={(address) => this.setState({address})} value={this.state.address}/>
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



  export default NextOfKinProfileModal;