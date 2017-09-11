import React from 'react'
import { Text, View,
  TouchableHighlight, ScrollView,
  StatusBar, ActivityIndicator, Dimensions,
  Platform, Image } from 'react-native'

// assets
import { color } from 'react-native-material-design-styles'
import logo from '../../images/logo.png'
import styles from '../../styles'
import Share, {ShareSheet, Button} from 'react-native-share';
// utils
import moment from 'moment'

function domainUrl (url) {
    const domain = url.split(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/)[1]
    return domain || 'n/a'
}

// ComponentsmarginTop:
const Card = ({ children }) => <View style={styles.card}>{children}</View>

const cursorStyle = Platform.OS === 'web' ? {cursor: 'pointer'} : {}

const Overlay = ({children, visible}) => (
  (visible) ? (
    <View style={{position: 'absolute', marginTop: (Platform.OS === 'ios') ? 48 : 28, zIndex: 1}}>
      <Text style={{fontSize: 28, marginLeft: Dimensions.get('window').width * 0.9, backgroundColor: 'rgba(52,52,52, 0.0)', color: 'white', zIndex: 3}}>⏏</Text>
      <View style={{padding: 10, marginTop: -17, width: Dimensions.get('window').width, height: 400, backgroundColor: 'rgba(255,255,255,80)'}}>
      {children}
      </View>
    </View>
    ) : <View />
)

class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  scrollToTop () {
    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true})
  }
  shareUrl(item) {
    if (Platform.OS === 'web') {
      debugger;
      window.open(`https://twitter.com/share?url=${item.link}&text=${item.title}`, '_blank')
    }
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      let shareOptions = {
        title: item.title,
        message: "",
        url: item.link,
        subject: "Share Link" //  for email
      };
      Share.shareSingle(Object.assign(shareOptions, {
        "social": "twitter"
      }));
    }
  }

  render () {
    const { items, errors, loading, filter, filters, overlayVisible, onLoadMore, onLoadItems, onOpenUrl, onToggleOverlay } = this.props

    return (
      <Card>
        {Platform.OS === 'android' ? (
          <StatusBar backgroundColor={'#d25500'} />
        ) : <View />}
        <View style={styles.body}>

          <Overlay visible={overlayVisible}>
            <Text style={{fontSize: 18}}>
              <Text style={{fontWeight: 'bold'}}>HAgnostic News</Text> is a simple Hacker News reader for the Web and a React Native app (Android / iOS).
            </Text>
            <Text style={{fontSize: 18, marginTop: 20}}> News App</Text>
          </Overlay>

          <View style={[styles.column, styles.header,
            Platform.OS === 'ios' ? { height: 75, paddingTop: 20 } : {} ]}>
            <View style={[styles.row, { height: 50 }]}>
              <View style={styles.row}>
                <Image source={logo} style={{width: 20}} />
                <Text style={[{fontWeight: 'bold', paddingLeft: 4}]}>News App</Text>
              </View>
              {filters.map((filterKey, i) => (
                <TouchableHighlight
                style={[styles.button, filter === filterKey ? styles.buttonOrange : null]}
                underlayColor={color.paperOrange200.color}
                onPress={() => { onLoadItems(filterKey); this.scrollToTop() }}>
                <View style={styles.row}>
                  <Text style={{color: 'white', fontWeight: 'bold', paddingRight: 5}}>{filterKey}</Text>{ filter === filterKey && loading ? <ActivityIndicator /> : null}
                </View>
              </TouchableHighlight>
               ))}
              <TouchableHighlight
                underlayColor={color.paperOrange200.color}
                onPress={() => { onToggleOverlay() }}>
                <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>?</Text>
              </TouchableHighlight>
            </View>
            { Object.keys(errors).length > 0 ? (
              <View style={[styles.row, {flex: 1, backgroundColor: 'red'}]}>
                { Object.keys(errors).map((error, i) => (
                  <Text key={i}>. {errors[error].message}</Text>
                )
                )}
              </View>
            ) : null}

          </View>

          <View style={styles.scrollViewContainer}>
            <ScrollView
              ref='_scrollView'
              className='scrollView'
              contentContainerStyle={styles.scrollViewContentContainerStyle}
              scrollEventThrottle={1} // 1 event per second
              style={styles.scrollViewStyle}
            >
              {items.map((item, i) => (
                <View key={i}>
                  <View style={styles.itemRow}>
                    <Text style={{flex: 1}}>
                      <Text
                        style={[{fontWeight: 'bold', fontSize: 18}, cursorStyle]}
                        onPress={() => onOpenUrl(item.link)}>{i + 1}. {item.title}</Text>
                      <Text style={[{flex: 1, color: '#979797'}, cursorStyle]}> {item.link && domainUrl(item.link)}</Text>
                    </Text>
                  </View>
                  <View style={styles.itemSubRow}>
                    <Text style={{padding: 2}}>{item.source? item.source.name: 'n/a'} source </Text>
                    <Text
                      onPress={() => onOpenUrl(item.link)}
                      style={[{padding: 2, flex: 1, textDecorationLine: 'underline'}, cursorStyle]}> { moment(item.pubDate).fromNow() }</Text>
                      <Text
                      onPress={() => this.shareUrl(item)}
                      style={[{padding: 2, flex: 1, textDecorationLine: 'underline'}, cursorStyle]}>Share</Text>
                  </View>
                </View>
                  
              ))}
              <View style={[styles.itemRow, styles.buttonRow]}>
                <TouchableHighlight
                  style={[styles.button, styles.buttonGray]}
                  underlayColor={color.paperOrange200.color}
                  onPress={() => onLoadMore()}>
                  <View style={[styles.row, {height: 20}]}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 16, color: color.paperGrey500.color}}>
                      { loading ? null : 'Load more'}
                    </Text>
                    { loading ? <ActivityIndicator /> : null}
                  </View>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </View>

        </View>
      </Card>
    )
  }
}

export default HomePage;
