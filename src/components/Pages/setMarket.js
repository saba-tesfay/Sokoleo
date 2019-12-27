import React, { Component } from "react";
import {sellerupload} from '../../store/actions/SellerUploadAction';
import {getLocation} from '../../store/actions/LocationAction';
import { withScriptjs, withGoogleMap, GoogleMap, Circle,Marker } from "react-google-maps";
import {connect} from 'react-redux';
import Geocode from "react-geocode";
import {setmarket} from '../../store/actions/setMarketAction';
Geocode.setApiKey( "AIzaSyCd5GSrdhkRjDu53HCBVL7fh5QXa1-gIBE" );
Geocode.enableDebug();

class SetMarket extends Component {
    state = {
        searched:'',
        MarketName:'',
        markerPosition: [],   
        mapPosition: {
            lat: -0.023559, lng: 37.90619300000003
        }, 
        north:'',
        south:'',
        east:'',
        west:''
        
        

         
    };

    setMark = e => {
        
        console.log('this is it',e.latLng)
       this.setState({ markerPosition: [...this.state.markerPosition,e.latLng],
        pos:[e.latLng.lat(),e.latLng.lng()],
        
        
    
        });
        if(this.state.north===''){
            this.setState({
                north:e.latLng.lat(),
                    south:e.latLng.lat(),
                    east:e.latLng.lng(),
                    west:e.latLng.lng(),
            })
        }
        else{
            let max=this.state.north
            if(e.latLng.lat()>max){
                max=e.latLng.lat()
                this.setState({
                    north:max
                })
                console.log('north',e.latLng.lat(),max)
            }
            
            max=this.state.east
            if(e.latLng.lng()>max){
                max=e.latLng.lng()
                this.setState({
                    east:max
                })
                console.log('east',e.latLng.lng(),max)
            }
            let min= this.state.south
            if(e.latLng.lat()<min){
                min=e.latLng.lat()
                this.setState({
                    south:min
                })
            }
            console.log(min,'south')
            min=this.state.wast
            if(e.latLng.lng()<min){
                min=e.latLng.lng()
                this.setState({
                    west:min
                })
            }
            
        }
        console.log('the array ',this.state.pos)
    };
    handelChangeAuto=(e)=>{
        this.setState({
          searched:e.target.value,
        })
         }
    handelChange=(e)=>{
            this.setState({
              MarketName:e.target.value,
            })
             }
    handleSubmit=(e)=>{
      
            e.preventDefault();
            
            const search=(props,searchvalue)=>{
                console.log(searchvalue)
                    
                  if (searchvalue==='')
                  {return(
                    this.setState({
                        mapPosition: {
                            lat: -0.023559, lng: 37.90619300000003
                        },
                    })
                  )}
                else {
                    
                    Geocode.fromAddress(searchvalue).then(
                      
                      response => {
                        const { lat, lng,northeast } = response.results[0].geometry.location;
                        const t=response.results[0].geometry.location
                        
                        this.setState({
                          mapPosition:t
                        })
                        
                      },
                      error => {
                        console.error("error",error);
                      }
                    );
                   }
                  
                   
                };
                search(this.props,this.state.searched)	
              console.log(this.state.mapPosition,'this should work')
              
               
         }
    onhandleSubmitform=e=>{
        e.preventDefault();
        
        this.state.markerPosition.map((Element,index)=>{
            console.log(Element.lat(),Element.lng(),'here are the elements')
            
            
        })
       
            console.log('this is set',this.state.north,this.state.south,this.state.east,this.state.west)
        this.props.setmarket({MarketName:this.state.MarketName,northEast:{lat:this.state.north,lng:this.state.east},southWast:{lat:this.state.south,lng:this.state.west}})
        
        
        
    }
    deleteMarkS = () => {
        this.setState({
            markerPosition: [],
            pos:[]
        });
    };

    render() {
        const Map = withScriptjs(
            withGoogleMap(props => (
                <GoogleMap
                    defaultZoom={12}
                    defaultCenter={{lat: props.center.lat, lng: props.center.lng}}
                    onClick={e => props.onMapClick(e)}
                >
                 {console.log("belew",props.center)}
                    {props.marks.map((mark, index) => <Marker key={index} 
              
                    // position={mark}
                    position={{ lat: mark.lat(),  lng: mark.lng() }}
                    // position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                  
                     />)}
                   
                </GoogleMap>
            ))
        );
        
        const { markerPosition } = this.state;
        
        
       
        return (
            <div >
                <div style={{marginLeft:'10%',marginBottom:'5%'}}>
                <h4>Market Name:</h4>
                <input type="text"  style={{width:'60%',marginRight:'10%'}}class="form-control "id='Market' onChange ={this.handelChange}  placeholder="Market name"/>
				
                </div>
                <div style={{marginLeft:'10%',marginBottom:'5%'}}>
                <input type="text"  style={{width:'60%',marginRight:'10%'}}class="form-control float-left"id='location' onChange ={this.handelChangeAuto}  placeholder="Location"/>
				<button class="btn btn-primary  px-5 " onClick={this.handleSubmit}>Search</button>
                </div>
                <Map
                    googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyCd5GSrdhkRjDu53HCBVL7fh5QXa1-gIBE"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{height: `500px` ,width:'80%', marginLeft:'10%',backgroundColor:'white'}} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMapClick={this.setMark}
                    center={{lat:this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
                    marks={markerPosition}
                />
               
                <div style={{marginLeft:'10%'}}>
                <button onClick={this.deleteMarkS}    class="btn btn-primary  px-5">Clear</button>
                <button onClick={this.onhandleSubmitform} style={{marginLeft:'2%'}} class="btn btn-primary  px-5">Submit</button>
                </div>
            </div>
        );
    }
}

  const mapDispatchToProps=(dispatch)=>{
    return{
        setmarket :(uploads)=>dispatch(setmarket (uploads)),
    }
  }
 
  export default connect(null,mapDispatchToProps)(SetMarket);