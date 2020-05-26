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

    componentDidMount() {
       
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
                <Container style={{backgroundColor:'#fff'}}>
                    <Body>
                        <Image
                            source={require('../assets/skyloan-logo.jpg')}
                            style={{width:300,height:100,marginTop:300}}
                        />

                        
                    </Body>
                
                </Container>
            );

        } else {
            return <Login navigation={this.props.navigation}/>;
        }

        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});





export default Splash;
