import NowPlaying from './compositional/NowPlaying'
import React from 'react'
import YouTube from 'react-youtube'

class VideoPlayer extends React.Component {

  render() {
    const opts = {
      height: '130',
      width: '215',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    return (
    this.props.videoId ? <YouTube {...this.props} opts={opts}/> : <img src={`http://placekitten.com/${opts.width}/${opts.height}`}/>
    )
  }
}

export default NowPlaying(VideoPlayer)
