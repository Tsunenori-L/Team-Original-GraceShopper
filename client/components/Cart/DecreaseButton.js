import React from 'react';
import { connect } from 'react-redux';
import { UPDATE_BUTTONS } from './styles';
import { decreaseQty } from './../../redux';

const DecreaseButton = props => {
  const { product, decreaseQty, qty } = props;
  return (
    <button
      style={UPDATE_BUTTONS}
      onClick={() => {
        if (qty === 1) {
          return;
        }
        console.log('decreased qty');
        decreaseQty(product);
      }}
    >
      -
    </button>
  );
};

const mapDispatch = dispatch => ({
  decreaseQty: product => {
    dispatch(decreaseQty(product));
  },
});
export default connect(
  null,
  mapDispatch
)(DecreaseButton);
