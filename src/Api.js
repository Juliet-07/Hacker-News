import React, {Component} from 'react'
import Header from './Card'

const DEFAULT_QUERY = 'Juliet';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const RECENT_PATH ='https://hn.algolia.com/api/v1/search_by_date?tags=story'
class News extends Component{
    state={
        result:null,
        searchTerm:""
    }
    searchTopstories = result =>{
        this.setState({result})
    }
    getRecentStories = ()=>{
        fetch(RECENT_PATH)
        .then(response=> response.json())
        .then(recent => {
            return this.searchTopstories(recent)
        })
    }
    getSearchTopstories = searchTerm =>{
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
        .then(response => response.json())
        .then(result=>{
            return this.searchTopstories(result);
        })
        .catch(err => err)
    }
    componentDidMount = ()=>{
        // const {searchTerm} = this.state
        // this.getSearchTopstories(searchTerm)
        this.getRecentStories()
    }
    onSearchChange = event =>{
        this.setState({searchTerm: event.target.value})
    }
    onSearchSubmit = e =>{
        const {searchTerm} = this.state
        this.getSearchTopstories(searchTerm)
        e.preventDefault()
    }
    render(){
        const {searchTerm, result} = this.state
        return(
            <div>
                <Header/><br/><br/>
                <div>
                    <Search 
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}>
                        Search
                    </Search>
                </div>
                {result && <Table list ={result.hits}/>}
                <Footer/>
            </div>
        )
    }
}
const Search = ({value, onChange, onSubmit, children})=>(
    <form onSubmit={onSubmit} className="container">
        <input type='text' value={value} onChange={onChange}/>
        <button type='submit' className='btn green'>{children}</button>
    </form>
)

const Table = ({list})=>(
    <div className='container'>
        {list.map(item =>(
            <div className='card indigo lighten-4 center' key = {item.objectID}>
                <span className='card-title'>
                    <a className="pink-text" href={item.url} target='_blank'>{item.title}</a>
                </span>
            </div>
        ))}
    </div>
)

const Footer = ()=>(
    <footer className="page-footer green darken-4">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h6 className="white-text">Juliet's News App</h6>
          <p className="grey-text text-lighten-4">Welcome to my website where you get daily and insightful News.<br/><b>Knowledge is power</b></p>
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text">Contact Us</h5>
          <ul>
            <li><a href='https://web.facebook.com/juliet.kelechiohankwere?ref=bookmarks'><i className='fa fa-facebook' style={{fontSize:30}}></i></a></li>
            <li><a href='#'><i className='fa fa-twitter' style={{fontSize:30}}></i></a></li>
            <li><a href='#'><i className='fa fa-linkedin' style={{fontSize:30}}></i></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      © 2019 Copyright Text
    </div>
      </footer>
)
export default News 