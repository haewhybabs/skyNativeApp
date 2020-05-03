import React,{Component} from 'react';
import { 
  StyleSheet,
  Image,
  Text
   } from 'react-native';
import {  Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,
    Picker} from 'native-base';
    import Login from './Login';

    import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

class SideBar extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
            userdetails:[],
            timePassed:false
        }
  
       
    }

    componentDidMount() {
       
    }
    
    
  
    render(){

            return (  
                <Container>
                    <Body>
                        <Image
                            source={require('../assets/img/splash.png')}
                            style={{width:300,height:50,marginTop:300}}
                        />

                        
                    </Body>
                
                </Container>
            );

        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});





export default SideBar;
