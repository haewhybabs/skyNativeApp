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

class ProfileModal extends Component{
    
    constructor(props){

        super(props);

        this.state = {
           userOpen:false,
           userMaritalStatus:props.userInfo.marital_status,
           chosenDate:'',
           phone_number:props.userInfo.phone_number,
           email:props.userInfo.email,
           fullname:props.userInfo.fullname,
           address:props.userInfo.address,
           userLg:props.userInfo.lg_id,
           userSex:props.userInfo.sex,
           userState:props.userInfo.state_id,
           
           selectedLgs:[],
           chosenDate:'',
           userLgName:'',
           userSexName:'',
           userStateName:'',
           userMaritalStatusName:''

          
        }

        this.setDate = this.setDate.bind(this);
       
    }

    componentDidMount(){

        var lg = this.props.lgs.filter(lgs=> lgs.idlgs == this.props.userInfo.lg_id);

        var states = this.props.states.filter(states=> states.idstates == this.props.userInfo.state_id);

        var sex = this.props.sex.filter(sex=> sex.idsex == this.props.userInfo.sex);
        
        var maritalStatus = this.props.maritalStatus.filter(ms=> ms.idmaritalstatus == this.props.userInfo.marital_status);
        


       

        if(lg.length>0){
            this.setState({
                userLgName:lg[0].lgs,
                userSexName:sex[0].name,
                userStateName:states[0].names,
                userMaritalStatusName:maritalStatus[0].name

            })

        }

       

    }

    componentWillReceiveProps(props){
        this.setState({
            userMaritalStatus:props.userInfo.marital_status,
           chosenDate:'',
           phone_number:props.userInfo.phone_number,
           email:props.userInfo.email,
           fullname:props.userInfo.fullname,
           address:props.userInfo.address,
           userLg:props.userInfo.lg_id,
           userSex:props.userInfo.sex,
           userState:props.userInfo.state_id,
        })

        var lg = this.props.lgs.filter(lgs=> lgs.idlgs == props.userInfo.lg_id);

        var states = this.props.states.filter(states=> states.idstates == props.userInfo.state_id);

        var sex = this.props.sex.filter(sex=> sex.idsex == props.userInfo.sex);
        
        var maritalStatus = this.props.maritalStatus.filter(ms=> ms.idmaritalstatus == props.userInfo.marital_status);
        


       

        if(lg.length>0){
            this.setState({
                userLgName:lg[0].lgs,
                userSexName:sex[0].name,
                userStateName:states[0].names,
                userMaritalStatusName:maritalStatus[0].name

            })

        }
        // nextState.address =nextProps.userInfo.address;
    }

    onValueUserStateChange(value) {
        this.setState({
            userState:value,
        });


        var lg = this.props.lgs.filter(lgs=> lgs.state_id == value);
        
        this.setState({
            selectedLgs:lg
        });
    }


    onValueUserLgChange(value) {
        this.setState({
            userLg:value,
        });
    }

    onValueUserSexChange(value) {
        this.setState({
            userSex:value,
        });
    }

    onValueUserMaritalStatusChange(value) {
        this.setState({
            userMaritalStatus:value,
        });
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    updateHandler()
    {
        
        const user = this.props.user;
        const value = this.state;

        this.props.userModal(false);
        this.props.showLoader();
       

        fetch(apiUrl+'user-profile',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':token,
                'Authorization':'Bearer '+user.token,
                'Accept': 'application/json',
            },

            body: JSON.stringify({
                fullname:value.fullname,
                address:value.address,
                phone_number:value.phone_number,
                lg_id:value.userLg,
                state_id:value.userState,
                sex:value.userSex,
                marital_status:value.userMaritalStatus,
                dob:value.chosenDate,
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
            this.componentDidMount();
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
            
                    <Modal visible={this.props.userOpen}>

                        <ScrollView>
                            <View>                                        
                            <TouchableOpacity onPress={()=>this.props.userModal(false)} style={{alignItems:'center', marginTop:10,marginBottom:10}}>
                                <Icon name="close" style={{color:'#e83e8c'}} />  
                            </TouchableOpacity> 
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={{fontWeight:'bold'}}>User Information Details</Text>
                            </View>

                            <View style={{borderBottomColor:'#e83e8c',borderBottomWidth:3,alignSelf:'stretch',marginTop:10}}/>

                            <Form>
                                <Item floatingLabel last>
                                    <Label>Full Name</Label>
                                    <Input onChangeText={(fullname) => this.setState({fullname})} value={this.state.fullname}/>
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Phone Number</Label>
                                    <Input  onChangeText={(phone_number) => this.setState({phone_number})} value={this.state.phone_number}/>
                                </Item>

                                <Item floatingLabel last>
                                    <Label>Address</Label>
                                    <Input  onChangeText={(address) => this.setState({address})} value={this.state.address}/>
                                </Item>
                                <Label style={{marginTop:20,marginLeft:10}}>Choose your date of birth</Label>
                                    <DatePicker
                                    defaultDate={new Date(2018, 4, 4)}
                                    minimumDate={new Date(1920, 1, 1)}
                                    maximumDate={new Date()}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Date of birth"
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                    />
                                    <Text>
                                     {this.state.chosenDate.toString().substr(4, 12)}
                                    </Text>
                                

                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                    
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.userSex}
                                        onValueChange={this.onValueUserSexChange.bind(this)}
                                        >

                                        <Picker.Item label="Sex"  value=""/>

                                        {this.props.sex.map((row, index) => (
                                            <Picker.Item label={row.name} value={row.idsex} key={row.idsex} />
                                        ))}          
                                    </Picker>
                                </Item>

                                <Label style={{marginTop:20,marginLeft:10}}>Marital Status</Label>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                    
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.userMaritalStatus}
                                        onValueChange={this.onValueUserMaritalStatusChange.bind(this)}
                                        >

                                        <Picker.Item label="Marital Status"  value=""/>

                                        {this.props.maritalStatus.map((row, index) => (
                                            <Picker.Item label={row.name} value={row.idmaritalstatus} key={row.idmaritalstatus} />
                                        ))}          
                                    </Picker>
                                </Item>


                               
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                    
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.userState}
                                        onValueChange={this.onValueUserStateChange.bind(this)}
                                        >

                                        <Picker.Item label="Select State"  value=""/>

                                        {this.props.states.map((row, index) => (
                                            <Picker.Item label={row.names} value={row.idstates} key={row.idstates} />
                                        ))} 
                                    </Picker>
                                </Item>

                                <Label style={{marginLeft:10}}>Select Local Government</Label>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                    
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.userLg}
                                        onValueChange={this.onValueUserLgChange.bind(this)}
                                        >

                                        {this.state.userLg !='' ?
                                            <Picker.Item label={this.state.userLgName} value={this.state.userLg}/>

                                            :null
                                    
                                        }                                     

                                        {this.state.selectedLgs.map((row, index) => (
                                            <Picker.Item label={row.lgs} value={row.idlgs} key={row.idlgs} />
                                        ))}       
                                    </Picker>
                                </Item>

                                <View style={{marginTop:20,marginBottom:20}}>
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



  export default ProfileModal;