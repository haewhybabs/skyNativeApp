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

import {materialIcons, MaterialIcons} from '@expo/vector-icons';
import FooterScreen from './Footer';

class Loans extends Component{
    
    constructor(){
        super()

        this.state = {
           userOpen:false,
           loanPlanInput:'',
          
        }
       
    }

    componentDidMount(){
       

    }

    onValueChange2(value) {
        this.setState({
          loanPlanInput: value
        });
    }

    render(){

        

        

        

        return (

            <Container>
                <Content>

                    <View style={{marginTop:20,marginLeft:10,marginRight:10}}>
                        <Text style={{fontWeight:'bold',fontSize:18}}>Loan Application</Text>
                        <Text style={{marginTop:5,lineHeight:23}}>We designed our loan process to fit your needs and help you grow. We support Small and Medium Scale Enterprises (SMEs) operators in Nigeria. Irrespective of the sector
                        your enterprise is operating at an affordable interest rate.
                        </Text>
                        <Text style={{lineHeight:23,fontWeight:'bold'}}>NB: 0.95% is our Monthly Interest,Overdue Interest is 1.00%</Text>
                        


                        <Form>
                            <Label style={{marginTop:20}}>Select Loan Plan</Label>
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
                                    <Picker.Item label="MINI" value="25" />
                                    <Picker.Item label="MIDI" value="27" />
                                    <Picker.Item label="MAXI" value="22" />
                                </Picker>
                            </Item>


                            <Item floatingLabel last>
                                <Label>Enter Amount</Label>
                                <Input onChangeText={(email) => this.setState({email})}/>
                            </Item>

                            <Item floatingLabel last>
                                <Label>Enter Duration</Label>
                                <Input onChangeText={(email) => this.setState({email})}/>
                            </Item>

                            <Item floatingLabel last>
                                <Label>Can we know why you need the loan </Label>
                                <Input onChangeText={(email) => this.setState({email})}/>
                            </Item>

                            <View style={{marginTop:40}}>
                                <Button rounded primary style={{width:'100%',backgroundColor:'#00CCFF'}}>
                                    <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Submit</Text>
                                </Button>
                            </View>
                        </Form>
                    
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


export default Loans;