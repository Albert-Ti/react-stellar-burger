import React from 'react'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

const IngredientsLoader: React.FC<IContentLoaderProps> = props => (
  <ContentLoader
    speed={2}
    width={272}
    height={208}
    viewBox='0 0 272 208'
    backgroundColor='#1c1c21'
    foregroundColor='#7a7a7a'
    {...props}
  >
    <rect x='115' y='121' rx='6' ry='6' width='86' height='32' />
    <circle cx='88' cy='136' r='16' />
    <rect x='14' y='162' rx='2' ry='2' width='243' height='7' />
    <rect x='14' y='178' rx='0' ry='0' width='139' height='7' />
    <rect x='14' y='194' rx='2' ry='2' width='243' height='7' />
    <rect x='166' y='178' rx='0' ry='0' width='59' height='7' />
    <circle cx='133' cy='58' r='55' />
  </ContentLoader>
)

export default IngredientsLoader
