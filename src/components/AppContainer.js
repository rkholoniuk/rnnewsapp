/* global fetch */
import React from 'react'
import { Linking, Platform } from 'react-native'

import HomePage from './home/HomePage'

export default class AppContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filters: ['all', 'nytimes', 'hackerru', 'wired', 'habr', 'gnews'],
      filter: 'all', // 'Latest''
      page: 0,
      errors: {},
      items: []
    }
    this.loadMore = this.loadMore.bind(this)
    this.loadItems = this.loadItems.bind(this)
    this.openUrl = this.openUrl.bind(this)
    this.toggleOverlay = this.toggleOverlay.bind(this)
  }

  componentDidMount () {
    // default items load
    this.loadItems(this.state.filter)
  }

  openUrl (url) {
    if (Platform.OS === 'web') {
      window.open(url, '_blank')
    }
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      Linking.openURL(url).catch(err => console.error('An error occurred', err))
    }
  }

  loadItems (filter) {
    this.setState({filter: filter})
    // HACK: to avoid React state change race condition
    setTimeout(() => {
      this.loadMore('reset')
    }, 0)
  }

  loadMore (mode) {
    const page = (mode === 'reset') ? 0 : this.state.page
    const filter = this.state.filter;
    this.setState({loading: true})
    
    //const fetchUrl= `http://192.168.0.102:8000/news/info/?page=${page}&source=${filter}`;
    const fetchUrl= `http://78.47.247.226/news/info/?page=${page}&source=${filter}`;
    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        const previousItems = (page === 0) ? [] : this.state.items
        this.setState({
          items: [ ...previousItems, ...data ],
          loading: false,
          errors: {},
          page: page + 1
        })
      })
      .catch((error) => {
        this.setState({
          loading: false,
          errors: {
            error
          }
        })
        console.error(error, page)
      })
  }

  toggleOverlay () {
    const {overlayVisible} = this.state
    this.setState({overlayVisible: !overlayVisible})
  }

  render () {
    return <HomePage
      items={this.state.items}
      errors={this.state.errors}
      loading={this.state.loading}
      filter={this.state.filter}
      filters={this.state.filters}
      overlayVisible={this.state.overlayVisible}
      onOpenUrl={this.openUrl}
      onLoadItems={this.loadItems}
      onLoadMore={this.loadMore}
      onToggleOverlay={this.toggleOverlay} />
  }
}
