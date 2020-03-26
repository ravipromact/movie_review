import React,{Component}  from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
const movies = [
    {name:'Bloodshot', poster:'bloodshot',year:'2020'},
    {name:'Birds of Prey', poster:'birds_of_prey',year:'2020'},
    {name:'1917', poster:'1917',year:'2019'}
]
localStorage.setItem('movies',JSON.stringify(movies))
class Home extends Component{
    
    constructor(props){
        super(props)
        this.state={
            movies:JSON.parse(localStorage.getItem('movies'))
        }
    }
   
    render(){
        
        
        return(
            <div className="container">
                <h2>Home</h2>
                <div className="row">
                    {this.state.movies.map(movie => {
                        console.log(movie.poster);
                        return(
                            
                            <div className="col-md-6" key={movie.name}>
                                <div className="media">
                                    <img src={require(`../../assests/img/${movie.poster}.jpg`)} alt='movie poster' width="200" className="mr-3" />
                                    <div className="media-body">
                                        <h5 className="mt-0">{movie.name} ({movie.year})</h5>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                    </div>
                                </div>
                                <Accordion defaultActiveKey="0">
                                
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Click me!
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                    <form>
                                        <div className="form-group">
                                            <textarea rows="4" className="form-control" placeholder="Add Review..."></textarea>                                        
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Accordion>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        )
    }
}

export default Home