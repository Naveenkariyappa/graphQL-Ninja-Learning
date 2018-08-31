import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getAuthorQuery} from '../queries/queries';

class AuthorDetails extends Component {   
    displayAuthorDetails(){
        const {author} = this.props.data;
        if(author){
            return <div>
                <h2>{author.name}</h2>
                <p>Age: {author.age}</p>
                {/* <p>Author: {book.author.name}</p>
                <p>Age: {book.author.age}</p> */}
                <p>All books by this author</p>
                <ul className="other-books">
                    {
                        author.books.map(item =>{
                            return <li key={item.id}> 
                            {item.name} {item.genre}
                            </li>
                        })
                    }
                </ul>
            </div>
        }else{
            return (
                <div>No Auhor Selected</div>
            )
        }
    }
    render() {
    return (
      <div id="author-details">
        {this.displayAuthorDetails()}
      </div>
    );
  }
}

export default graphql(getAuthorQuery, {
    options:(props)=>{
        return {
            variables:{
                id:props.authorId
            }
        }
    }
})(AuthorDetails)