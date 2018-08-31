import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../queries/queries';
import AuthorDetails from './AuthorDetails';


class AuthorList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected:null
        }
    }
    displayAuthor() {
        var data = this.props.data;
        if(data.loading){
            return (<div>loading Authors...</div>)
        }else{
            return data.authors.map(author => {
                return (
                    <li key={author.id} onClick={(e)=>(this.setState({selected:author.id}))}>{author.name}</li>
                );
            });
        }
    }
  render() {
    return (
      <div>
        <ul id="author-list">
            {this.displayAuthor()}
        </ul>
        <AuthorDetails authorId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getAuthorsQuery)(AuthorList);