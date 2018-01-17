import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import _ from 'lodash';

const API_KEY = 'AIzaSyBI1itqVIXbAOcYYf6ETyrQMRk7QWj7HN0';

//Create a new component to produce HTML
class App extends Component {
    constructor(props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null 
        };

        this.videoSearch('surfboards');
    }
    
    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0] 
            });
        });
    }

    render(){

        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />
            </div>
        );
    }
}

//Render generated HTML into DOM
ReactDOM.render(<App />, document.querySelector('.container'))