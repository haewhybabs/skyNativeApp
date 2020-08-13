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
  Modal,StatusBar,Platform,BackHandler
   } from 'react-native';

import{
    Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,Picker
} from 'native-base';
import {apiUrl,token,vendorImage} from '../Config';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FooterScreen from './Footer';
import HeaderScreen from './Header';
import ProfileModal from './ProfileModal';
import BankProfileModal from './BankProfileModal';
import EmploymentProfileModal from './EmploymentProfileModal';
import NextOfKinProfileModal from './NextOfKinProfileModal';
import ImagePicker from 'react-native-image-picker';

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
    );
const options = {
    title:'Select a photo',
    takePhotoButtonTitle:'Take a photo',
    chooseFromLibraryButtonTitle:'Choose from gallery',
    quality:1
}


class Profile extends Component{
    
    constructor(){
        super()
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state = {
           title:'Profile',
           userInfo:[],
           employmentInfo:[],
           nextOfKinInfo:[],
           bankInfo:[],
           employmentType:[],
           salaryRange:[],
           banks:[],
           states:[],
           lgs:[],
           percentage:'',
           relationship:[],
           sex:[],
           maritalStatus:[],
           status:'',
           isLoading:true,
           userOpen:false,
           bankOpen:false,
           employmentOpen:false,
           nextOfKinOpen:false,
           imageSource:"",
            imageData:null,
            image:null,
          
        }
       
    }
   

    componentDidMount()
    {
       
        const user = this.props.user; 

        fetch(apiUrl+'profile',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':token,
                'Authorization':'Bearer '+user.token
            }
            
        })
        .then(response => {
                                
            return response.json();      
        })
        
        .then((contents)=>{

          

            this.setState({

                userInfo:contents.userInfo,
                employmentInfo:contents.employmentInfo,
                nextOfKinInfo:contents.nextOfKin,
                bankInfo:contents.bankInfo,
                employmentType:contents.employmentType,
                salaryRange:contents.salaryRange,
                banks:contents.banks,
                states:contents.states,
                lgs:contents.lgs,
                percentage:contents.percentage,
                relationship:contents.relationship,
                sex:contents.sex,
                maritalStatus:contents.marital_status,
                status:contents.status,
                isLoading:false,
                image:contents.userInfo.image

            });
        })
        .catch((error)=>{
            
            this.errorInConnection();
        })

    }

    errorInConnection = () => {
        this.hideLoader();

        Toast.show({
            text:'Ops!! Network Connection Problem',
            buttonText:'Okay',
            style:{backgroundColor:'red'}
            
        });
    }

    userModal = (status) =>{
        this.setState({
            userOpen:status
        })
    }

    bankModal = (status) =>{
        this.setState({
            bankOpen:status
        })
    }

    employmentModal = (status) =>{
        this.setState({
            employmentOpen:status
        })
    }

    nextOfKinModal = (status) =>{
        this.setState({
            nextOfKinOpen:status
        })
    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
        
    }

   

    refresh = () => {

        this.componentDidMount();
    }

    selectPhoto =() =>
    {
        ImagePicker.showImagePicker({noData:true,mediaType:'photo'}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } 
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }else {
                let source ={uri:response.uri}
                this.showLoader()
                this.uploadImage(response)
              
                
            }
        });
    }

    uploadImage = async (response) =>{
        
        const baseUrl = apiUrl +'image-upload';
        const uploadData = new FormData();
        uploadData.append('image',{type:response.type, uri:response.uri,name:response.fileName})
        fetch(baseUrl, {
            method:'post',
            headers: {
                Authorization:this.props.user.token,  
            },
            body:uploadData
            
        })
        .then(response => {
            return response.json();
        })   
        .then((contents)=>{

            console.log('Response :' + contents)
            
            this.hideLoader()
            
            this.setState({

                image:contents.url

            });

            Toast.show({
                text:'success!!!',
                buttonText:'Okay',
                style:{backgroundColor:'green'}
                
            })
        })
        .catch((error)=>{ 
            this.errorInConnection();
        })
    }

    componentWillMount() {
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        
        this.props.navigation.navigate('Dashboard')
        
        return true;
    }

    render(){

    

        

        return ( 

            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#00CCFF" animating  />
            </View>
            :
            <Root>

                <Container style={{backgroundColor:'#fff'}}>
                    
                    <Content>
                        <ProfileModal
                        maritalStatus ={this.state.maritalStatus}
                        sex ={this.state.sex}
                        navigation={this.props.navigation} 
                        userOpen={this.state.userOpen}
                        userModal={this.userModal}
                        userInfo = {this.state.userInfo}
                        states= {this.state.states}
                        lgs = {this.state.lgs}
                        user = {this.props.user}
                        showLoader={this.showLoader}
                        hideLoader = {this.hideLoader}
                        refresh = {this.refresh}
                        bankOpen={this.state.bankOpen}   
                        />

                        <BankProfileModal
                        banks={this.state.banks}
                        bankDetails={this.state.bankInfo}
                        bankModal={this.bankModal}
                        bankOpen={this.state.bankOpen}
                        user = {this.props.user}
                        showLoader={this.showLoader}
                        hideLoader = {this.hideLoader}
                        refresh = {this.refresh}
                        />

                        <EmploymentProfileModal
                        states= {this.state.states}
                        lgs = {this.state.lgs}
                        salaryRange={this.state.salaryRange}
                        employmentType ={this.state.employmentType}
                        employmentInfo={this.state.employmentInfo}
                        employmentModal={this.employmentModal}
                        employmentOpen={this.state.employmentOpen}
                        user = {this.props.user}
                        showLoader={this.showLoader}
                        hideLoader = {this.hideLoader}
                        refresh = {this.refresh}    
                        />


                        <NextOfKinProfileModal
                        states= {this.state.states}
                        lgs = {this.state.lgs}
                        nextOfKinModal={this.nextOfKinModal}
                        nextOfKinOpen={this.state.nextOfKinOpen}
                        nextOfKinDetails={this.state.nextOfKinInfo}
                        user = {this.props.user}
                        showLoader={this.showLoader}
                        hideLoader = {this.hideLoader}
                        refresh = {this.refresh}    
                        />

                        <View style={{backgroundColor:'#007bff',width:'100%',height:220}}>
                    
                            <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
                                <Icon name='menu' style={{color:'#fff'}}/>
                            </Button>
                        
                            <View style={{width:'100%',alignItems:'center',marginTop:20}}>
                                <Thumbnail
                                    source = {this.state.image != null ? {uri:this.state.image}:
                                        require('../assets/noImage.png')}
                                    scaleX={2} scaleY={2}
                                    style={{width:50, height:50, borderRadius:50/2}}      
                                />
                                <TouchableOpacity onPress={()=>this.selectPhoto()}>
                                    <Text style={{marginTop:40,color:'#fff',fontSize:20}}>Change Profile Picture</Text>
                                </TouchableOpacity>

                                <View style={{marginTop:10}}>
                                    <Text style={{fontWeight:'bold', color:'#e83e8c'}}> {this.state.percentage}% Complete</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{marginTop:25,alignItems:'center'}}>
                            <Text style={{color:'gray',fontWeight:'bold'}}>Account Information</Text>
                        </View>


                        <TouchableOpacity onPress={()=>this.userModal(true)}>

                            <Card style={{marginTop:10}}>
                                <CardItem>
                                    <Icon active name="person" style={{color:'#00CCFF'}} />
                                    <Text>User Information</Text>
                                    <Right>
                                        <Icon name="arrow-forward" style={{color:'#e83e8c'}}/>
                                    </Right>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>this.bankModal(true)}>

                            <Card>
                                <CardItem>
                                    <Icon active name="home" style={{color:'#00CCFF'}}/>
                                    <Text>Bank Information</Text>
                                    <Right>
                                        <Icon name="arrow-forward" style={{color:'#e83e8c'}} />
                                    </Right>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.employmentModal(true)}>
                            <Card>
                                <CardItem>
                                    <Icon active name="md-document" style={{color:'#00CCFF'}}/>
                                    <Text>Employment Information</Text>
                                    <Right>
                                        <Icon name="arrow-forward" style={{color:'#e83e8c'}}/>
                                    </Right>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.nextOfKinModal(true)}>
                            <Card>
                                <CardItem>
                                    <Icon active name="man" style={{color:'#00CCFF'}}/>
                                    <Text>Next Of Kin Information</Text>
                                    <Right>
                                        <Icon name="arrow-forward" style={{color:'#e83e8c'}} />
                                    </Right>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    </Content>
                    <FooterScreen navigation={this.props.navigation}/>
                    
                </Container>
            </Root>
        )

    }

}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  image: {
    marginTop:50,
    height:150,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    marginLeft:'3%',
    marginRight:'3%'
  },
  line:{
      borderBottomColor:'red',
    borderBottomWidth:1
  },

  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
});


const mapStateToProp = (state) =>{
    return {
       
        user:state.user,

    }
  }
  
  
  
  export default connect(mapStateToProp)(Profile);