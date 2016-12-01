import NowPlaying from './compositional/NowPlaying'
import React from 'react'
import YouTube from 'react-youtube'

const HEIGHT = 130
const WIDTH = 215

class VideoPlayer extends React.Component {

  render() {
    const myHeight = this.props.height || HEIGHT
    const myWidth = this.props.width || WIDTH
    const spanStyle = {
      height: myHeight,
      width: myWidth
    }
    const opts = {
      height: myHeight,
      width: myWidth,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    return (
    <span style={spanStyle}>{this.props.videoId ? <YouTube {...this.props} opts={opts}/> : <img src={`http://placekitten.com/${opts.width}/${opts.height}`}/>}</span>
    )
  }
}

export default NowPlaying(VideoPlayer)
