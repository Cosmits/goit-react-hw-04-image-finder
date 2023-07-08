import { StyledContainer } from 'components/TitleH1/TitleH1.styled'
import { RotatingLines } from 'react-loader-spinner'

export default function Loader() {
  return (
    <StyledContainer>
      <RotatingLines
        strokeColor={'#3f51b5'}
        strokeWidth="5"
        animationDuration="0.75"
        width="196"
        visible={true}
      />
    </StyledContainer>
  )
}
