import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
  Text
} from 'react-vr';
import { Easing } from 'react-native'


class Pointer extends React.Component {

  constructor(props) {
    super();

    this.state = {
      // animatedTranslation: new Animated.Value(0),
      animationValue: new Animated.Value(1.5),
      pointerEntered: false,
      pointerImg: 'pointer.png',
      bookingTextOpacity: 0
      
    };
  }

  componentDidMount(){
    this.animation();

  }

  animation(){

    if(!this.state.pointerEntered)

    Animated.sequence([
      Animated.timing(
        this.state.animationValue,
        {
          toValue: 0,
          duration: 400
        }
      ),
      Animated.timing(
        this.state.animationValue,
        {
          toValue: 0.15,
          duration: 400,
          easing: Easing.elastic(0)
        }
      )
    ]).start(()=> {
      this.animation();
    });

  }

  onPointerClick = () => {
    console.log('clicky');
  }

  onPointerEnter = () => {
    console.log('enter')
    this.setState({pointerEntered: true, pointerImg: 'reserve_table2.png', bookingTextOpacity: 100})


  }

  onPointerExit = () => {
    console.log('on exit')
    Promise.resolve(this.setState({pointerEntered: false, pointerImg: 'pointer.png', bookingTextOpacity: 0}))
    .then(() => {
      this.animation()
    })
    
  }

  render () {
    return (
            <View>
              <Animated.View 
                billboarding={'on'}
                style={{
                  transform: [
                    {translateY: this.state.animationValue},
                    {translate: this.props.coords},
                  ],
                  
                  width: 0.7,
                }}
              >
                <VrButton 
                  onClick={ () => {this.onPointerClick()} }
                  onEnter={this.onPointerEnter}
                  onExit={this.onPointerExit}
                >
                  <Image
                    style={{
                      width: 0.7,
                      height: 0.7,
                    }}
                    source={asset(this.state.pointerImg)}
                  >
                  {/* <Text
                    style={{
                        width: 2,
                        height: 2,
                        fontSize: 0.2,
                        opacity: this.state.bookingTextOpacity
                      }}
                  
                  >
                      Make Reservation?
                  </Text> */}
                  </Image>
                </VrButton>
              </Animated.View>
            </View>
    );
  }
};

export default Pointer;