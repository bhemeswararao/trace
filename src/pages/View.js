import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as mainActions from '../actions/mainActions';

import {
  Container,
  FormGroup,
  Input,
  Label,
  Button
} from 'reactstrap';

class View extends Component {

  constructor(props) {
    super(props);

    // TODO: move this to Redux store
    this.state = {
      name: "",
      description: "",
      location: ""
    };
  }

  handleClick = () => {
    this.props.passageInstance.getProductById(this.props.productIdToView)
      .then((result) => {
        console.log(result)
        this.setState({
          name: result[0],
          description: result[1],
          location: result[2],
        })
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          name: "",
          description: "",
          location: "",
        })
      })
  }

  render() {
    return (
      <Container>
        <FormGroup>
          <Label>ID du produit à consulter</Label>
          <Input value={this.props.productIdToView} onChange={(e) => {this.props.dispatch(mainActions.updateProductIdToView(e.target.value))}}></Input>
          <Button onClick={this.handleClick.bind(this)}>Voir</Button>
        </FormGroup>
        <p><b>Nom:</b> {this.state.name}</p>
        <p><b>Description:</b> {this.state.description}</p>
        <p><b>Emplacement:</b> {this.state.location}</p>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    passageInstance: state.temporaryGodReducer.passageInstance,
    productIdToView: state.temporaryGodReducer.productIdToView
  };
}

export default connect(mapStateToProps)(View);
