import React from 'react'
import ContentLoader, {IContentLoaderProps} from 'react-content-loader'

const CardLoader: React.FC<IContentLoaderProps> = props => (
  <ContentLoader
    speed={2}
    width={800}
    height={250}
    backgroundColor='#1C1C21'
    foregroundColor='#8585AD'
    {...props}
  >
    <rect x='0' y='0' rx='40' ry='40' width='800' height='250' />
  </ContentLoader>
)

export default CardLoader
