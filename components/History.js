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
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,Tabs,Tab
} from 'native-base';

import {materialIcons, MaterialIcons} from '@expo/vector-icons';
import FooterScreen from './Footer';
import HeaderScreen from './Header';

class History extends Component{
    
    constructor(){
        super()

        this.state = {
           userOpen:false,
           title:'Loan History'

          
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
                <HeaderScreen navigation={this.props.navigation} title={this.state.title}/>
                
                <Content>

                    <Tabs tabBarBackgroundColor='#fff'>
                        <Tab heading="Pending">
                            <Text>Hell1</Text>
                        </Tab>
                        <Tab heading="Active">
                            <Text>Hell2</Text>
                        </Tab>
                        <Tab heading="Rejected">
                            <Text>Hell3</Text>
                        </Tab>

                        <Tab heading="Concluded">
                            <Text>Hell4</Text>
                        </Tab>
                    </Tabs>

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