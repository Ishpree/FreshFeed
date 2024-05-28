
import './App.css';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';

import React, { Component } from 'react'
import News from './components/News';
import NewsItem from './components/NewsItem';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {
  pageSize=6

  state={
    progress: 0
  }

  setProgress=(progress)=>
  {
    this.setState({progress: progress})
  }
  render() {
    return (
      <BrowserRouter>
      <div>
           <Navbar/>
           <LoadingBar
           height={3}
           color='#f11946'
           progress={this.state.progress}
      />
           <Routes>
           <Route path='/' element={<News setProgress={this.setProgress} key="General" pageSize={this.pageSize} country={"in"} category={'General'}/>}></Route>
           <Route path='/Business' element={<News setProgress={this.setProgress} key="Business" pageSize={this.pageSize} country={"in"} category={'Business'}/>}></Route>
           <Route path='/Entertainment' element={<News setProgress={this.setProgress} key="Entertainment" pageSize={this.pageSize} country={"in"} category={'Entertainment'}/>}></Route>
           <Route path='/General' element={<News setProgress={this.setProgress} key="General" pageSize={this.pageSize} country={"in"} category={'General'}/>}></Route>
           <Route path='/Health' element={<News setProgress={this.setProgress} key="Health" pageSize={this.pageSize} country={"in"} category={'Health'}/>}></Route>
           <Route path='/Science' element={<News setProgress={this.setProgress} key="Science" pageSize={this.pageSize} country={"in"} category={'Science'}/>}></Route>
           <Route path='/Sports' element={<News setProgress={this.setProgress} key="Sports" pageSize={this.pageSize} country={"in"} category={'Sports'}/>}></Route>
           <Route path='/Technology' element={<News setProgress={this.setProgress} key="Technology" pageSize={this.pageSize} country={"in"} category={'Technology'}/>}></Route>
          </Routes>
      </div>
      </BrowserRouter>
    )
  }
}


