import PropTypes from 'prop-types';
// import { useRef } from 'react';

// export const btnRef = useRef();

const Button = ({ onClick }) => {
  return (
    <div className="Container">
      <button className='Button' type="button" onClick={() => onClick()}>Load more</button>
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Button;