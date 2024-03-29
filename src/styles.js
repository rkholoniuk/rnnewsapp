import { StyleSheet } from 'react-native'
import { color,defaultTheme } from 'react-native-material-design-styles'

export default StyleSheet.create({
  aboutLink: {
    // color: color.paperOrange600.color,
    fontWeight: 'bold',
    padding: 10
  },
  card: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    // fontSize: '1.50rem',
    fontWeight: 'bold'
  },
  image: {
    height: 40,
    marginVertical: 10,
    width: 40
  },
  header: {
    backgroundColor: color.paperLightBlue500.color
  },
  body: {
    flex: 1,
    backgroundColor: color.paperLightBlue500.color
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  // height: 50,
  },
  buttonRow: {
    justifyContent: 'center',
    paddingBottom: 10
  },
  itemRow: {
    flexDirection: 'row',
    paddingTop: 10,
    padding: 2,
    // marginTop: 1,
    backgroundColor: color.paperLightBlue100.color,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  itemSubRow: {
    backgroundColor: color.paperLightBlue100.color,
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  column: {
    // justifyContent: 'space-around',
    flexDirection: 'column'
  // flex: 1,
  // alignItems: 'center'
  },
  box: {
    alignItems: 'center',
    // flex: 1,
    // justifyContent: 'center',
    borderWidth: 1
  // height: 20
  },
  scrollViewContainer: {
    // height: 400,
    flex: 1
  },
  scrollViewStyle: {
    // borderWidth: 1
  },
  scrollViewContentContainerStyle: {
    paddingTop: 2,
    paddingBottom: 2
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20
  },
  buttonOrange: {
    borderColor:color.paperLightBlue800.color,
    backgroundColor: color.paperLightBlue800.color,
  },
  buttonGray: {
    borderColor:'gray',
    borderWidth: 0,
    backgroundColor: color.paperLightBlue800.color,
  }
})
