import { StyleSheet } from 'react-native'
// @TODO adapt auto-scaling based on screen size, 
// then all these size variations will be replaced with a single style
export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logoStyleXSm: {
    width: 50,
    height: 50

  },
  logoStyleSm: {
    width: 100,
    height: 100

  },
  logoStyleMd: {
    width: 150,
    height: 150
  },
  logoStyleLg: {
    width: 150,
    height: 150
	},
	logoStyleXLg: {
    width: 175,
    height: 175
  }
})
