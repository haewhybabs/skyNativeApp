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

class Splash extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
            userdetails:[],
            timePassed:false
        }
  
       
    }

    async componentDidMount() {
        await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
        })
        this.setState({ loading: false })
        setTimeout( () => {
            this.setTimePassed();
        },2000);
    }



    setTimePassed() {
        this.setState({timePassed: true});
    }

    
    
  
    render(){

        if (!this.state.timePassed) {
            return (  
                <Container style={{backgroundColor:'#007bff'}}>
                    <Body>
                        <Image
                            source={require('../assets/img/splash.png')}
                            style={{width:170,height:170,marginTop:250}}
                        />

                        <Text style={{color:'#f8f9fa', fontSize:30, fontWeight:'bold'}}>SKYLOAN</Text>
                    </Body>
                
                </Container>
            );

        } else {
            return <Login route={this.props.navigation.navigate}/>;
        }

        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});





export default Splash;
