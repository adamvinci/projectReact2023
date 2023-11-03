import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Prices = ({tarif}) => {
    console.log(tarif);
    return(
        <div className="col-sm-4 md-5 mx-auto">
            <Card style={{ width: '15rem' }}> 
      <Card.Body>
        <Card.Title>{tarif.name}</Card.Title>
        <Card.Img variant="top" src={`../src/img/${tarif.image}`} />
        <Card.Text>
          <h1 style = {{padding: "5%"}}>{tarif.price} €</h1>
          <ListGroup variant="flush">
            {tarif.avantages.map(avantage => (
                <ListGroup.Item>{avantage}</ListGroup.Item>
            ))}

          </ListGroup>

        </Card.Text>

        <Button  variant=" btn btn-primary" size="sm"> subscribe</Button>
      </Card.Body>
    </Card>
        </div>
    )
}
export default Prices