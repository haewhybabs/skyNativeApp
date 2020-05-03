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
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,Picker
} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {materialIcons, MaterialIcons} from '@expo/vector-icons';
import FooterScreen from './Footer';
import {apiUrl,token,vendorImage} from '../Config';

class EmploymentProfileModal extends Component{
    
    constructor(props){

        super(props);

        this.state = {
            employerName:'',
            employerAddress:'',
            natureOfJob:'',
            salaryRangeId:'',
            employerLgId:'',
            employerStateId:'',
            employmentTypeId:'',
            employerLgName:'',
            employerStateName:'',
            employmentTypeName:'',
            salaryRangeName:'',

            selectedLgs:[]


          
        }

        
       
    }

    

    componentWillReceiveProps(props){
        if(props.employmentInfo !=null)
        {
            this.setState({
                employerName:props.employmentInfo.employer_name,
                employerAddress:props.employmentInfo.employer_address,
                natureOfJob:props.employmentInfo.nature_of_job,
                salaryRangeId:props.employmentInfo.salary_range_id,
                employerLgId:props.employmentInfo.employer_lg_id,
                employerStateId:props.employmentInfo.employer_state_id,
                employmentTypeId:props.employmentInfo.employment_type_id,
                natureOfJob:props.employmentInfo.nature_of_job
            });

            var lg = this.props.lgs.filter(lgs=> lgs.idlgs == props.employmentInfo.employer_lg_id);

            var state = this.props.states.filter(states=> states.idstates == props.employmentInfo.employer_state_id);

            var employmentType = this.props.employmentType.filter(employmentType=> employmentType.idemploymenttype == props.employmentInfo.employment_type_id);
            
            var salaryRange = this.props.salaryRange.filter(salaryRange=> salaryRange.idsalaryrange == props.employmentInfo.salary_range_id);

            if(lg.length>0){
                this.setState({
                    employerLgName:lg[0].lgs,
                    employerStateName:state[0].names,
                    employmentTypeName:employmentType[0].employment,
                    salaryRangeName:salaryRange[0].salary_range,
                    

                })

            }

        }
        
    }


    onValueStateChange(value) {
        this.setState({
            employerStateId:value,
        });


        var lg = this.props.lgs.filter(lgs=> lgs.state_id == value);
        
        this.setState({
            selectedLgs:lg
        });
    }

    onValueLgChange(value) {
        this.setState({
            employerLgId:value,
        });
    }

    onValueSalaryChange(value) {
        this.setState({
            salaryRangeId:value,
        });
    }

    onValueEmploymentChange(value) {
        this.setState({
            employmentTypeId:value,
        });
    }

    
    updateHandler()
    {
        
        const user = this.props.user;
        const value = this.state;

        this.props.employmentModal(false);
        this.props.showLoader();

        console.log(value);
       

        fetch(apiUrl+'employment-info',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':token,
                'Authorization':'Bearer '+user.token,
                'Accept': 'application/json',
            },

            body: JSON.stringify({
                employer_name:value.employerName,
                employment_type_id:value.employmentTypeId,
                employer_address:value.employerAddress,
                nature_of_job:value.natureOfJob,
                salary_range_id:value.salaryRangeId,
                employer_lg_id:value.employerLgId,
                employer_state_id:value.employerStateId
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
            
                    <Modal visible={this.props.employmentOpen}>

                        <ScrollView>
                            <View>                                        
                                <MaterialIcons
                                    name='close'
                                    size={24}
                                    style={styles.modalToggle}
                                    onPress={()=>this.props.employmentModal(false)}
                                /> 
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={{fontWeight:'bold'}}>Employment Information Details</Text>
                            </View>

                            <View style={{borderBottomColor:'#e83e8c',borderBottomWidth:3,alignSelf:'stretch',marginTop:10}}/>

                            <Form>

                                <Item floatingLabel last>
                                    <Label>Employer Name</Label>
                                    <Input onChangeText={(employerName) => this.setState({employerName})} value={this.state.employerName}/>
                                </Item>
                                
                                
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                    
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.employerStateId}
                                        onValueChange={this.onValueStateChange.bind(this)}
                                        >
                                        

                                        {this.props.states.map((row, index) => (
                                            <Picker.Item label={row.names} value={row.idstates} key={row.idstates} />
                                        ))}          
                                    </Picker>
                                </Item>

                                
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                    
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.employerLgId}
                                        onValueChange={this.onValueLgChange.bind(this)}
                                        >

                                        
                                        {this.state.employerLgId !='' ?
                                            <Picker.Item label={this.state.employerLgName} value={this.state.employerLgId}/>

                                            :null
                                    
                                        }
                                        {this.state.selectedLgs.map((row, index) => (
                                            <Picker.Item label={row.lgs} value={row.idlgs} key={row.idlgs} />
                                        ))}       
                                    </Picker>
                                </Item>


                                <Item floatingLabel last>
                                    <Label>Employer Address</Label>
                                    <Input onChangeText={(employerAddress) => this.setState({employerAddress})} value={this.state.employerAddress}/>
                                </Item>
                                
                                <Item floatingLabel last>
                                    <Label>Nature of job</Label>
                                    <Input onChangeText={(natureOfJob) => this.setState({natureOfJob})} value={this.state.natureOfJob}/>
                                </Item>


                               
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                    
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.employmentTypeId}
                                        onValueChange={this.onValueEmploymentChange.bind(this)}
                                        >
                                        
                                        

                                        {this.props.employmentType.map((row, index) => (
                                            <Picker.Item label={row.employment} value={row.idemploymenttype} key={row.idemploymenttype} />
                                        ))}       
                                    </Picker>
                                </Item>

                                
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                    
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.salaryRangeId}
                                        onValueChange={this.onValueSalaryChange.bind(this)}
                                        >

                                        
                                        {this.props.salaryRange.map((row, index) => (
                                            <Picker.Item label={row.salary_range} value={row.idsalaryrange} key={row.idsalaryrange} />
                                        ))}       
                                    </Picker>
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



  export default EmploymentProfileModal;