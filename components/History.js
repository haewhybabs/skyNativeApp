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

class History extends Component{
    
    constructor(){
        super()

        this.state = {
           userOpen:false
          
        }
       
    }

    componentDidMount(){
       

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

        

        

        

        return (

        
            <Container>
                <Content>

                <Card>
                    <CardItem>
                        <Left>
                            <Text style={{fontWeight:'bold'}}>MINI Loan</Text><Text style={{fontWeight:'bold'}}> (₦60000)</Text>
                        </Left>

                        
                        
                        <Right>
                            <Text>Jun 10, 2020 to</Text><Text style={{fontWeight:'bold'}}> July 20, 2020</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                       <Left>
                            <Text style={{marginLeft:4}}>Active</Text>
                        </Left>

                        <Body style={{marginTop:7}}>
                            <Text style={{fontWeight:'bold'}}>Payment:₦60000</Text>
                        </Body>
                        
                        <Right>
                            <Button rounded style={{backgroundColor:'#e83e8c',width:60,height:30}}>
                                <Text style={{color:'#fff',width:'100%',textAlign:'center'}}>Pay</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem>
                        <Left>
                            <Text style={{fontWeight:'bold'}}>MINI Loan</Text><Text style={{fontWeight:'bold'}}> (₦60000)</Text>
                        </Left>

                        
                        
                        <Right>
                            <Text>Jun 10, 2020 to</Text><Text style={{fontWeight:'bold'}}> July 20, 2020</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                       <Left>
                            <Text style={{marginLeft:4}}>Active</Text>
                        </Left>

                        <Body style={{marginTop:7}}>
                            <Text style={{fontWeight:'bold'}}>Payment:₦60000</Text>
                        </Body>
                        
                        <Right>
                            <Button rounded style={{backgroundColor:'#e83e8c',width:60,height:30}}>
                                <Text style={{color:'#fff',width:'100%',textAlign:'center'}}>Pay</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem>
                        <Left>
                            <Text style={{fontWeight:'bold'}}>MINI Loan</Text><Text style={{fontWeight:'bold'}}> (₦60000)</Text>
                        </Left>

                        
                        
                        <Right>
                            <Text>Jun 10, 2020 to</Text><Text style={{fontWeight:'bold'}}> July 20, 2020</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                       <Left>
                            <Text style={{marginLeft:4}}>Active</Text>
                        </Left>

                        <Body style={{marginTop:7}}>
                            <Text style={{fontWeight:'bold'}}>Payment:₦60000</Text>
                        </Body>
                        
                        <Right>
                            <Button rounded style={{backgroundColor:'#e83e8c',width:60,height:30}}>
                                <Text style={{color:'#fff',width:'100%',textAlign:'center'}}>Pay</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem>
                        <Left>
                            <Text style={{fontWeight:'bold'}}>MINI Loan</Text><Text style={{fontWeight:'bold'}}> (₦60000)</Text>
                        </Left>

                        
                        
                        <Right>
                            <Text>Jun 10, 2020 to</Text><Text style={{fontWeight:'bold'}}> July 20, 2020</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                       <Left>
                            <Text style={{marginLeft:4}}>Active</Text>
                        </Left>

                        <Body style={{marginTop:7}}>
                            <Text style={{fontWeight:'bold'}}>Payment:₦60000</Text>
                        </Body>
                        
                        <Right>
                            <Button rounded style={{backgroundColor:'#e83e8c',width:60,height:30}}>
                                <Text style={{color:'#fff',width:'100%',textAlign:'center'}}>Pay</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem>
                        <Left>
                            <Text style={{fontWeight:'bold'}}>MINI Loan</Text><Text style={{fontWeight:'bold'}}> (₦60000)</Text>
                        </Left>

                        
                        
                        <Right>
                            <Text>Jun 10, 2020 to</Text><Text style={{fontWeight:'bold'}}> July 20, 2020</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                       <Left>
                            <Text style={{marginLeft:4}}>Active</Text>
                        </Left>

                        <Body style={{marginTop:7}}>
                            <Text style={{fontWeight:'bold'}}>Payment:₦60000</Text>
                        </Body>
                        
                        <Right>
                            <Button rounded style={{backgroundColor:'#e83e8c',width:60,height:30}}>
                                <Text style={{color:'#fff',width:'100%',textAlign:'center'}}>Pay</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
                
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


export default History;