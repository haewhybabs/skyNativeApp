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
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail
} from 'native-base';

import {materialIcons, MaterialIcons} from '@expo/vector-icons';
import FooterScreen from './Footer';

class ProfileModal extends Component{
    
    constructor(){
        super()

        this.state = {
           userOpen:false
          
        }
       
    }

    componentDidMount(){
       

    }

    render(){

        

        

        

        return (

        
                <View>
                    <Modal visible={this.props.userOpen}>
                        <View>                                        
                            <MaterialIcons
                                name='close'
                                size={24}
                                style={styles.modalToggle}
                                onPress={()=>this.props.userModal(false)}
                            /> 
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold'}}>User Information Details</Text>
                        </View>

                        <View style={{borderBottomColor:'#e83e8c',borderBottomWidth:3,alignSelf:'stretch',marginTop:10}}/>

                        <Form>
                            <Item floatingLabel>
                                <Label>Full Name</Label>
                                <Input onChangeText={(email) => this.setState({email})}/>
                            </Item>
                            <Item floatingLabel last>
                                <Label>Phone Number</Label>
                                <Input  onChangeText={(password) => this.setState({password})}/>
                            </Item>

                            <Item floatingLabel>
                                <Label>Address</Label>
                                <Input  onChangeText={(password) => this.setState({password})}/>
                            </Item>

                            <Item floatingLabel>
                                <Label>Date of Birth</Label>
                                <Input onChangeText={(password) => this.setState({password})}/>
                            </Item>

                            <Item floatingLabel>
                                <Label>Marital Status</Label>
                                <Input onChangeText={(password) => this.setState({password})}/>
                            </Item>

                            <Item floatingLabel>
                                <Label>State</Label>
                                <Input secureTextEntry onChangeText={(password) => this.setState({password})}/>
                            </Item>

                            <Item floatingLabel>
                                <Label>Local Government</Label>
                                <Input secureTextEntry onChangeText={(password) => this.setState({password})}/>
                            </Item>

                            <View style={{marginTop:50}}>
                                <Button rounded primary style={{width:'100%',backgroundColor:'#00CCFF'}}>
                                    <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Update</Text>
                                </Button>
                            </View>
                        </Form>
                        
                    </Modal>
                
                

            </View>
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