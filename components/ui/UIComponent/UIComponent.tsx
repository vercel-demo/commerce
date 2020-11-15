import React from 'react'
import { Grid, Hero } from '@components/ui'
import { GridEntity } from '@components/ui/Grid/Grid'

type UIComponentTypes = 'hero' | 'grid'

// Data comming from CMS
export interface UIComponentData {
  component_variant: string
  component_type: UIComponentTypes
  grid?: GridEntity
}

export interface UIComponentEntity {
  component: UIComponentData
}

// Data to the Component
export interface Props {
  componentType: UIComponentTypes
  componentVariant?: string
  data?: any
  children?: any
}

const UIComponent: React.FC<Props> = (props) => {
  const { componentType = 'default', componentVariant, data, ...rest } = props

  const componentMap = {
    hero: Hero,
    grid: Grid,
    default: () => {
      console.log('Component Type not specified')
      return null
    },
  }

  const Component = componentMap[componentType]
  return <Component variant={componentVariant} data={data} {...rest} />
}

export default UIComponent
