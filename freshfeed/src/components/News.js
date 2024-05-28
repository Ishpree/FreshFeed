import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  // Initialize the keys(articles, loading, page) whose state is changing using a constructor
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - FreshFeed`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=598a453bd1504912a700b620535c8a04&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    this.setState({ loading: false });
    this.props.setProgress(100)
  }

  //lifecycle method, its called immediately after rendering process is complete
  //This function is mostly used to perform tasks like fetching data from API, setting up timers etc
  //In this case, the function fetches data from an API, once the data is fetched, its stored in the
  //component's state, triggering a re-render with the fetched data displayed in the UI.
  //This ensures that the UI is only rendered after the data is available.

  //Data is fetched using the url, loading is set to true and then parsed into json format and then the state of the articles is
  //updated to parsedData.articles and state of loading is set to false
  async componentDidMount() {
    // console.log("cdm");
    //  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfb249c820744703a9dbebcd5c2d4fac&page=1&pageSize=${this.props.pageSize}`;
    //  this.setState({loading: true})
    //  let data = await fetch(url);
    //  let parsedData= await data.json();
    //  this.setState({articles:parsedData.articles});
    //  this.setState({loading: false})
    this.updateNews();
  }

  //When the previous button is clicked
  //The data for the previous page is fetched using the api then converted to json format and then the
  //state of articles is changed, the page is reduced by 1 and loading is set to false
  //handlePrevClick = async () => {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfb249c820744703a9dbebcd5c2d4fac&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData= await data.json();
    // this.setState({
    //   page: this.state.page -1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    // this.setState({ page: this.state.page - 1 });
    // this.updateNews();
  //  } 

  //When the next button is clicked
  //The data on the next page is fetched using the url, changed to json format
  //The state of the articles is updated, page is increased by 1 and loading is set to false
  // handleNextClick = async () => {
  //   console.log("Next");
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cfb249c820744703a9dbebcd5c2d4fac&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true})
  //   let data = await fetch(url);
  //   let parsedData= await data.json();
  //   this.setState({articles:parsedData.articles, totalResults: parsedData.totalResults});
  //   this.setState({
  //     page: this.state.page +1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=598a453bd1504912a700b620535c8a04&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults });
    this.setState({ loading: false });
    this.setState({page: this.state.page + 1})
  };

  render() {
    //col-md-4 specifies column that will occupy 4 units of space on medium sized screens and larger
    //The screen is divided int 12 equal parts, md stands for medium sized screens.
    //This column hence takes up 1/3rd of the available width

    //map function is used to iterate over an array and execute a function on each element of the array
    //It creates a new array by applying the provided function to each element of the array
    //arrow function is passed to the map function which returns the array with each NewsItem
    //we get the articles using the api used in the componentdidMount function and then the NewsItems are
    //populated according to the fetched articles using the map function

    //We have considered the sample output to know the multiple keys that every element has in the articles
    // array, like title so we used title={element.url} and url so we used NewsUrl={element.url} and these are
    //passed as for props for NewsItem
    //Its important to have a key which is unique to every element
    //This helps react identify which items have changed, been added or removed efficiently during updates
    //In this case, url is that key so we passed this as a prop along with div like key={element.url}

    //The map function is run only when the state of loading is false
    //which is ensured using !this.state.loading && (map function)

    //larr; is used to add a left arrow to the previous button
    //display-flex and justify-content-between classes are used to place previous and next button on either
    //side of the page
    //previous button is disabled on the 1st page disabled={this.state.page<=1}
    //next button is disabled on the last page disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}
    return (
      <div>
          <div class="text-center" style={{margin: '35px 0', marginTop: '90px'}}>
            <h1>
              FreshFeed - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
              Headlines
            </h1>
          </div>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length<this.state.totalResults}
          loader={<Spinner/>}>
          <div className="container my-3">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title == null? "" : element.title}
                    description={element.description==null ? "" : element.description}
                    imageUrl={element.urlToImage}
                    NewsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
          </InfiniteScroll>
        </div>

        // {/* <div className="container d-flex justify-content-between">
        //   <button
        //     disabled={this.state.page <= 1}
        //     type="button"
        //     className="btn btn-dark right-align mx-4"
        //     onClick={this.handlePrevClick}
        //   >
        //     &larr; Previous
        //   </button>
        //   <button
        //     disabled={
        //       this.state.page + 1 >
        //       Math.ceil(this.state.totalResults / this.props.pageSize)
        //     }
        //     type="button"
        //     className="btn btn-dark"
        //     onClick={this.handleNextClick}
        //   >
        //     Next &rarr;
        //   </button>
        // </div>  */} 
    );
  }
}

export default News;
