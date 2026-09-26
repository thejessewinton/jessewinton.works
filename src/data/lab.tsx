import { Dithering } from '~/components/lab/dithering'
import { Noise } from '~/components/lab/noise'
import { QuantityStepper } from '~/components/lab/quantity-stepper'
import { Switch } from '~/components/lab/switch'

export const LabComponents = [
  {
    title: 'Quantity stepper',
    Component: QuantityStepper,
    Background: Noise,
  },
  {
    title: 'Dithering',
    Component: Switch,
    Background: Dithering,
  },
]
